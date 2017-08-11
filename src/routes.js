import { Router } from 'express';
import swaggerSpec from './utils/swagger';

import org from './controllers/org.controller';
import search from './controllers/search.controller';
import pkgInfo from './controllers/pkgInfo.controller';
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

/**
 * @swagger
 * definitions:
 *   Repository:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 */
router.use('/org', org);
router.use('/search', search);
router.use('/pkg-info', pkgInfo);

export default router;
