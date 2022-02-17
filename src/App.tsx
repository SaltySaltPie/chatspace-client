import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { AppContext } from "./context/AppContext";

import styles from "./app.module.scss";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import UserNav from "./components/common/UserNav/UserNav";
import Friends from "./components/Friends/Friends";
function App() {
  const { appState, appDispatch } = useContext(AppContext);
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);

  const goTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className={`${styles.contentC}`}>
      <Nav appState={appState}></Nav>
      <div style={{ position: "fixed", top: "0", left: "0" }}></div>
      <section className={`${styles.mainC}`}>
        <article className={`${styles.leftC} ${showLeft && styles.showLeft}`}>
          {appState.user._id && <UserNav appState={appState}></UserNav>}
        </article>
        <article className={`${styles.centerC}`}>
          <Routes>
            <Route path="/" element={<Home appState={appState} />}></Route>
            <Route
              path="/user/:uID"
              element={<Home appState={appState} />}
            ></Route>
            <Route
              path="/register"
              element={<Register appDispatch={appDispatch} />}
            ></Route>
            <Route
              path="/login"
              element={<Register appDispatch={appDispatch} />}
            ></Route>
          </Routes>
        </article>
        <article
          className={`${styles.rightC} ${showRight && styles.showRight}`}
        >
          {appState.user._id && <Friends appState={appState}></Friends>}
        </article>
      </section>
      <section className={`${styles.controlsC}`}>
        <div onClick={() => setShowLeft(!showLeft)}>
          <img src="/icons/menu.png" alt="" />
          <div>Menu</div>
        </div>
        <div onClick={() => goTop()}>
          <img src="/icons/draft.png" alt="" />
          <div>Write</div>
        </div>
        <div onClick={() => setShowRight(!showRight)}>
          <img src="/icons/chat.png" alt="" />
          <div>Social</div>
        </div>
      </section>
      {(showLeft || showRight) && (
        <section
          className={`${styles.clearScreen}`}
          onClick={() => {
            setShowLeft(false);
            setShowRight(false);
          }}
        ></section>
      )}
    </section>
  );
}

export default App;
