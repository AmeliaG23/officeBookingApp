import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function signIn(username, password) {}

  async function signUp(username, password) {}

  async function signOut() {}

  return (
    <UserContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

// (https://www.youtube.com/watch?v=RcrWlOgL1hM)
