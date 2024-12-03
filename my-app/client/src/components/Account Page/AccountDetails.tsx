import { useContext } from "react";
import { AccountContext } from "../../context/AccountContext";

function AccountDetails() {
    const { userInfo } = useContext(AccountContext);

    return (
        <div id="account-details">
            <div><p>Name: {userInfo.name}</p></div>
            <div><p>Email: {userInfo.email}</p></div>
        </div>
    )
}

export default AccountDetails;