import { Router } from 'express';

import github from '../services/github.service';

const router = Router();

/**
 * @swagger
 * /org/repos:
 *   get:
 *     summary: List all repos in the organization
 *     tags:
 *       - Organization
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Repository'
 */
router.get('/repos', (req, res, next) => {
  github
    .getOrganizationRepos()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
