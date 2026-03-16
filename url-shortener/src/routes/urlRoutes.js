import express from 'express';
import { createShortUrl, redirectToOriginalUrl, getUrlList, getAnalytics } from '../controllers/urlController.js';

const router = express.Router();

/**
 * @route POST /api/url/shorten
 * @desc Create short URL
 */
router.post('/shorten', createShortUrl);

/**
 * @route GET /api/url/list
 * @desc Get all URL mappings
 */
router.get('/list', getUrlList);

/**
 * @route GET /api/url/analytics
 * @desc Get analytics summary
 */
router.get('/analytics', getAnalytics);

/**
 * Note: The redirect route GET /:shortCode should be placed in the main app file 
 * or at a different path prefix so it handles the base URL paths effectively, 
 * but for modularity, we can define it here and mount it at '/' in the app.
 * We'll export another router specifically for redirects to be clean.
 */

export const apiRouter = router;

// Router for redirection
const redirectRouter = express.Router();
redirectRouter.get('/:shortCode', redirectToOriginalUrl);

export { redirectRouter };
