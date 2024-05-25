const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;
exports.addAddress = async (req, res) => {
    const { userId, street, city, state, postalCode,address_type } = req.body;
  
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const user = await models.UserDetails.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const address = await models.Address.create({ userId, street, city, state, postalCode,address_type });
      return res.status(200).json(address);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  exports.getAddressesByUserId = async (req, res) => {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const addresses = await models.Address.findAll({
        where: { userId:id }
      });
  
      return res.status(200).json(addresses);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.deleteAddress = async (req, res) => {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const address = await models.Address.findAll({
        where:{id:id}
      });

      if (address.length === 0) {
        return res.status(404).json({ error: "No addresses found for the given user ID" });
      }

     await models.Address.destroy({
        where: { id:id }
      });
  
      return res.status(200).json(address);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" , message: error.message });
    }
  };
  
  
  exports.updateAddress = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Address ID is required" });
    }
  
    try {
      const address = await models.Address.findByPk(id);
  
      if (!address) {
        return res.status(404).json({ error: "Address not found" });
      }
  
      await address.update(req.body);
  
      const updatedAddress = await models.Address.findByPk(id);
  
      return res.status(200).json(updatedAddress);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error", message: error.message });
    }
  };
  