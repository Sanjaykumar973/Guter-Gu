import React from "react";

export default function FriendCard() {
  return (
    <div
      // onClick={() => {
      //   setReceiver({ connectionId, name, receiverId });
      // }}
      className="card p-2 my-2"
      style={{ width: "100%" }}
    >
      <div className="row">
        <div className="col col-12 d-flex">
          <img
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src="https://media.licdn.com/dms/image/C4D0BAQGeSC6ylm6I_A/company-logo_100_100/0/1663240681838?e=1707350400&v=beta&t=HyCI82cRQiIo1tqp96TmUmUEJr7JLV8DuGQhK-F7wEU"
          />
          <p className="mx-2 mt-1">GwlTech</p>
        </div>
      </div>
    </div>
  );
}
