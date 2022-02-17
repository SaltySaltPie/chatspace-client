import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { IAppState } from "../../../context/AppState";
import { hostURL } from "../../../data/host";
import { IPost } from "../../Home/Home";
import Replies from "../replies/Replies";
import styles from "./post.module.scss";
export interface IReply {
  _id: string;
  owner: {
    _id: string;
    username: string;
  };
  content: string;
  upvote: string[];
  downvote: string[];
}
function Post({ post, appState }: { post: IPost; appState: IAppState }) {
  const navigate = useNavigate()
  const formatDate = (date: number) => {
    const d = new Date(date).getDate();
    const mo = new Date(date).getMonth() + 1;
    const y = new Date(date).getFullYear();
    const h = new Date(date).getHours();
    const mi = new Date(date).getMinutes();
    return `${d}-${mo}-${y}, ${h}:${mi < 10 ? `0${mi}` : mi}`;
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [tempPost, setTempPost] = useState(post);
  const [fetching, setFetching] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [reply, setReply] = useState<string>("");
  const [viewReplies, setViewReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<IReply[]>([]);
  const [repliesFetching, setRepliesFetching] = useState(false);
  const fetchReplies = async () => {
    setRepliesFetching(true);
    try {
      const res = await axios.get(`${hostURL}/api/post/${post._id}/comments`);
      console.log({ res });
      if (res.data.success === true) setReplies(res.data.comments);
    } catch (error: any) {
      if (error.response?.status === 401) navigate("/login");
      console.log({ error });
    }
    setRepliesFetching(false);
  };
  useEffect(() => {
    if (viewReplies) {
      fetchReplies();
    }
  }, [viewReplies]);

  const handleVote = async (action: "up" | "down") => {
    setFetching(true);
    try {
      const res = await axios.post(
        `${hostURL}/api/post/${post._id}`,
        { action },
        { withCredentials: true }
      );
      if (res.data.redirect) window.location.href = res.data.redirect;
      if (res.data.success === true) setTempPost(res.data.updatedPost);
    } catch (error: any) {
      if (error.response?.status === 401) navigate("/login");
      console.log({ error });
    }
    setFetching(false);
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply) return;
    setFetching(true);
    try {
      const res = await axios.post(
        `${hostURL}/api/post/${post._id}`,
        { comment: reply, action: "comment" },
        { withCredentials: true }
      );
      console.log({ res });
      if (res.data.success === true) setTempPost(res.data.updatedPost);
    } catch (error: any) {
      if (error.response?.status === 401) navigate("/login");
      console.log({ error });
    }
    setReply("");
    fetchReplies();
    setViewReplies(true);
    setIsReplying(false);
    setFetching(false);
  };

  const isUp =
    tempPost.upvotes.filter((upvote) => upvote._id === appState.user._id)
      .length > 0
      ? true
      : false;

  const isDown =
    tempPost.downvotes.filter((downvote) => downvote._id === appState.user._id)
      .length > 0
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
            <div
              className={`${isUp && styles.upvote}`}
              onClick={() => handleVote("up")}
            >
              <img src="/icons/up.png" alt="" />
            </div>
            <span>{tempPost.upvotes.length - tempPost.downvotes.length}</span>
            <div
              className={`${isDown && styles.downvote}`}
              onClick={() => handleVote("down")}
            >
              <img src="/icons/down.png" alt="" />
            </div>
            <div
              onClick={() => {
                setIsReplying(true);
                inputRef.current?.focus();
              }}
            >
              Reply
            </div>
          </div>
        )}
      </div>
      {tempPost.comments.length > 0 && (
        <div
          className={`${styles.replyCountC}`}
          onClick={() => setViewReplies(true)}
        >
          View {tempPost.comments.length} replies
        </div>
      )}
      {isReplying && (
        <form className={`${styles.inputC} cC`}>
          <textarea
            title="reply"
            name="reply"
            id="reply"
            placeholder="Write a reply"
            value={reply}
            ref={inputRef}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <button type="submit" onClick={(e) => handleReply(e)}>
            Send
          </button>
        </form>
      )}

      {viewReplies && (
        <div className={`${styles.repliesC}`}>
          {repliesFetching ? (
            <div className={`${styles.repliesSpin}`}>
              <TailSpin color="var(--main1)"></TailSpin>
            </div>
          ) : (
            <Replies replies={replies}></Replies>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
