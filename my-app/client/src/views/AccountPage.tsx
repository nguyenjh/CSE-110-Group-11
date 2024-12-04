import React, { useState } from "react";
import '../css/AccountPage.css';
import AccountDetails from "../components/Account Page/AccountDetails";

function AccountPage() {

    return(
        <div id="account-page">
            {/* Floating buttons */}
            <input id="return-button" type="image" src="https://cdn-icons-png.flaticon.com/512/3545/3545435.png" className="button-icon"/>
            
            {/* Main static components (pfp, account buttons)*/}
            <div id="profile-pic">
                <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="profile-picture"/>
            </div>

            <button id="account-button"> Account Details </button>

            {/* Dynamic page content (dependent on button press) */}
            <div id="account-component">
                <AccountDetails />
            </div>
        </div>
    )
}

export default AccountPage;