import { AxiosError } from "axios";

export const axiosErrorHandler = (error: AxiosError) => {
  if (error.code === "401") window.location.href = "/login";
  console.log({error});
  
};
