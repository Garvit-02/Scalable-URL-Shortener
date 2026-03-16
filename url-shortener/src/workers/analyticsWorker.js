import dotenv from 'dotenv';
import mongoose from 'mongoose';
import analyticsQueue from '../queues/analyticsQueue.js';
import Url from '../models/urlModel.js';
import connectDB from '../config/db.js';

dotenv.config();

// Connect to MongoDB (Worker needs its own connection if run as separate process)
connectDB();

/**
 * Bull Worker to process analytics jobs.
 */
analyticsQueue.process(async (job) => {
  const { shortCode, timestamp, userAgent, ipAddress } = job.data;

  try {
    console.log(`[Worker] Processing analytics job for: ${shortCode}`);

    // Update URL document in MongoDB
    const result = await Url.findOneAndUpdate(
      { shortCode },
      {
        $inc: { clicks: 1 },
        $push: {
          analytics: {
            timestamp: new Date(timestamp),
            userAgent,
            ipAddress,
          },
        },
      },
      { new: true }
    );

    if (result) {
      console.log(`[Worker] Analytics job processed successfully for: ${shortCode}`);
    } else {
      console.error(`[Worker] URL mapping not found for shortCode: ${shortCode}`);
    }
  } catch (error) {
    console.error(`[Worker] Error processing analytics job for ${shortCode}:`, error);
    throw error; // Let Bull handle retries
  }
});

console.log('[Worker] Analytics worker is running and waiting for jobs...');
