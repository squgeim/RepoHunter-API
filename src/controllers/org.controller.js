import { Router } from 'express';

import github from '../services/github.service';

const router = Router();

router.get('/repos', (req, res, next) => {
  github
    .getOrganizationRepos()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
