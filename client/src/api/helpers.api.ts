import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

export function handleAxiosError(error: any) {
  if (axios.isAxiosError(error) && error.response) {
    if (error.response.status === 500) {
      return "Api Error! Please contact the support";
    } else {
      return error.response.data;
    }
  } else {
    return "Network error! Please contact the support or try again later";
  }
}

export async function handleAxiosRequest(request: Promise<AxiosResponse<any, any>>): Promise<boolean> {
  let success = false;
  await toast.promise(request, {
    loading: "Loading...",
    success: (response) => {
      success = true;
      return response.data.message;
    },
    error: (error: any) => handleAxiosError(error),
  });
  return success;
}
