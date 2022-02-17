import { Link } from "react-router-dom";
import { IAppState } from "../../context/AppState";
import styles from "./nav.module.scss";

function Nav({ appState }: { appState: IAppState }) {
  const { username, _id } = appState.user;



  return (
    <nav className={`${styles.contentC}`}>
      <div className={`${styles.logoC} `}>
        <Link to={"/"}>ChatSpace</Link>
      </div>
      <div className={`${styles.navItemsC}`}>
        <ul>
          <li className={`${styles.searchC}`}>
            <input type="text" title="search" placeholder="Search" />
          </li>
        </ul>
      </div>
      {username ? (
        <div className={`${styles.userC} `}>
          <div className={`${styles.username} `}>
            <Link to={`/user/${_id}`}>
              @
              {username.length <= 10 ? username : username.slice(0, 10) + "..."}
            </Link>
          </div>

        </div>
      ) : (
        <div className={`${styles.userC}`}>
          <Link to={"/login"}>Log In</Link>
          <div>|</div>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
