const router = require('express').Router();

// import
const authRoutes = require('./auth');
const userRoutes = require('./user');
const projectRoutes = require('./project');
const workOrderRoutes = require('./workorder');
const ticketRoutes = require('./ticket');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/workorder', workOrderRoutes);
router.use('/ticket', ticketRoutes);

module.exports = router;