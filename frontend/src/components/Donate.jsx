/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const Donate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      setDisableBtn(true);

      // Make a POST request to your backend /checkout endpoint
      const response = await axios.post(
        "http://localhost:4000/api/v1/checkout", // Replace with your actual backend URL
        {
          amount: amount,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const { orderId, razorpayKey } = response.data;

      // Initialize Razorpay
      const options = {
        key: razorpayKey, // Replace with your actual Razorpay key
        amount: amount * 100, // Amount in paisa
        currency: "USD",
        name: "Your App Name",
        description: "Donation",
        order_id: orderId,
        handler: function (response) {
          alert(`Payment successful: ${response.razorpay_payment_id}`);
          // Optionally handle payment success in your frontend
        },
        prefill: {
          name: name,
          email: email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      setDisableBtn(false);
      console.error("Error occurred while initiating payment:", error);
      // Optionally handle error in your frontend
    }
  };

  return (
    <section className="donate">
      <form onSubmit={handleCheckout}>
        <div>
          <img src="/logo.png" alt="logo" />
        </div>
        <div>
          <label>Show your love for Poors</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Donation Amount (USD)"
            required
          />
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn" disabled={disableBtn}>
          Donate {amount ? `₹${amount}` : "₹0"}
        </button>
      </form>
    </section>
  );
};

export default Donate;
