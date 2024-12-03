// useSystemData.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSystemData } from "../redux/systemSlice";

export const useSystemData = () => {
  const dispatch = useDispatch();
  const systemData = useSelector((state) => state.system.data);
  const status = useSelector((state) => state.system.status);
  const error = useSelector((state) => state.system.error);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchSystemData());
    }, 1000); // Refreshing rate

    return () => clearInterval(interval); 
  }, [dispatch]);

  return { systemData, status, error };
}; 