const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

exports.deleteUserDetailByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  try {
    const user = await models.UserDetails.findOne({
      where: { mobileNumber }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await models.UserDetails.destroy({
      where: { mobileNumber }
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
