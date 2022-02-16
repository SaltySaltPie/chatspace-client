import { IAppState } from "./AppState";

export interface IAction {
  type: string;
  payload?: any;
  index?: any;
}

export const appReducer = (state: IAppState, action: IAction) => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    default:
      return { ...state };
  }
};
