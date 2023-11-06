import React from "react";
import FriendCard from "./FriendCard";

export default function Friends() {
  return (
    <div
      className="p-2"
      style={{ border: "1px solid #d5d5d5", backgroundColor: "lightgrey" }}
    >
      <button
        type="button "
        className="btn btn-primary btn-sm "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Search a Freind
      </button>
      <button
        type="button "
        className="btn btn-warning btn-sm mx-2"
        data-bs-toggle="modal"
        data-bs-target="#pendingdiv"
      >
        Pending
      </button>
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </div>
  );
}
