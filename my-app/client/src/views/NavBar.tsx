import {useContext, useEffect, useState} from 'react';
import '../css/NavBar.css';
import { suggestTag } from '../constants/constants';
import {NavLink} from "react-router-dom";
import logo from "../assets/logo.svg";
import { AccountContext } from '../context/AccountContext';

export default function NavBar() {

    const {userInfo, setUserInfo} = useContext(AccountContext);
    const [isLogin, setIsLogin] = useState(false);

    //can change to token to determine if user is logged in or out
    useEffect(()=>{
      if(!userInfo.name){
        setIsLogin(false);
      } else{
        setIsLogin(true);
      };
    }, [userInfo])

    console.log(`is login: ${isLogin}`)

    /*
    const [isOpen, setIsOpen] = useState(false); //handle the hidden menu
    const handleOpen = () => {
      setIsOpen(!isOpen);
    };  
    const [isClicked, setIsClicked] = useState<string[]>([]);  
    const toggleClick = (clickedTag: string) => { {/* handle the tag filter, basically everything in labs/}

      if(isClicked.includes(clickedTag)){
        setIsClicked((prevClicked)=> (prevClicked.filter((f)=>f!==clickedTag)))
      } else{
        setIsClicked((prevClicked)=>[...prevClicked, clickedTag])
      };
    };
    */
    const toggleSignOutClick = () => { 
      setIsLogin(false);
      setUserInfo({name:"", email: ""})
    };
    
    return (
      <div className="d-flex" id="wholebar">  {/* code for side bar, top bar and right bar*/}
        <nav className="navbar navbar-expand border-bottom" id="navbar" data-testid = "topbar">  {/* create another 'hidden' navbar so that the + button always at the bottom right of the screen*/}
              {/*code for the top nav bar*/} 
            <div className='topbar-item'>  
              <ul>
                <li><NavLink to="/"><img src={logo} className='logo' style={{width:'30px'}}/></NavLink></li>
                <li className={isLogin ? 'visible': 'hidden'}><NavLink to="/create">Create</NavLink></li>
                <li className={isLogin ? 'visible': 'hidden'}><a className='Account' href="#">Account</a></li>
                <li className={isLogin ? 'visible': 'hidden'}><a className='Favorite' href="#">Favorite</a></li>
                <li className={isLogin ? 'visible': 'hidden'}><a className='Setting' href="#">Setting</a></li>
                <li> {isLogin? <button className='SignOut' onClick={toggleSignOutClick}>Sign Out</button> : <a className='SignIn' href="#">Sign In</a>} </li>
                
              </ul>
            </div>
        </nav>

        {/* <nav>
          <aside className="newPostButton">
            <NewPostButton />
          </aside>
        </nav> */}
      </div>
    
    );
  }