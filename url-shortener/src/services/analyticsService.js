import analyticsQueue from '../queues/analyticsQueue.js';

/**
 * Service to handle analytics job queuing.
 */
class AnalyticsService {
  /**
   * Adds an analytics job to the Bull queue.
   * @param {Object} data - Analytics data (shortCode, timestamp, userAgent, ipAddress)
   */
  async addAnalyticsJob(data) {
    try {
      await analyticsQueue.add(data, {
        attempts: 3,
        backoff: 5000, // wait 5 seconds before retry
      });
      console.log(`[Queue] Analytics job added for shortCode: ${data.shortCode}`);
    } catch (error) {
      console.error('[Queue] Error adding analytics job:', error);
    }
  }
}

export default new AnalyticsService();
