import styles from "./userInfo.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { hostURL } from "../../data/host";
import { axiosErrorHandler } from "../../lib/axiosErrorHandler";
import { IAppState } from "../../context/AppState";

function UserInfo({
  uID,
  appState,
}: {
  uID: string | undefined;
  appState: IAppState;
}) {
  console.log({ uID });
  const fetchUser = async (uID: string | undefined) => {
    try {
      const res = await axios.get(`${hostURL}/api/user/${uID}`);
      if (res.data.success === true) setUser(res.data.user);
    } catch (error: any) {
      axiosErrorHandler(error);
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
  console.log({ user });
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
