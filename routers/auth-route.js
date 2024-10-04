const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const authMiddleware=require("../mid/auth-mid");
const User = require('../models/user');
router.post('/register', authController.register);
router.post('/login', authController.login);





router.get("/current-user", authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;