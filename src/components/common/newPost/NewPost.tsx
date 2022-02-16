import axios from "axios";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { IAppState } from "../../../context/AppState";
import { hostURL } from "../../../data/host";
import { axiosErrorHandler } from "../../../lib/axiosErrorHandler";
import styles from "./newPost.module.scss";
function NewPost({
  appState,
  fetchPosts,
}: {
  appState: IAppState;
  fetchPosts: () => void;
}) {
  const [text, setText] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (fetching || !text) return;
    if (!appState.user.username) window.location.href = "/login";
    try {
      setFetching(true);
      setText("");
      const res = await axios.post(
        `${hostURL}/posts`,
        { content: text },
        {
          withCredentials: true,
        }
      );
      console.log({ res });
      if (res.data.success === true) {
        setFetching(false);
        fetchPosts();
      }
    } catch (error: any) {
      axiosErrorHandler(error);
    }
  };

  return (
    <section className={`${styles.contentC}`}>
      <textarea
        placeholder="Share with us!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="button" className={`btn1`} onClick={() => handleSubmit()}>
        {fetching ? (
          <TailSpin color="white" height={"1rem"} width={"3rem"}></TailSpin>
        ) : (
          <div>Post It!</div>
        )}
      </button>
    </section>
  );
}

export default NewPost;
