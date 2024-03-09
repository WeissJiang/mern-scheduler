const router = require('express').Router();

// import
const authRoutes = require('./auth');
const userRoutes = require('./user');
const projectRoutes = require('./project');


router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/project', projectRoutes);


module.exports = router;