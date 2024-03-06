const router = require('express').Router();

// import
const userRoutes = require('./user');
const authRoutes = require('./auth');

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;