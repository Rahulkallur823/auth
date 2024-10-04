const User = require("../models/user");





const register = ("/register", async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Create a new user
      const user = new User({ username, email, password });
  
      // Save the user to the database
      await user.save();
  
      // Generate JWT token
      const token = user.generateAuthToken();
  
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  });
  

  // Login controller
  const login = ("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = user.generateAuthToken();
      console.log(user)
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  });
  
  module.exports = { register, login };