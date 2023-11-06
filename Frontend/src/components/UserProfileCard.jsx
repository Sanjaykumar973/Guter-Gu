import { useContext } from "react";
import ChatContext from "../../ChatContext";

export default function UserProfileCard() {
  const { logout, user } = useContext(ChatContext);

  return (
    <div className="card p-2" style={{ width: "100%", borderRadius: 0 }}>
      <div className="row">
        <div className="col col-8 d-flex">
          <img
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src="https://media.licdn.com/dms/image/C4D03AQF5u0LoxALZgg/profile-displayphoto-shrink_200_200/0/1602473706161?e=1704326400&v=beta&t=xILRAaXSxi5jFZcyJoTAs0rZSOXTdPQ1Lftdsg-DupE"
          />
          <p className="mx-2 mt-1">{user && user.name}</p>
        </div>
        <div className="col col-4">
          <button onClick={logout} className="btn btn-sm btn-warning">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
