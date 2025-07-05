import { Toaster } from "sonner";
import { TiTick } from "react-icons/ti";
import { MdError } from "react-icons/md";

const Alert = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        duration={5000}
        icons={{
          success: <TiTick className=" text-green-700 font-bold text-2xl" />,
          error: <MdError className=" text-red-700 font-bold text-2xl" />,
        }}
        toastOptions={{
          classNames: {
            description: "!text-red-900",
          },
          style: {
            background: "black",
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default Alert;
