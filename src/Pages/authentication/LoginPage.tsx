import MetaPageData from "../../components/common/MetaPageData";
import Login from "../../components/Login";

const LoginPage = () => {
  return (
    <div>
      <MetaPageData
        title={"Dev Dating | Modern Dating App - Find Love Near You "}
        description={"This is developer dating platform"}
        keywords={
          "dating app, find love, meet singles, online dating, chat, relationships"
        }
      />
      <Login/>
    </div>
  );
};

export default LoginPage;
