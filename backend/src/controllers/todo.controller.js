import { supabase } from "../config/SupabaseConfig.js";
export const createTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                status: false,
                message: "Title is required"
            });
        }
        const { data, error } = await supabase
            .from("todo")
            .insert([{ title, user_id: userId }])
            .select();
        if (error) throw error;
        res.status(201).json({
            status: true,
            message: "Todo created successfully",
            data
        });
    } catch (error) {
        console.error("Create Todo Error:", error.message);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};
export const getTodos = async (req, res) => {
    try {
        const userId = req.user.id;
        const { data, error } = await supabase
            .from("todo")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });
        if (error) throw error;
        res.status(200).json({
            status: true,
            data
        });
    } catch (error) {
        console.error("Get Todos Error:", error.message);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};
export const updateTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { title, completed } = req.body;
        const { data: existing } = await supabase
            .from("todo")
            .select("*")
            .eq("id", id)
            .eq("user_id", userId)
            .maybeSingle();
        if (!existing) {
            return res.status(404).json({
                status: false,
                message: "Todo not found"
            });
        }
        const { data, error } = await supabase
            .from("todo")
            .update({ title, completed })
            .eq("id", id)
            .select();
        if (error) throw error;
        res.status(200).json({
            status: true,
            message: "Todo updated successfully",
            data
        });
    } catch (error) {
        console.error("Update Todo Error:", error.message);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};
export const deleteTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { data: existing } = await supabase
            .from("todo")
            .select("*")
            .eq("id", id)
            .eq("user_id", userId)
            .maybeSingle();
        if (!existing) {
            return res.status(404).json({
                status: false,
                message: "Todo not found"
            });
        }
        const { error } = await supabase
            .from("todo")
            .delete()
            .eq("id", id);
        if (error) throw error;
        res.status(200).json({
            status: true,
            message: "Todo deleted successfully"
        });
    } catch (error) {
        console.error("Delete Todo Error:", error.message);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};