import { account } from "@/lib/appwrite";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";

type AuthUser = Models.User<Models.Preferences>;

type UserContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
};

export const UserContext = createContext<UserContextValue | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession({ email, password });
      const response = await account.get();
      setUser(response);
    } catch (error) {
      const appwriteError = error as {
        message?: string;
        type?: string;
      };
      const isSessionAlreadyActive =
        appwriteError?.type === "user_session_already_exists" ||
        appwriteError?.message?.includes("session is active");

      if (isSessionAlreadyActive) {
        const response = await account.get();
        setUser(response);
        return;
      }

      console.log("Error logging in -", error);
      throw error;
    }
  }

  async function signUp(email: string, password: string, name: string) {
    try {
      await account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      await login(email, password);
    } catch (error) {
      console.log("Error signing up -", error);
      throw error;
    }
  }

  async function logout() {
    await account.deleteSession({ sessionId: "current" });
    setUser(null);
  }

  async function getInitialUserValue() {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
      console.log("No user session found- ", error);
    } finally {
      console.log("Initial user value set");
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, signUp, logout, authChecked }}>
      {children}
    </UserContext.Provider>
  );
}
