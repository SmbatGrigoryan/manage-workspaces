const express = require('express');
const router = express.Router();
const passport = require('passport');

const workspacesController = require('../controllers/workspacesController');


router.get('/', passport.authenticate('jwt', { session: false }),
  workspacesController.getUserWorkspaces
);

router.post('/', passport.authenticate('jwt', { session: false }),
  workspacesController.createWorkspace
  )

router.delete('/', passport.authenticate('jwt', { session: false }),
  workspacesController.deleteWorkspace
  )

router.post('/suggest_subdomain',
  passport.authenticate('jwt', { session: false }),
  workspacesController.suggestSubdomain
);

module.exports = router;
