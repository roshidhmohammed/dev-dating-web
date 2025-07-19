import { useParams } from "react-router-dom";

const Chat = () => {
  const { conversationId } = useParams();
  console.log(conversationId);
  return (
    <div className=" my-auto  sm:w-1/2 w-full sm:px-0 px-10 ">
      <div className=" bg-base-200 rounded-lg  flex-col flex justify-between  ">
        <h1 className=" py-2 border-b  border-gray-500 pl-2 text-lg  text-gray-300">
          Start your converation
        </h1>

        <div className="p-3 h-[35vh] overflow-auto">
          <div className="chat chat-start mt-2">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Roshidh
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Vijay
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>

        <div className=" flex w-full mt-5 gap-3 border-gray-500 p-2">
            <input type="text" placeholder="Enter your message" className="input input-secondary w-full" />
            <button className="btn btn-secondary">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
