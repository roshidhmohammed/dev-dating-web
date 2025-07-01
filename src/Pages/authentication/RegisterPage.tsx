import MetaPageData from "../../components/common/MetaPageData";
import Register from "../../components/Register";

const RegisterPage = () => {
  return (
    <div>
      <MetaPageData
        title={"Dev Dating | Modern Dating App - Find Love Near You "}
        description={"This is developer dating platform"}
        keywords={
          "dating app, find love, meet singles, online dating, chat, relationships"
        }
      />
      <Register />
    </div>
  );
};

export default RegisterPage;
