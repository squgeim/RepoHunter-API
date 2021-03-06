import logger from '../utils/logger';
import HttpStatus from 'http-status-codes';
import buildError from '../utils/buildError';

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export function notFoundError(req, res) {
  // eslint-disable-line no-unused-vars
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    },
  });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {object}   err
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
/* eslint-disable no-unused-vars */
export function genericErrorHandler(err, req, res, next) {
  if (err.stack) {
    logger.debug(err.stack);
  }

  let error = buildError(err);
  res.status(error.code).json({ error });
}
