import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { IAppState } from "../../context/AppState";
import Post from "../common/post/Post";
import { IPost } from "../Home/Home";
import styles from "./posts.module.scss";

function Posts({ posts ,appState}: { posts: IPost[] , appState: IAppState}) {


  if (posts.length === 0)
    return (
      <div className={`${styles.contentC}`}>
        <div className={`${styles.title}`}>No Posts Yet :(</div>
      </div>
    );

  return (
    <section className={`${styles.contentC}`}>
      <div className={`${styles.title}`}>New Posts</div>
      {posts.map((post) => (
        <Post key={post._id} post={post} appState={appState}></Post>
      ))}
    </section>
  );
}

export default Posts;
