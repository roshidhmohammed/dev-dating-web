import { io } from "socket.io-client";

export const createSocketConnect = () => {
  if (location.hostname === "localhost") {
    return io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
    });
  } else {
    return io("/", {
      path: "/api/socket.io",
      withCredentials: true,
    });
  }
};
