import User from "../models/user.model.js";
import genToken from "../config/token.js";

// frontend data

export const googleAuth = async (req, res) => {
    try {
        const {name, email} = req.body;
        if (!name || !email) {
            return res.status(400).json({message: "Name and email are required"});
        }

        let user = await User.findOne({email});
        if(!user) {
            user = await User.create({
                name, 
                email
            });
        }
        let token = await genToken(user._id)
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json(user)

    } catch (error) {
            return res.status(500).json({message: `Google Auth Error ${error.message}`});
    }
}

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({message: "Logout successful"});
    } catch (error) {
        return res.status(500).json({message: `Logout Error ${error.message}`});
    }
};
