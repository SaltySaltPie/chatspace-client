import { AxiosError } from "axios";

export const axiosErrorHandler2 = (error: AxiosError) => {
  // if (error.response?.status === 401) return navigate("/");
  console.log({ error });
};
