import React, { useState } from "react";
import axios from "../api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Sending your message...");

    try {
      await axios.post("/contact", form);

      toast.dismiss(loadingToast);
      toast.success("✅ Thank you! Your message has been sent successfully.");

      // Reset form
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("❌ Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-8 md:px-16">
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-5xl mx-auto text-gray-800">
        {/* ====== PAGE HEADING ====== */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-[#002b6b]">
          Get in Touch
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-6 text-center leading-relaxed">
          We value your feedback and are here to assist you with any queries or
          concerns you may have. Whether you're interested in accreditation,
          courses, or any other inquiries related to the Indian Institute of
          Skill Training (IIST), our dedicated team is ready to help you.
        </p>

        {/* ====== CONTACT INFO ====== */}
        <div className="bg-[#002b6b] text-white p-6 sm:p-8 rounded-2xl shadow-lg mb-10">
          <p className="mb-2 text-lg font-semibold">
            Address:{" "}
            <span className="font-normal">
              Indian Institute of Skill Development (IISD)
            </span>
          </p>
          <p className="mb-1">
            <span className="font-semibold">Phone:</span>
          </p>
          <ul className="ml-4 mb-3">
            <li>For general inquiries: +91 8882408906</li>
            <li>For admissions and accreditation: +91-XXXX-XXXXXX</li>
          </ul>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <span className="font-normal">testing@gmail.com</span>
          </p>
        </div>

        {/* ====== CONTACT FORM HEADING ====== */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-[#002b6b]">Contact Form</h2>
          <p className="text-gray-600">
            To streamline your inquiries, you can fill out the contact form below,
            and we will respond to you as soon as possible.
          </p>
        </div>

        {/* ====== CONTACT FORM ====== */}
        <div className="bg-[#002b6b] text-white p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name and Phone */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
              <div className="flex-1 flex flex-col">
                <label className="mb-2 font-medium text-white">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Your Name"
                  className="p-3 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="mb-2 font-medium text-white">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Contact Number"
                  className="p-3 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-white">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter Your Email"
                className="p-3 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-white">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Enter Your Message"
                className="p-3 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-orange-500"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#ea5a21] hover:bg-orange-600 text-white font-semibold py-2 px-8 rounded-full text-lg transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
