const express = require("express");
const router = express.Router();
const validator = require("validator");
//mongo user model
const { default: Admin } = require("./../models/Admin");
//password handler
const bcrypt = require("bcrypt");


router.get("/", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).send(admin);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: err.message,
    });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const isAdminExist = !!(await Admin.findById(req.params.id));

    if (!isAdminExist) {
      throw new Error("User does not exist");
    }

    const update = {
      AdminName: req.body.AdminName,
      AdminEmail: req.body.AdminEmail,
      AdminPassword: req.body.AdminPassword,
      AdminDateOfBirth: req.body.AdminDateOfBirth,
    };
    const doc = await Admin.findByIdAndUpdate(req.params.id, update);
    res.status(200).send(doc);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  // const filter = { _id: req.body._id };
  try {
    let doc = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: `Destination ${id} Deleted`,
    });
  } catch (err) {
    console.log("Error deleting", err);
    res.status(500).send({
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const admin = await Admin.findOne({
    id: req.params.id,
  });
  res.status(200).send({
    ...admin._doc,
  });
});

//signup
router.post("/", async (req, res) => {
  try {
  let { AdminName, AdminEmail, AdminPassword, AdminDateOfBirth } = req.body;
  AdminName = AdminName.trim();
  AdminEmail = AdminEmail.trim();
  AdminPassword = AdminPassword.trim();
  AdminDateOfBirth = AdminDateOfBirth.trim();
  
  if (
  AdminName == "" ||
  AdminEmail == "" ||
  AdminPassword == "" ||
  AdminDateOfBirth == ""
  ) {
  return res.status(400).json({
  status: "FAILED",
  message: "Empty input fields!",
  });
  }
  if (!/^[a-zA-Z ]*$/.test(AdminName)) {
  return res.status(400).json({
  status: "FAILED",
  message: "Invalid name entered",
  });
  }
  if (!validator.isEmail(AdminEmail)) {
  return res.status(400).json({
  status: "FAILED",
  message: "Invalid email entered",
  });
  }
  if (AdminPassword.length < 8) {
  return res.status(400).json({
  status: "FAILED",
  message: "Password too short",
  });
  }
  
  let admin = await Admin.findOne({ AdminEmail });
  if (admin) {
  return res.status(400).json({
  status: "FAILED",
  message: "Admin with the provided email already exists",
  });
  }
  
  let result = await new Admin({
  AdminName,
  AdminEmail,
  AdminPassword,
  AdminDateOfBirth,
  }).save();
  
  return res.status(200).json({
  status: "SUCCESS",
  message: "Signup successful",
  data: result,
  });
  } catch (ex) {
  return res.status(200).json({
  status: "FAILED",
  message: ex.message,
  });
  }
  });

//signin
router.post("/signin", async (req, res) => {
  try {
    let { AdminEmail, AdminPassword } = req.body;
    AdminEmail = AdminEmail.trim();
    AdminPassword = AdminPassword.trim();

    if (AdminEmail == "" || AdminPassword == "") {
      return res.status(400).json({
        status: "FAILED",
        message: "Empty credentials supplied",
      });
    }
    let admin = await Admin.findOne({ AdminEmail });
    if (!admin) {
      return res.status(401).json({
        status: "FAILED",
        message: "Invalid credentials supplied",
      });
    }
    //comparing passwords
    const isPasswordValid = await bcrypt.compare(
      AdminPassword,
      admin.AdminPassword
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "FAILED",
        message: "Invalid credentials supplied",
      });
    }
    //generating jwt
    const token = admin.generateAuthToken();
    return res.status(200).json({
      status: "SUCCESS",
      message: "Signin successful",
      token,
      data: admin,
    });
  } catch (ex) {
    return res.status(500).send({
      message: ex.message,
    });
  }
});

module.exports = router;
