import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

class AIService {
  /**
   * Checks if a URL is malicious using the AI microservice.
   * @param {string} url - The URL to check.
   * @returns {Promise<boolean>} - True if malicious, false otherwise.
   */
  async isMalicious(url) {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/predict`, { url });
      
      const isMalicious = response.data.prediction === 'malicious';
      
      if (isMalicious) {
        console.warn(`[AI-Security] URL flagged as malicious: ${url}`);
      }
      
      return isMalicious;
    } catch (error) {
      console.error('[AI-Security] AI Service error:', error.message);
      // Fallback: If AI service is down, log error and allow (non-blocking policy)
      // Alternatively, you could block it, but usually, we want high availability.
      return false; 
    }
  }
}

export default new AIService();
