import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { hostURL } from "../../data/host";

function Test() {
  const { appState } = useContext(AppContext);

  const test = async () => {
    // try {
    //   const res = await axios.get(`${hostURL}/test`, {
    //     withCredentials: true,
    //     // headers: {
    //     //   "Content-Type": "application/json",
    //     // },
    //   });
    //   console.log({ res: res.data });
    // } catch (error) {
    //   console.log({ error });
    // }
    console.log({ appStateUser: appState.user });
  };
  return (
    <section>
      <button type="button" onClick={() => test()}>
        test
      </button>
    </section>
  );
}

export default Test;
