import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAppState } from "../../context/AppState";
import { hostURL } from "../../data/host";
import { axiosErrorHandler } from "../../lib/axiosErrorHandler";
import NewPost from "../common/newPost/NewPost";
import Posts from "../Posts/Posts";
import UserInfo from "../UserInfo/UserInfo";
import styles from "./home.module.scss";
export interface IPost {
  _id: string;
  owner: {
    username: string;
    _id: string;
  };
  date: number;
  content: string;
  upvotes: [
    {
      _id: string;
      username: string;
    }
  ];
  downvotes: [
    {
      _id: string;
      username: string;
    }
  ];
  comments: [
    {
      _id: string;
      content:string
      username: string;
    }
  ];
}
function Home({ appState }: { appState: IAppState }) {
  const [posts, setPosts] = useState<IPost[]>([]);

  const { uID } = useParams();

  const fetchPosts = async (pageID?: number) => {
    let res;
    try {
      if (uID)
        res = await axios.get(`${hostURL}/user/${uID}/${pageID || 0}`, {
          withCredentials: true,
        });
      else
        res = await axios.get(`${hostURL}/posts/${pageID || 0}`, {
          withCredentials: true,
        });
      if (res.data.success === true) setPosts([...res.data.posts]);
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [uID]);

  return (
    <section className={`${styles.contentC}`}>
      {!uID ? (
        <div className={`cC`}>
          <NewPost appState={appState} fetchPosts={fetchPosts}></NewPost>
        </div>
      ) : (
        <div className={``}>
          <UserInfo uID={uID} appState={appState}></UserInfo>
        </div>
      )}
      <div className={``}>
        <Posts posts={posts} appState={appState}></Posts>
      </div>
    </section>
  );
}

export default Home;
