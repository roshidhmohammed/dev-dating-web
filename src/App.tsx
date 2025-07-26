import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Feed from "./components/Feed";
import Alert from "./components/common/Alert";
import ProfilePage from "./Pages/authentication/ProfilePage";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import AuthenticationPage from "./Pages/authentication/AuthenticationPage";
import PremiumAcount from "./components/PremiumAcount";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Alert />
      <BrowserRouter>
        <Routes>
          <Route path="/auth/:name" element={<AuthenticationPage />} />
          <Route path="/" element={<AppLayout />}>
            <Route index path="/" element={<Feed />} />
            <Route index path="/profile" element={<ProfilePage />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/premium" element={<PremiumAcount />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
