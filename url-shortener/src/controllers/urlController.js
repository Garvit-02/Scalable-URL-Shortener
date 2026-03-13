import Url from '../models/urlModel.js';
import { generateShortCode } from '../services/shortCodeService.js';
import { validateUrl } from '../utils/validateUrl.js';
import redis from '../config/redis.js';

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

    if (cachedUrl) {
      console.log('Cache Hit');
      
      // Non-blocking async update for click tracking
      Url.findOneAndUpdate(
        { shortCode },
        { $inc: { clicks: 1 } }
      ).exec();

      // Redirect immediately
      return res.redirect(cachedUrl);
    }

    console.log('Cache Miss');

    // 2. If Cache Miss, find the URL mapping by short code in MongoDB
    const urlMapping = await Url.findOne({ shortCode });

    if (urlMapping) {
      // Increment the click counter (blocking as we are already waiting)
      urlMapping.clicks++;
      await urlMapping.save();

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
