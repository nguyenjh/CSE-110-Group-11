import { createContext, useState } from "react";
import { UserInformation } from "../types/types";

interface AccountContextType {
  userInfo: UserInformation;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInformation>>;
}
const loggedInUser = JSON.parse(localStorage.getItem('user') || 'null');


const newUser: UserInformation = {
    name: "John Doe",
    email: "johndoe@example.com"
  };

const initialState: AccountContextType = {
  userInfo: loggedInUser,
  setUserInfo: () => {},
};

export const AccountContext = createContext<AccountContextType>(initialState);

export const AccountContextProvider = (props: any) => {
  const [userInfo, setUserInfo] = useState<UserInformation>(initialState.userInfo);

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
