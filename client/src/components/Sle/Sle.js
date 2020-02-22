import React from 'react';
import "./Sle.css";
import "./Sidebar.css";
import "./Sidebar.jsx";
import Sidebar from "./Sidebar";



function Sle(props) {
    return (
    
    <div>
    
    <div class = "profile">
      
      {/* <div class = "circle"></div>
        <div id="circle"></div> */}
      </div>

      <div class = "name">
        <p>&nbsp;&nbsp;Bianca Lee &nbsp;&nbsp; <i class="arrow"></i></p>

    </div>

    <div class = "sidebar">
      <Sidebar
          title= "Your Shifts"/>
      <Sidebar
          title= "Open Shifts"/>
      <Sidebar
          title= "Availability"/>
    </div>

    <div class = "rectangle"> </div>

    <div class="user-box">
  <div class="user-id">
    <img class="user-picture" src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/c34.34.432.432/s160x160/575695_10101114843671310_1323509961_n.jpg"/>
    <div class="user-name">
      DU7S
    </div>
    <div class="dropdown-arrow"></div>
    <div class="dropdown-menu">
      <ul>
        <li>Settings</li>
        <li>Sports</li>
        <li>Log Out</li>
      </ul>
    </div>
  </div>
</div>

    </div>

    
  );

}

export default Sle;