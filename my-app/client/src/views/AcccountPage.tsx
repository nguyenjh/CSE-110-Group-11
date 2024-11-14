import React from "react";
import '../css/AccountPage.css';

function AccountPage() {

    return(
        <div id="account-page">
            {/* Floating buttons */}
            <input id="return-button" type="image" src="https://cdn-icons-png.flaticon.com/512/3545/3545435.png" className="button-icon"/>
            
            <button id="edit-button">
                <img src="https://static.thenounproject.com/png/372615-200.png" alt="edit-icon" className="button-icon" />
                <span className="button-text">Edit Account</span>
            </button>
            

            {/* Main static components (pfp, account buttons)*/}
            <div id="profile-pic">
                <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="profile-picture"/>
            </div>

            <button id="account-button"> Account </button>
            <button id="avatar-button"> Update Your Avatar </button>
            <button id="favorite-recipes-button" > Favorite Recipes </button>

            {/* Dynamic page content (dependent on button press) */}
            <div id="account-details">
                <div><p>Name: Christina</p></div>
                <div><p>Email: Christina2469@gmail.com</p></div>
                <div><p>Uploaded Recipes: 4</p></div>
                <div><p>Comments: 10</p></div>
                <div><p>Join Date: 02-24-2024</p></div>
            </div>
        </div>
    )
}

export default AccountPage;