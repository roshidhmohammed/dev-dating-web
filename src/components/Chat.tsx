import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnect } from "../utils/socket";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { axiosInstance } from "../utils/apis/axiosInstance";
import type { RootState } from "../utils/store";
import type { Socket } from "socket.io-client";
import type {  UserDataState } from "../types/types";

interface Message {
  _id: string;
  senderId: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePic: string;
  };
  text: string;
  updatedAt: string;
}

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store:RootState | UserDataState) => store?.user);
  const userId = user?._id;
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    fetchAllMessage();
  },[newMessage]);

  const fetchAllMessage = async () => {
    await axiosInstance
      .get(`/chat/${targetUserId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.chat.messages);
        setMessages(res.data.chat.messages);
      })
      .catch((error) => {
        toast.error(error.data.message)
      });
  };

  useEffect(() => {
    if (!user) return;

    const socket = createSocketConnect();
    socketRef.current = socket;

    socketRef.current?.on("unauthorized", (message) => {
      toast.error(message || "Please login again.");
      socket.disconnect(); // optional: clean up connection
      navigate("/auth/login");
    });

    socketRef.current?.on("connect_error", (err) => {
      console.log(err);
      if (err.message.includes("Authentication failed")) {
        toast.error("Please login again.");
        socket.disconnect();
        navigate("/auth/login");
      }
    });

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

        socketRef.current?.on("chatError", (message) => {
    toast.error(message || "Something went wrong while sending the message.");
  });

    // socket.on("receiveMessage", ({ userName, text }) => {
    //   // console.log(userName + " " + text);
    //   // setMessages((message) => [...message, { userName, text }]);
    // });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receiveMessage");
        socketRef.current.off("connect_error");
         socketRef.current?.off("chatError");
        socketRef.current.disconnect();
      }
    };
  }, [userId, targetUserId]);

  const SendMessage = () => {
    socketRef.current?.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className=" my-auto  sm:w-1/2 w-full sm:px-0 px-10 ">
      <div className=" bg-base-200 rounded-lg  flex-col flex justify-between  ">
        <h1 className=" py-2 border-b  border-gray-500 pl-2 text-lg  text-gray-300">
          Start your converation
        </h1>

        <div className="p-3 h-[35vh] overflow-auto">
          {messages?.map((message) => (
            <div
              key={message?._id}
              className={`chat ${
                message.senderId?._id === targetUserId
                  ? "chat-start"
                  : "chat-end"
              } mt-2`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={message?.senderId?.profilePic}
                  />
                </div>
              </div>
              <div className="chat-header ">
                {message?.senderId?.firstName +
                  " " +
                  message?.senderId?.lastName}
                <time className="text-xs  opacity-50 ml-2">
                  {message.updatedAt.slice(0, 10)}
                </time>
              </div>
              <div className="chat-bubble min-w-40">{message?.text}</div>
              {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>
          ))}
        </div>

        <div className=" flex w-full mt-5 gap-3 border-gray-500 p-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Enter your message"
            className="input input-secondary w-full"
          />
          <button className="btn btn-secondary" onClick={() => SendMessage()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
