import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message submitted:', formData);
    alert("Message sent successfully!");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="h-full bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-indigo-600 text-white p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-indigo-100 mb-6 text-xl">
            We'd love to hear your feedback, suggestions, or any queries related to QuizMaster.
          </p>
          <p className="text-indigo-100 text-xl"><strong>Email:</strong> support@quizmaster.com</p>
          <p className="text-indigo-100 text-xl"><strong>Phone:</strong> +91 98765 43210</p>
        </div>

        {/* Right Side Form */}
        <form onSubmit={handleSubmit} className="p-10 space-y-5 bg-white">
          <div>
            <label className="block mb-1 text-lg font-medium text-indigo-700">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 text-gray-700 font-normal border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block mb-1 text-lg font-medium text-indigo-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-gray-700 font-normal border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-lg font-medium text-indigo-700">Message</label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border text-gray-700 font-normal border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white text-lg py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
