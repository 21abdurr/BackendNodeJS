import User from "../models/User.js";
import emailExist from "../libraries/emailExist.js";

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
      if (!req.body.password.lenght < 6) {
        throw { code: 400, message: "Password to short ! || Minimum 6 characters" };
      }

      const isEmailExist = await emailExist(req.body.email);
      if (isEmailExist) {
        throw { code: 409, message: "Email already exist" };
      }
      const user = await User.create(req.body);
      if (!user) {
        throw { code: 500, message: "User not created" };
      }

      console.log(req.body);
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
}

export default new AuthController();
