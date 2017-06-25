import { Router } from 'express';

import github from '../services/github.service';

const router = Router();

/**
 * @swagger
 * /search/npm:
 *   get:
 *     summary: Search for packages in npm based projects
 *     tags:
 *       - Search
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
router.get('/npm', (req, res, next) => {
  const query = req.query['q'];

  github
    .searchInNpm(query)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
