import * as React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { handleAxiosError, verifyUserRequest } from "../api";

function useVerifyUserEffect() {
  const params = useParams();
  return React.useEffect(() => {
    if (!params.id || !params.verificationCode) return;
    async function verifyUser() {
      try {
        const response = await verifyUserRequest({
          id: String(params.id),
          verificationCode: String(params.verificationCode),
        });
        toast.success(response.data.message);
        return;
      } catch (error) {
        toast.error(handleAxiosError(error));
        return;
      }
    }
    verifyUser();
  }, [params.id, params.verificationCode]);
}

export default useVerifyUserEffect;
