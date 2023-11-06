import React from "react";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

export default function Home() {
  return (
    <div className="container mt-5 p-0">
      <div style={{ display: "flex", gap: "20px", height: "80vh" }}>
        <LeftSideBar />
        <RightSideBar />
      </div>
    </div>
  );
}
