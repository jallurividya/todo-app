import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data.data);
    } catch {
      toast.error("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return toast.error("Enter a todo");

    setLoading(true);
    try {
      await api.post("/todos", { title: text });
      setText("");
      toast.success("Todo added ");
      fetchTodos();
    } catch {
      toast.error("Error adding todo");
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      await api.put(`/todos/${todo.id}`, {
        title: todo.title,
        completed: !todo.completed,
      });
      fetchTodos();
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      toast.success("Deleted");
      fetchTodos();
    } catch {
      toast.error("Delete failed");
    }
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.title);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return toast.error("Text cannot be empty");

    try {
      await api.put(`/todos/${id}`, { title: editText });
      toast.success("Updated");
      setEditId(null);
      fetchTodos();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">

      <div className="bg-gradient-to-r from-orange-400 to-orange-500 shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Todo App
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-700 text-white px-4 py-1 rounded-lg hover:bg-red-600 cursor-pointer text-sm"
        >
          Logout
        </button>
      </div>

      <div className="p-4">

        <div className="max-w-2xl mx-auto bg-white p-4 rounded-2xl shadow mb-6">
          <div className="flex flex-col sm:flex-row gap-3">

            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a task here..."
              className="border border-gray-300 p-3 flex-1 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />

            <button
              onClick={addTodo}
              disabled={loading}
              className={`px-6 py-3 text-white rounded-xl cursor-pointer transition duration-200
                ${loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"}`}
            >
              {loading ? "Adding..." : "Add"}
            </button>

          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">

          {todos.length === 0 && (
            <div className="text-center text-gray-500 bg-white p-6 rounded-xl shadow">
               No tasks yet. Start your productivity journey!
            </div>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white p-4 rounded-2xl shadow flex items-center justify-between gap-4 hover:shadow-lg transition duration-200"
            >

              {editId === todo.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-2 rounded-lg flex-1"
                />
              ) : (
                <div className="flex items-center gap-3 flex-1">

                  <div
                    onClick={() => toggleTodo(todo)}
                    className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-all duration-200
                      ${todo.completed 
                        ? "bg-green-500 border-green-500 scale-110" 
                        : "border-gray-400 bg-white hover:border-green-400"}`}
                  ></div>

                  <span
                    className={`text-base ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-700"
                    }`}
                  >
                    {todo.title}
                  </span>

                </div>
              )}

              <div className="flex gap-2 flex-wrap">

                {editId === todo.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-blue-600 text-sm"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-4 py-1 rounded-lg cursor-pointer text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(todo)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-red-600 text-sm"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}