//import packeges
const User = require("../modals/ChatUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const login = (req, res) => {
  const { email, password } = req.body;
  // check if data is valid
  if (!email || !password)
    return res.status(401).json({ success: false, message: "Invalid Data" });

  //check if user exists or not
  User.findOne({ email: email })
    .then((user) => {
      // check if user exists
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "invalid Email" });
      // check if user is verified or not
      if (user.verified == false)
        return res
          .status(401)
          .json({ success: false, message: "Please Verified Your Email !!" });
      //check the password
      bcrypt.compare(password, user.password, function (err, result) {
        //correct password
        if (result) {
          // sign the token
          const token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
            },
            "ABCD1234"
          );

          //sen this token to user
          return res.status(200).json({
            success: true,
            message: "Logged In Success",
            token,
            name: user.name,
          });
        }
        //incorrect password
        else {
          return res
            .status(401)
            .json({ success: false, message: "invalid Password" });
        }
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "something went Wrong : " + err.message,
      })
    );
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // checkif datais invalid
  if (!email || !password || !name)
    return res.status(401).json({ success: false, message: "Invalid Data" });

  try {
    const user = await User.findOne({ email: email });

    if (user)
      return res.status(401).json({
        success: false,
        message: "Account Already Exist with this Email!!",
      });

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({ name, email, password: hashPassword });

    //sign the token
    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      "VERIFIEDEMAIL1234"
    );

    // SEND MAIL TO USER
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sanjayka1993@gmail.com",
        pass: "mqkriajqxteubgyx",
      },
    });

    let mailDetails = {
      from: "sanjayka1993@gmail.com",
      to: newUser.email,
      subject: "Activate Your Guter-Gu Account ",
      html: `
                <h1> Welcome in Guter-Gu Family !</h1>
                <p>we are happy to onbord you </p>
                <a href="http://localhost:8000/auth/activate-account/${token}"> click here to verify the email </a>
                `,
    };

    await mailTransporter.sendMail(mailDetails);

    res.status(200).json({
      success: true,
      message: "Activetion Account link has been send Your Email",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong :" + err.message,
    });
  }
};

const activateAccount = async (req, res) => {
  const token = req.params.token;
  try {
    const data = jwt.verify(token, "VERIFIEDEMAIL1234");

    await User.findByIdAndUpdate(data._id, { verified: true });
    res.redirect("http://localhost:5173/");
  } catch (err) {
    res.json({ success: false, message: "Link Expired" });
  }
};
module.exports = { login, signup, activateAccount };
