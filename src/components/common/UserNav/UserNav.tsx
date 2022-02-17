import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IAppState } from "../../../context/AppState";
import { hostURL } from "../../../data/host";
import styles from "./userNav.module.scss";

function UserNav({ appState }: { appState: IAppState }) {
  const navigate = useNavigate()
  const { username, _id } = appState.user;
  if (!username) return null;
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${hostURL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.redirect) window.location.href = res.data.redirect;
    } catch (error: any) {
      if (error.response?.status === 401) navigate("/login");
      console.log({ error });
    }
  };
  return (
    <section className={`${styles.contentC}`}>
      <Link to={`/user/${_id}`}>
        <article className={`${styles.userC} cC`}>@{username}</article>
      </Link>
      <article className={`${styles.navC} cC`}>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/People"}>People</Link>
          </li>
          <li>
            <Link to={`/user/${_id}`}>My Posts</Link>
          </li>
          <li>
            <Link to={"/Setting"}>Setting</Link>
          </li>
          <li className={`${styles.logOut}`}  onClick={() => logoutHandler()}>
            Log Out
          </li>
        </ul>
      </article>
    </section>
  );
}

export default UserNav;
