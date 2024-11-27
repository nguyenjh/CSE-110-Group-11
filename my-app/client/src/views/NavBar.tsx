import {useState} from 'react';
import '../css/NavBar.css';
import { suggestTag } from '../constants/constants';
import {NavLink} from "react-router-dom";
import logo from "../assets/logo.svg";

export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false); //handle the hidden menu
    const [isClicked, setIsClicked] = useState<string[]>([]);  

    const handleOpen = () => {
      setIsOpen(!isOpen);
    };  

    const toggleClick = (clickedTag: string) => { {/* handle the tag filter, basically everything in labs*/}

      if(isClicked.includes(clickedTag)){
        setIsClicked((prevClicked)=> (prevClicked.filter((f)=>f!==clickedTag)))
      } else{
        setIsClicked((prevClicked)=>[...prevClicked, clickedTag])
      };
      
      
    };
    
    
    return (
      <div className="d-flex" id="wholebar">  {/* code for side bar, top bar and right bar*/}
        <nav className="navbar navbar-expand border-bottom" id="topbar" data-testid = "topbar">  {/* create another 'hidden' navbar so that the + button always at the bottom right of the screen*/}
              {/*code for the top nav bar*/} 
            <div className='topbar-item'>  
              <ul>
                <li><NavLink to="/"><img src={logo} className='logo' style={{width:'30px'}}/></NavLink></li>
                <li><NavLink to="/create">Create</NavLink></li>
                <li><a className='Account' href="#">Account</a></li>
                <li><NavLink to="/favorite">Favorite</NavLink></li>
                <li><a className='Setting' href="#">Setting</a></li>
                <li><a className='SignOut' href="#">Sign Out</a></li>
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