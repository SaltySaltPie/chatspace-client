export interface IRegisterAction {
  type: string;
  payload?: any;
  index?: any;
}

export interface IRegisterState {
  username: string;
  password: string;
  password2: string;
  email: string;
  loading: boolean;
  error: string;
}

export const registerReducer = (
  state: IRegisterState,
  action: IRegisterAction
): IRegisterState => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "password2":
      return { ...state, password2: action.payload };
    case "loading":
      return { ...state, loading: action.payload };
    case "error":
      return { ...state, error: action.payload };
    case "default":
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};
