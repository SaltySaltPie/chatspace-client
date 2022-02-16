import { Link } from "react-router-dom";
import { IAppState } from "../../context/AppState";
import styles from "./friends.module.scss";

function Friends({ appState }: { appState: IAppState }) {
  const { friends } = appState.user;
  return (
    <section className={`${styles.contentC} cC`}>
      <div className={`${styles.title}`}>Friends</div>
      {friends?.length === 0 && <div></div>}
      {friends?.map((friend) => (
        <div key={friend._id} className={`${styles.friendC}`}>
          <Link to={`/user/${friend._id}`}>
            <div>@{friend.username}</div>
          </Link>
        </div>
      ))}
    </section>
  );
}

export default Friends;
