import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { UserInformation } from "../types/types";
// import { RootState } from "../store";


interface AccountContextType {
  userInfo: UserInformation;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInformation>>;
}

const newUser: UserInformation = {
    name: "John Doe",
    email: "johndoe@example.com"
  };

const initialState: AccountContextType = {
  userInfo: newUser,
  setUserInfo: () => {},
};

export const AccountContext = createContext<AccountContextType>(initialState);

export const AccountContextProvider = (props: any) => {
  const [userInfo, setUserInfo] = useState<UserInformation>(initialState.userInfo);
  // Access the Redux store to get the current logged-in user
  const loggedInUser = useSelector((state: any) => state.auth.user);

  // Update context state whenever the logged-in user changes
  useEffect(() => {
    if (loggedInUser) {
      setUserInfo({
        name: loggedInUser.user.name,
        email: loggedInUser.user.email,
      });
    }
  }, [loggedInUser]);

  return (
    <AccountContext.Provider
      value={{
        userInfo: userInfo,
        setUserInfo: setUserInfo,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};
