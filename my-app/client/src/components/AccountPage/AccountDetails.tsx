import { useContext } from "react";
import { AccountContext } from "../../context/AccountContext";

function AccountDetails() {
    const { userInfo } = useContext(AccountContext);

    return (
        <div id="account-details">
            <div><p>Name: {userInfo.name}</p></div>
            <div><p>Email: {userInfo.email}</p></div>
            <div><p>Uploaded Recipes: 4</p></div>
            <div><p>Comments: 10</p></div>
            <div><p>Join Date: 02-24-2024</p></div>
        </div>
    )
}

export default AccountDetails;