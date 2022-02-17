import styles from "./userInfo.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { hostURL } from "../../data/host";
import { IAppState } from "../../context/AppState";
import { useNavigate } from "react-router-dom";

function UserInfo({
  uID,
  appState,
}: {
  uID: string | undefined;
  appState: IAppState;
}) {
  const navigate = useNavigate()
  const fetchUser = async (uID: string | undefined) => {
    console.log(`${hostURL}/api/user/${uID}/posts`);
    
    try {
      const res = await axios.get(`${hostURL}/api/user/${uID}`);
      if (res.data.success === true) setUser(res.data.user);
    } catch (error: any) {
      if (error.response?.status === 401) navigate("/login");
      console.log({ error });
    }
  };

  interface IUser {
    _id?: string;
    username?: string;
    posts?: number;
    comments?: number;
    friends?: string[];
    following?: string[];
  }

  const isFriend =
    appState.user.friends?.filter((friend) => friend._id === uID).length > 0
      ? true
      : false;

  const [user, setUser] = useState<IUser>({});
  useEffect(() => {
    fetchUser(uID);
  }, [uID]);

  return (
    <section className={`${styles.contentC} cC`}>
      <div className={`${styles.username}`}>@{user.username}</div>
      <div className={`${styles.infoC}`}>
        <div>Posts: {user.posts || 0}</div>
        <div>Comments: {user.comments || 0}</div>
        <div>Friends: {user.friends?.length || 0}</div>
        <div>Following: {user.following?.length || 0}</div>
      </div>
      {appState.user._id !== uID && !isFriend && (
        <div className={`${styles.controlC}`}>
          <button type="button">Add Friend</button>
        </div>
      )}
    </section>
  );
}

export default UserInfo;
