const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;


exports.createUserDetail = async (req, res) => {
    const { name, email ,mobileNumber } = req.body;
  
    // Validate that username and email are provided
    if (!name || !email) {
      return res.status(400).json({ error: "Username and email are required" });
    }
  
    try {
  
      const existingUser = await models.UserDetails.findOne({
        where: { mobileNumber }
          
          
        
      });
  
      if (existingUser) {
        return res.status(409).json({ error: "User with this mobile number already exists" });
      }
  
      function generateCustomerId() {
        const randomNum = Math.floor(100000 + Math.random() * 900000); 
        return `hp${randomNum}`;
      }
  
      const customerId = generateCustomerId();
      const userDetail = await models.UserDetails.create({ name, email ,mobileNumber,customerId,active_detail: "active"});
      
  
      return res.status(201).json(userDetail);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  exports.getAllUserDetails = async (req, res) => {
    try {
      const userDetails = await models.UserDetails.findAll();
      return res.status(200).json(userDetails);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.getActiveUsers = async (req, res) => {
    try {
      const activeUsers = await models.UserDetails.count({
        where: { active_detail: 'active' }
      });
      return res.status(200).json(activeUsers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.updateUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const user = await models.UserDetails.findOne({where:{id:id}});
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Update the user with new details
      await user.update(req.body,{  
        where: { id: id }
      });
  
      // Fetch the updated user details
      const updatedUser = await models.UserDetails.findOne({where:{id:id}});
  
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error", message: error.message });
    }
  };
  
  


  