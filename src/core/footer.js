import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "200px",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>
        <h4 style={{ color: "white", padding: "20px" }}>Where to buy?</h4>
        <h6 style={{ color: "white", padding: "20px" }}>
          See authorized retailers
        </h6>
      </div>
      <div style={{ color: "white", marginTop: "auto" }}>
        <h6>
          <b>Follow us:</b>
        </h6>
        <h6>Twitter</h6>
        <h6>Facebook</h6>
        <h6>Instagram</h6>
        <h6>Location:</h6>
        <h6>Mitrapark, Kathmandu</h6>
        <h6> ©Copyright 2022</h6>
      </div>
      <div style={{ color: "white" }}>
        <ul style={{ listStyle: "none", padding: "20px", cursor: "pointer" }}>
          <li>Contact Us</li>
          <li>About Us</li>
          <li>Send a Message</li>
          <li>Who we are?</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
