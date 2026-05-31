// import { useEffect } from "react";
// import useAuthStore from "../stores/authStore";
// import { useMe } from "./useGetUser";

// export const useAuthInit = () => {
//   const { data } = useMe();
//   const login = useAuthStore((s) => s.login);
//   useEffect(() => {
//     if (!data) return;
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     login({
//       user: data,
//       token,
//     });
//   }, [data, login]);
// };
import { useEffect } from "react";
import useAuthStore from "../stores/authStore";
import { useMe } from "./useGetUser";

export const useAuthInit = () => {
  const { data } = useMe();
  const login = useAuthStore((s) => s.login);
  useEffect(() => {
    if (!data) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    login({
      user: data,
      token,
    });
  }, [data, login]);
};
