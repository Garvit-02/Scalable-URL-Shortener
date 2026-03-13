import { nanoid } from 'nanoid';

/**
 * Generates a unique short code.
 * @returns {string} The generated short code
 */
export const generateShortCode = () => {
  // Using a custom length (e.g., 8 characters) for the short code
  return nanoid(8);
};
