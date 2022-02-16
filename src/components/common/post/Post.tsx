import axios from "axios";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { IAppState } from "../../../context/AppState";
import { hostURL } from "../../../data/host";
import { axiosErrorHandler } from "../../../lib/axiosErrorHandler";
import { IPost } from "../../Home/Home";
import styles from "./post.module.scss";
function Post({ post, appState }: { post: IPost; appState: IAppState }) {
  const formatDate = (date: number) => {
    const d = new Date(date).getDate();
    const mo = new Date(date).getMonth() + 1;
    const y = new Date(date).getFullYear();
    const h = new Date(date).getHours();
    const mi = new Date(date).getMinutes();
    return `${d}-${mo}-${y}, ${h}:${mi < 10 ? `0${mi}` : mi}`;
  };
  const [tempPost, setTempPost] = useState(post);
  const [fetching, setFetching] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const handleVote = async (action: "up" | "down") => {
      setFetching(true)
    try {
      const res = await axios.post(
        `${hostURL}/post/${post._id}`,
        { action },
        { withCredentials: true }
      );
      if (res.data.success === true) 
      setTempPost(res.data.updatedPost)
      setFetching(false)
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  const isUp =
    tempPost.upvotes.filter((upvote) => upvote._id === appState.user._id)
      .length > 0
      ? true
      : false;

  const isDown =
    tempPost.downvotes.filter(
      (downvote) => downvote._id === appState.user._id
    ).length > 0
      ? true
      : false;

  return (
    <div key={tempPost._id} className={`${styles.postC} cC`}>
      <div className={`${styles.owner}`}>
        <Link to={`/user/${tempPost.owner._id}`}>
          @{tempPost.owner.username}
        </Link>
      </div>
      <div className={`${styles.content}`}>{tempPost.content}</div>
      <div className={`${styles.date}`}>{formatDate(tempPost.date)}</div>
      <div className={`${styles.controlsC}`}>
        {fetching ? (
          <div>
            <div>
              <TailSpin
                color="var(--main1)"
                height={"1.4rem"}
                width={"1.8rem"}
              ></TailSpin>
            </div>
          </div>
        ) : (
          <div>
            <div className={`${isUp && styles.upvote}`} onClick={()=> handleVote("up")}>
              <img src="/icons/up.png" alt="" />
            </div>
            <span>{tempPost.upvotes.length - tempPost.downvotes.length}</span>
            <div className={`${isDown && styles.downvote}`} onClick={()=> handleVote("down")}>
              <img src="/icons/down.png" alt="" />
            </div>
            <div>Reply</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
