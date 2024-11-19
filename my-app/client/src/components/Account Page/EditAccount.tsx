import { useContext, useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import { UserInformation } from "../../types/types";


function EditAccount() {
    const { setUserInfo } = useContext(AccountContext)

    const [nameInput, setNameInput] = useState("") 
    const [emailInput, setEmailInput] = useState("") 

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const newUserInfo: UserInformation = {
          name: nameInput,
          email: emailInput,
        };
    
        // Exercise: Add add new expense to expenses context array
        setUserInfo(newUserInfo)
        
      };
    return (
        <div id="edit-account">
            <form onSubmit={(event) => onSubmit(event)}>
                <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Name"></input>
                <input type="text" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email"></input>
                <button type="submit"> Submit </button>
            </form>
        </div>
    )
}

export default EditAccount;