import React, { useState } from 'react';
import SignUp from './Signup';


function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <header>
        <button onClick={toggleSidebar}>OpenSidebar</button>
      </header>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Message displayed when the sidebar is open */}
        {isSidebarOpen && <div>Coin Mate, Welcome!</div>}
        {/* <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul> */}
        <SignUp/>
        
      </div>          
      <div className="content">
        <h1>Welcome</h1>
        <p>This is the main content of the page.</p>
      </div>
      
    </div>
  );
}

export default SideBar;
