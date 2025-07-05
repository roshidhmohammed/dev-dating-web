import EditProfile from "../../components/EditProfile";
import MetaPageData from "../../components/common/MetaPageData";

const ProfilePage = () => {
  return (
    <div>
      <MetaPageData
        title={"Dev Dating | Modern Dating App - Find Love Near You "}
        description={"This is developer dating platform"}
        keywords={
          "dating app, find love, meet singles, online dating, chat, relationships"
        }
      />
      <div className=" flex justify-center gap-5   my-40  items-center  md:flex-row flex-col">
        <EditProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
