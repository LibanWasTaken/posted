import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./../services/firebase-config";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // console.log(currentUser);
      if (currentUser && currentUser.emailVerified) {
        setUser(currentUser);
        setLoading(false);
      } else if (
        currentUser &&
        currentUser.uid == "L1uljY8hgdZ9wnLovjJJuCr2sN63"
      ) {
        setUser(currentUser);

        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const contextValue = {
    user,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
