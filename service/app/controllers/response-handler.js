import logger from '../utils/logger.js';

export const setResponse = (response, object) => {
  return response.status(200).json(object);
};

export const setResponseWithError = (response, error) => {
  logger.error(error.stack);

  return response.status(500).json({
    message: error.message,
    code: 'INTERNAL_SERVER_ERROR',
    stack: error.stack,
  });
};
