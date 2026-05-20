import { useAuthInit } from "../hooks/useAuthInit";

export function AuthProvider({ children }) {
  useAuthInit();
  return children;
}
