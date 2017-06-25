import { Router } from 'express';

import github from '../services/github.service';

const router = Router();

router.get('/npm', (req, res, next) => {
  const query = req.query['q'];

  github
    .searchInNpm(query)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
