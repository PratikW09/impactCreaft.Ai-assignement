/**
 * Sends a success response.
 * @param {Object} res - Express response object.
 * @param {Number} statusCode - HTTP status code.
 * @param {String} message - Success message.
 * @param {Object} data - Response data.
 */
export const sendSuccess = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Sends an error response.
 * @param {Object} res - Express response object.
 * @param {Number} statusCode - HTTP status code.
 * @param {String} message - Error message.
 */
export const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};