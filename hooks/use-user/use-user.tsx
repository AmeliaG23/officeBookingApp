import { UserContext } from "@/context/user-context";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    console.error("useUser not used within UserProvider");
  }

  return context;
};
