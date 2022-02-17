import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { IAppState } from "../../context/AppState";
import { hostURL } from "../../data/host";
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
      content: string;
      username: string;
    }
  ];
}
function Home({ appState }: { appState: IAppState }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const { uID } = useParams();

  const fetchPosts = async (pageID?: number) => {
    setFetching(true);
    let res;
    try {
      if (uID)
        res = await axios.get(`${hostURL}/api/user/${uID}/posts`, {
          withCredentials: true,
        });
      else
        res = await axios.get(`${hostURL}/api/posts/${pageID || 0}`, {
          withCredentials: true,
        });
      if (res.data.success === true) setPosts([...res.data.posts]);
      setFetching(false);
    } catch (error: any) {
      if (error.response?.status === 401) navigate("/login");
      console.log({ error });
      setFetching(false);
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
      {fetching ? (
        <div className={`${styles.spinC}`}>
          <TailSpin color="var(--main1)" height={"5rem"}></TailSpin>
        </div>
      ) : (
        <div className={``}>
          <Posts posts={posts} appState={appState}></Posts>
        </div>
      )}
    </section>
  );
}

export default Home;
