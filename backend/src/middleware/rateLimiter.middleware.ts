import rateLimit from 'express-rate-limit';

export const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hr in milliseconds
  max: 3600,
  message: 'You have exceeded the 100 requests in 1 hr limit!',
  standardHeaders: true,
  legacyHeaders: false,
});