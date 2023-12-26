import User from "../models/User.js";
import emailExist from "../libraries/emailExist.js";
import bcrypt from "bcrypt";

class AuthController {
  async register(req, res) {
    try {
      if (!req.body.fullname) {
        throw { code: 400, message: "Fullname is required" };
      }
      if (!req.body.email) {
        throw { code: 400, message: "email is required" };
      }
      if (!req.body.password) {
        throw { code: 400, message: "Password is required" };
      }
      if (req.body.password.length < 6) {
        throw { code: 400, message: "Password Minimum 6 characters" };
      }

      const isEmailExist = await emailExist(req.body.email);
      if (isEmailExist) {
        throw { code: 409, message: "Email already exist" };
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hash,
      })
      if (!user) {
        throw { code: 500, message: "User not created" };
      }

      // console.log(req.body);
      return res.status(200).json({
        status: true,
        message: "User created successfully",
        user: user,
      });
    } catch (error) {
      return (
        res
          .status(error.code || 500)
          .json({ status: false, message: error.message })
      );
    }
  }
  async login(req, res) {
    try {
      if (!req.body.email) {
        throw { code: 400, message: "Email is required" };
      }
      if (!req.body.password) {
        throw { code: 400, message: "Password is required" };
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) { throw { code: 404, message: "User not found" } }


      const isPasswordValid = await bcrypt.compareSync(
        req.body.password, user.password
      )
      if (!isPasswordValid) { throw { code: 404, message: "Invalid Password" } }

      return res.status(200).json({
        status: true,
        message: "User logged in successfully",
        fullname: user.fullname
      })

    } catch (error) {
      return (
        res
          .status(error.code || 500)
          .json({ status: false, message: error.message })
      );
    }
  }
}
export default new AuthController();
