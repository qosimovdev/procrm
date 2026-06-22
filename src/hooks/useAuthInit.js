import { useEffect } from "react";
import useAuthStore from "../stores/authStore";
import { useMe } from "./useGetUser";

export const useAuthInit = () => {
  const { data, isLoading, isError } = useMe();
  const login = useAuthStore((s) => s.login);
  const setInitializing = useAuthStore((s) => s.setInitializing);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setInitializing(false);
      return;
    }
    if (data) {
      login({
        user: data,
        token,
      });
      setInitializing(false);
    }
    if (!isLoading && isError) {
      setInitializing(false);
    }
  }, [data, isLoading, isError, login, setInitializing]);
};