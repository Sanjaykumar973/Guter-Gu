const User = require("../modals/ChatUser");
const Friends = require("../modals/Friends");

//Pending : We have to optimise this so that it will find the pattern not compare
const searchFriend = (req, res) => {
  const { query } = req.body;
  User.findOne({ $or: [{ name: query }, { email: query }] })
    .select("name _id email")
    .then((users) => {
      console.log(users);
      res.status(200).json({ success: true, users });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
};
// API: That will create the Friend

const addFriend = async (req, res) => {
  const { friendid } = req.params;

  // 1. check if user with this friendid exist or not
  try {
    const friend = await User.findById(friendid);

    // check if loggedin user nad friend id same
    // if (req.user._id == friendid)
    //   return res.status(400).json({
    //     success: false,
    //     message: "You cannot send request to yourself",
    //   });

    if (!friend) {
      return res
        .status(400)
        .json({ success: false, message: "No user Found by this Id" });
    }

    // generating the unique id by combinng both the user ids
    // let connectionId;
    // if (req.user._id > friendid) connectionId = req.user._id + friendid;
    // else connectionId = friendid + req.user._id;

    // const alreadyInConnection = await Friends.findOne({
    //   connectionId: connectionId,
    //   $or: [{ status: "Pending" }, { status: "Accepted" }],
    // });

    // 2. Check if Both are already friends ( Complex Query )
    // const alreadyInConnection = await Friends.findOne({
    //   $or: [{ status: "Pending" }, { status: "Accepted" }],
    //   $or: [
    //     {
    //       sender: req.user._id,
    //       receiver: friendid,
    //     },
    //     {
    //       sender: friendid,
    //       receiver: req.user._id,
    //     },
    //   ],
    // });

    // if (alreadyInConnection)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Already in Friends" });

    // addign the new friend in the database
    await Friends.create({
      sender: req.user._id,
      receiver: friendid,
    });
    // searching that new freind again so that we can populate it ( newFriend._id == documentId)
    // const newFriendComplete = await Friends.findById(newFriend._id).populate(
    //   "sender"
    // );

    // console.log("Hitting the Channel");
    //   pusher.trigger("new-messege-channel", "friend-request", newFriendComplete);

    return res
      .status(200)
      .json({ success: true, message: "Friend Request Sent" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
//API: This will return you all your friends who are Connected or pending
const giveConnectedFriends = async (req, res) => {
  try {
    const friends = await Friends.find({
      status: "Accepted",
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    });
    return res.status(200).json({ success: true, friends });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const fetchPendingRequest = async (req, res) => {
  try {
    const friends = await Friends.find({
      status: "Pending",
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    });
    return res.status(200).json({ success: true, friends });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  searchFriend,
  addFriend,
  giveConnectedFriends,
  fetchPendingRequest,
};
