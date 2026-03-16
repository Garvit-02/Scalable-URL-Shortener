import Url from '../models/urlModel.js';
import { generateShortCode } from '../services/shortCodeService.js';
import { validateUrl } from '../utils/validateUrl.js';
import redis from '../config/redis.js';
import analyticsService from '../services/analyticsService.js';
import aiService from '../services/aiService.js';

/**
 * @desc    Create a new short URL
 * @route   POST /api/url/shorten
 * @access  Public
 */
export const createShortUrl = async (req, res, next) => {
  try {
    const { url } = req.body;

    // 1. Validate the original URL
    if (!validateUrl(url)) {
      res.status(400);
      throw new Error('Invalid Original URL');
    }

    // 1.5. Check for malicious URL using AI service
    const isMalicious = await aiService.isMalicious(url);
    if (isMalicious) {
      res.status(400);
      throw new Error('URL flagged as malicious');
    }

    // Check if the URL already exists in the database
    let existingUrl = await Url.findOne({ originalUrl: url });

    if (existingUrl) {
      // If found, construct the full short URL and return
      const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
      return res.status(200).json({
        shortUrl: `${baseUrl}/${existingUrl.shortCode}`,
      });
    }

    // 2. Generate a unique short code
    const shortCode = generateShortCode();

    // 3. Save mapping in MongoDB
    const newUrl = await Url.create({
      originalUrl: url,
      shortCode,
    });

    // 4. Return the shortened URL
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    res.status(201).json({
      shortUrl: `${baseUrl}/${newUrl.shortCode}`,
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Redirect to the original URL
 * @route   GET /:shortCode
 * @access  Public
 */
export const redirectToOriginalUrl = async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const cacheKey = `url:${shortCode}`;

    // 1. Check Redis cache first
    const cachedUrl = await redis.get(cacheKey);

    const analyticsData = {
      shortCode,
      timestamp: new Date().toISOString(),
      userAgent: req.get('User-Agent'),
      ipAddress: req.ip,
    };

    if (cachedUrl) {
      console.log('Cache Hit');
      
      // Queue analytics job asynchronously
      analyticsService.addAnalyticsJob(analyticsData);

      // Redirect immediately
      return res.redirect(cachedUrl);
    }

    console.log('Cache Miss');

    // 2. If Cache Miss, find the URL mapping by short code in MongoDB
    const urlMapping = await Url.findOne({ shortCode });

    if (urlMapping) {
      // Queue analytics job asynchronously
      analyticsService.addAnalyticsJob(analyticsData);

      // 3. Store result in Redis with expiration (TTL) of 3600 seconds (1 hour)
      await redis.setex(cacheKey, 3600, urlMapping.originalUrl);

      // 4. Redirect to the original URL
      return res.redirect(urlMapping.originalUrl);
    } else {
      res.status(404);
      throw new Error('No URL found for this short code');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all URL mappings
 * @route   GET /api/url/list
 * @access  Public
 */
export const getUrlList = async (req, res, next) => {
  try {
    const urls = await Url.find({}).sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get analytics summary
 * @route   GET /api/url/analytics
 * @access  Public
 */
export const getAnalytics = async (req, res, next) => {
  try {
    const totalUrls = await Url.countDocuments();
    
    // Aggregation for total clicks and top URLs
    const stats = await Url.aggregate([
      {
        $group: {
          _id: null,
          totalClicks: { $sum: '$clicks' },
          urlData: { $push: { shortCode: '$shortCode', clicks: '$clicks' } }
        }
      }
    ]);

    const totalClicks = stats.length > 0 ? stats[0].totalClicks : 0;
    const urlData = stats.length > 0 ? stats[0].urlData : [];

    // Sort by clicks to get top URLs (limit to 5)
    const topUrls = [...urlData]
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);

    res.status(200).json({
      totalUrls,
      totalClicks,
      topUrls,
      allUrlStats: urlData
    });
  } catch (error) {
    next(error);
  }
};
