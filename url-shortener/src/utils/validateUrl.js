import validator from 'validator';

/**
 * Validates a given URL string.
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is valid, false otherwise.
 */
export const validateUrl = (url) => {
  if (!url) return false;
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_tld: true,
    require_protocol: true,
  });
};
