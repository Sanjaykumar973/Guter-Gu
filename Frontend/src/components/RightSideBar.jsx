import React from "react";
import RecieverCard from "./RecieverCard";
import Messages from "./Messages";
import SendBox from "./SendBox";

export default function RightSideBar() {
  return (
    <div
      className="col col-9"
      style={{ border: "1px solid #d5d5d5", padding: 0, position: "relative" }}
    >
      <RecieverCard />
      <Messages />
      <SendBox />
    </div>
  );
}
