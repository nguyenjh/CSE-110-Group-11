import {useContext, useEffect, useState} from 'react';
import '../css/NavBar.css';
import {NavLink} from "react-router-dom";
import logo from "../assets/logo.svg";
import { AccountContext } from '../context/AccountContext';

export default function NavBar() {

    const {userInfo, setUserInfo} = useContext(AccountContext);
    const [isLogin, setIsLogin] = useState(false);

    //can change to token to determine if user is logged in or out
    // useEffect(()=>{
    //   if(!userInfo.name){
    //     setIsLogin(false);
    //   } else{
    //     setIsLogin(true);
    //   };
    // }, [userInfo])

    useEffect(() => {
      if (!userInfo || !userInfo.name) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    }, [userInfo]);

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

      setUserInfo({name:"", email: ""});
      localStorage.removeItem('user'); // Clear user data
      localStorage.removeItem('setupTime'); // Clear any other stored items
      // window.location.href = '/'; // Redirect to home page

    };
    
    return (
      <div className="d-flex" id="wholebar">  {/* code for side bar, top bar and right bar*/}
        <nav className="navbar navbar-expand border-bottom" id="navbar" data-testid = "topbar">  {/* create another 'hidden' navbar so that the + button always at the bottom right of the screen*/}
              {/*code for the top nav bar*/} 
            <div className='topbar-item'>  
              <ul>
                <li><NavLink to="/"><img src={logo} className='logo' style={{width:'30px'}}/></NavLink></li>
                <li className={isLogin ? 'visible': 'hidden'}><NavLink to="/create">Create</NavLink></li>

                <li className={isLogin ? 'visible': 'hidden'}><NavLink to="/account">Account</NavLink></li>

                <li className={isLogin ? 'visible': 'hidden'}><NavLink to="/favorite">Favorite</NavLink></li>
                <li> {isLogin? <NavLink to="/" onClick={toggleSignOutClick}>Sign Out</NavLink> : <NavLink to="/login">Log In</NavLink>} </li>
                
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