import MetaPageData from "../../components/common/MetaPageData";
import Authentication from "../../components/Authentication";

const AuthenticationPage = () => {
  return (
    <div>
      <MetaPageData
        title="Dev Dating | Modern Dating App - Find Love Near You "
        description="This is developer dating platform"
        keywords=
          "dating app, find love, meet singles, online dating, chat, relationships"
          image=""
          url=""
        
      />
      <Authentication />
    </div>
  );
};

export default AuthenticationPage;
