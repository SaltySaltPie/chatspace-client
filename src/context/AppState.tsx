import axios from "axios";
import React, { ReactNode, useEffect, useReducer } from "react";
import { hostURL } from "../data/host";
import { AppContext } from "./AppContext";
import { appReducer } from "./appReducer";

interface IProps {
  children: ReactNode;
}

export type IAppState = {
  isLogged?: boolean;
  theme: string;
  user: {
    username?: string;
    _id?: string;
    posts?: number;
    comments?: number;
    friends: {
      _id: string;
      username: string;
    }[];
    following?: {
      _id: string;
      username: string;
    }[];
  };
};

//   appState?: IAppState
//   appDispatch?: React.Dispatch<IAction>

function AppState(props: IProps): JSX.Element {
  const appInitState: IAppState = {
    theme: "one",
    user: {
      friends: [],
    },
  };
  const [appState, appDispatch] = useReducer(appReducer, appInitState);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${hostURL}/api/user/0`, {
        withCredentials: true,
      });
      const { user } = res.data;
      if (user) appDispatch({ type: "setUser", payload: user });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
