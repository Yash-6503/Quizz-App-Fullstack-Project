import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    phoneNo: "",
  });

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phoneNo: Number(formData.phoneNo),
        }),
      });

      const contentType = response.headers.get("content-type");

      let message = "";
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        message = data.message || "Registration completed!";
        console.log(data);
      } else {
        message = await response.text(); // fallback to plain text
      }

      setPopupMessage(message);
      setShowPopup(true);
    } catch (error) {
      console.log(error);
      setPopupMessage("Something went wrong. Please try again.");
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-indigo-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            name="phoneNo"
            placeholder="Phone Number"
            value={formData.phoneNo}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* ✅ Login Option */}
        <div className="mt-6 text-center text-gray-700 text-lg">
          Already have an account?
          <Link to="/login" className="text-indigo-600 font-semibold ml-1 hover:underline">
            Login here
          </Link>
        </div>

        {/* Popup Message */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-100 p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
              <p className="text-gray-800 mb-4">{popupMessage}</p>
              <Link to="/">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Close
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
