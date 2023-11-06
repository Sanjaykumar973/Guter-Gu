import React from "react";

const senderStyle = {
  backgroundColor: "lightpink",
  width: "fit-content",
  padding: 7,
  borderRadius: 10,
  borderBottomRightRadius: 0,
  margin: 10,
};
const recieverStyle = {
  backgroundColor: "lightblue",
  width: "fit-content",
  padding: 7,
  borderRadius: 10,
  borderTopLeftRadius: 0,
  margin: 10,
};

export default function Messages() {
  return (
    <div className="p-3">
      <div>
        <p style={recieverStyle}>Hii How are you </p>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <p style={senderStyle}>Hii How are you </p>
      </div>
      <div>
        <p style={recieverStyle}>Hii How are you </p>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <p style={senderStyle}>Hii How are you </p>
      </div>
    </div>
  );
}
