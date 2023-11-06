import React from "react";

export default function SendBox() {
  return (
    <div
      className="d-flex justify-content-between mt-1 p-2"
      style={{
        position: "absolute",
        bottom: "8px",
        width: "100%",
        backgroundColor: "#d5d5d5",
      }}
    >
      <input
        className="border-0 px-2"
        style={{ outline: "none", width: "90%" }}
        placeholder="Type Your Message"
      />
      <button className="btn btn-primary btn-sm">Send</button>
    </div>
  );
}
