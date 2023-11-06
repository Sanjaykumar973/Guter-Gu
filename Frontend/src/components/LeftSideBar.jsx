import React from "react";
import UserProfileCard from "./UserProfileCard";
import Friends from "./Friends";

export default function LeftSideBar() {
  return (
    <div style={{ border: "1px solid #d5d5d5", padding: 0 }}>
      <UserProfileCard />
      <Friends />
    </div>
  );
}
