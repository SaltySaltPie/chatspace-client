import { Link } from "react-router-dom";
import { IReply } from "../post/Post";
import styles from "./replies.module.scss";
function Replies({ replies }: { replies: IReply[] }) {
  return (
    <section className={`${styles.contentC}`}>
      {replies.map((reply) => (
        <div className={`${styles.replyC}`} key={reply._id}>
          <div className={`${styles.username}`}>
            <Link to={`/user/${reply.owner._id}`}>
              @{reply.owner.username}:
            </Link>
          </div>
          <div className={`${styles.reply}`}>{reply.content}</div>
        </div>
      ))}
    </section>
  );
}

export default Replies;
