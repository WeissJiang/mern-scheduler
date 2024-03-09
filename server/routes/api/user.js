const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../models/user');

router.get('/', auth.verifyJWT, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const usersDoc = await User.find({}, { password: 0, _id: 0})
                            .sort('lastName')
                            .limit(limit * 1)
                            .skip((page - 1) * limit)
                            .exec();

    const count = await User.countDocuments(); // to get total count

    res.status(200).json({
      users: usersDoc,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;