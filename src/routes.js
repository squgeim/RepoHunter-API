import { Router } from 'express';
import swaggerSpec from './utils/swagger';

import org from './controllers/org.controller';
import search from './controllers/search.controller';

const router = Router();

router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

/**
 * @swagger
 * definitions:
 *   App:
 *     title: App
 *     type: object
 *     properties:
 *       app:
 *         type: string
 *       apiVersion:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Repository:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       full_name:
 *         type: string
 *       url:
 *         type: string
 *       api_url:
 *         type: string
 *       private:
 *         type: boolean
 */

router.use('/org', org);
router.use('/search', search);

export default router;
