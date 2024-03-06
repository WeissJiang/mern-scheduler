const router = require('express').Router();
const apiRoutes = require('./api');

const api = `/${process.env.BASE_API_URL}`;

// api routes
router.use(api, apiRoutes);
router.use(api, (_, res) => res.status(404).json('No API route found'));

module.exports = router;