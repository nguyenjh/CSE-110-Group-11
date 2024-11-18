import React, { useState } from "react";
import '../css/AccountPage.css';
import EditAccount from "../components/Account Page/EditAccount";
import FavoritedRecipes from "../components/Account Page/FavoritedRecipes";
import AccountDetails from "../components/Account Page/AccountDetails";
import EditAvatar from "../components/Account Page/EditAvatar";
import { AccountContextProvider } from "../context/AccountContext";
function AccountPage() {
    const accountComponents = {
        A: <EditAvatar />,
        B: <FavoritedRecipes />,
        C: <AccountDetails />,
        D: <EditAccount />
      };
    
    type SelectedComponent = keyof typeof accountComponents;

    const [selectedComponent, setSelectedComponent] = useState<SelectedComponent>('C');

    return(
        <div id="account-page">
            {/* Floating buttons */}
            <input id="return-button" type="image" src="https://cdn-icons-png.flaticon.com/512/3545/3545435.png" className="button-icon"/>
            
            <button id="edit-button" onClick={() => setSelectedComponent('D')}>
                <img src="https://static.thenounproject.com/png/372615-200.png" alt="edit-icon" className="button-icon" />
                <span className="button-text">Edit Account</span>
            </button>
            

            {/* Main static components (pfp, account buttons)*/}
            <div id="profile-pic">
                <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="profile-picture"/>
            </div>

            <button id="account-button" onClick={() => setSelectedComponent('C')}> Account Details </button>
            <button id="avatar-button" onClick={() => setSelectedComponent('A')}> Update Your Avatar </button>
            <button id="favorite-recipes-button" onClick={() => setSelectedComponent('B')}> Favorite Recipes </button>

            {/* Dynamic page content (dependent on button press) */}
            <div id="account-component">
                {accountComponents[selectedComponent]}
            </div>
        </div>
    )
}

export default AccountPage;