import * as React from "react";
import toast from "react-hot-toast";
import { apiHealthcheckRequest, getUserRequest } from "../api";
import { setSessionAction, useAppDispatch } from "../redux";

function useInitializeApp() {
  const [isHealthy, setIsHealthy] = React.useState(false);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    async function initializeApp() {
      const isHealthy = await apiHealthcheckRequest();
      setIsHealthy(isHealthy);
      if (isHealthy) {
        try {
          const response = await getUserRequest();
          toast.success(response.data.message);
          dispatch(setSessionAction(response.data.data));
        } catch (error) {
          return;
        }
      }
    }
    initializeApp();
  }, [dispatch]);
  return isHealthy;
}

export default useInitializeApp;
