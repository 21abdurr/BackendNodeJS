import User from "../models/User.js";

class AuthController {
    async register(req, res) {
        try {
            const user = await User.create(req.body);

            if (!user) { throw { code: 500, message: "User not created" } }
            console.log(req.body);
            return res
                .status(200)
                .json({ status: true, message: "User created successfully", user: user });
        } catch (error) {
            return res.status(err.code || 500).json({ status: false, message: error.message });
        }
    }
}

export default new AuthController();
