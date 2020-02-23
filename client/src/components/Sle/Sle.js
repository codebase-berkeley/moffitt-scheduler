import React from 'react';
import "./Sle.css";
import "./Sidebar.css";
import "./Sidebar.jsx";
import Sidebar from "./Sidebar";



function Sle(props) {
    return (
    
    <div>
    
    <div class = "line">
    </div>
    
    <div class = "sidebar">
      <Sidebar
          title= "Your Shifts"/>
      <Sidebar
          title= "Open Shifts"/>
      <Sidebar
          title= "Availability"/>
    </div>

    <div class = "top-right">
      <div class="user-box">
      <div class="user-id">
      <div class="user-name"> Bianca Lee
      </div>
      <div class="dropdown-arrow"></div>
      <div class="dropdown-menu">
        <ul>
          <li>View Profile</li>
          <li>Log Out</li>
        </ul>
      </div>
    </div>
  </div>
  </div>

  <div class = "rectangle"> </div>

</div>

    
  );

}

export default Sle;