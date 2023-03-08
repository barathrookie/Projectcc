import React from "react";
// import { Outlet, Link} from "react-router-dom";
import "./navbar.css";

function AppNav() {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  
  return (
    <div>
     <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <a className="nav-logo">
            Blog-Lock
            <i className="fa fa-code"></i>
          </a>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
        
              <a
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                
                Home
              </a>
        
            </li>
            <li className="nav-item">
            
              <a
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Add Blog
              </a>
        
            </li>
            <li className="nav-item">
              
              <a
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                account
              </a>
            
            </li>
            
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
      
    </ div>
  );
}
export default AppNav;