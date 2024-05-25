require("dotenv").config();
const config = require("../config/config");
const twilio = require("twilio");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const accountSid = config.account_sid;
const authToken = config.auth_token;
const client = twilio(accountSid, authToken);

exports.signup = async (req, res) => {
  const { mobileNumber } = req.body;

  // Check if mobileNumber is provided
  if (!mobileNumber) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  try {
    // Generate OTP (random 6-digit number)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via Twilio SMS
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+13517775218", // Twilio phone number
      to: mobileNumber, // Mobile number provided in the request body
    });

    // You can optionally store the OTP in a database or session for verification

    await models.otpTable.create({
      mobileNumber,
      otp,
    });
    console.log(otp, "otp");
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { mobileNumber } = req.query;
  const { otp } = req.body;

  // Log the received mobile number and OTP
  console.log("Received mobileNumber:", mobileNumber);
  console.log("Received OTP:", otp);

  // Check if mobileNumber and otp are provided
  if (!mobileNumber || !otp) {
    return res.status(400).json({ error: "Mobile number and OTP are required" });
  }

  try {
    // Find the OTP entry in the database
    const otpEntry = await models.otpTable.findOne({ where: { otp } });

    // Check if OTP entry exists and is not expired
    if (otpEntry && otpEntry.createdAt.getTime() + 5 * 60 * 1000 >= Date.now()) {
      // OTP is verified

      // Check if the user exists in the UserDetails table
      const userDetail = await models.UserDetails.findOne({ where: { mobileNumber } });

      if (userDetail) {
        await models.UserDetails.update(
          { active_detail: "active" },
          { where: { mobileNumber } }
        );
      }
        // Return success response along with the token
        return res.status(200).json({
          message: "OTP verified successfully",
          mobileNumber: mobileNumber,
          name: userDetail.name || "", 
        });
      // } else {
      //   return res.status(404).json({ error: "User not found" });
      // }
    } else {
      return res.status(401).json({ error: "Invalid OTP or OTP expired" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};











exports.getUserDetailByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const userDetail = await models.UserDetail.findOne({ where: { mobileNumber } });
    if (!userDetail) {
      return res.status(404).json({ error: "User detail not found" });
    }
    return res.status(200).json(userDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUserDetailByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const [updatedRowsCount] = await models.UserDetail.update(req.body, {
      where: { mobileNumber },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "User detail not found" });
    }
    return res
      .status(200)
      .json({ message: "User detail updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUserDetailByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const deletedRowCount = await models.UserDetail.destroy({
      where: { mobileNumber },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "User detail not found" });
    }
    return res
      .status(200)
      .json({ message: "User detail deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
