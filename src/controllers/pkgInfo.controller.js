import { Router } from 'express';
let npmPackage = require('npm-package-info');
const router = Router();

/**
 * @swagger
 * /pkg-info/npm:
 *   get:
 *     summary: Get Information about the packages in npm based projects
 *     tags:
 *       - PackageInfo
 *     parameters:
 *       - name: q
 *         in: query
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Repository'
 */
router.get('/npm', (req, res) => {
  if (req.url !== undefined) {
    const query = req.query['q'];
    npmPackage(query, (err, pkg) => {
      if (err) {
        res.json(err);
      } else {
        let result = {
          name: pkg.name,
          description: pkg.description,
          author: pkg.author,
          repository: pkg.repository,
          keywords: pkg.keywords,
        };
        res.json(result);
      }
    });
  }
});

export default router;
