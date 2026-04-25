import { supabase } from "../config/SupabaseConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                status: false,
                message: "Name, email, password, and phone are required"
            });
        }
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                status: false,
                message: "Invalid phone number. It must be 10 digits and start with 6-9"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email format"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                status: false,
                message: "Password must be at least 6 characters long"
            });
        }
        const { data: existing } = await supabase
            .from("todo_users")
            .select("id")
            .eq("email", email)
            .maybeSingle();
        if (existing) {
            return res.status(409).json({
                status: false,
                message: `User with email ${email} already exists`
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase
            .from("todo_users")
            .insert([{
                name,
                email,
                password: hashedPassword,
                phone
            }])
            .select("id, name, email, phone");
        if (error) throw error;
        return res.status(201).json({
            status: true,
            message: "User created successfully",
            data
        });
    } catch (error) {
        console.error("Signup Error:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }
        const { data: user, error } = await supabase
            .from("todo_users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (error || !user) {
            return res.status(400).json({
                status: false,
                message: "Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Invalid email or password"
            });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined");
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        const { password: _, ...userData } = user;
        return res.status(200).json({
            status: true,
            message: "Login successful",
            data: userData,
            token
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};