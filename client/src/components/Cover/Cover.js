import React from "react";
import PendingCov from "./PendingCov";
import "./Cover.css";

const database = [
  {
    desk:"Front Desk", 
    loc:"Moffitt", 
    date:"Wednesday, March 6, 2020", 
    time: "3:00 PM - 5:00 PM",
    needname: "Broco Lee",
    message: "Going home for the weekend",
  },
  {
    desk:"Front Desk", 
    loc:"Moffitt", 
    date:"Wednesday, March 6, 2020", 
    time: "3:00 PM - 5:00 PM",
    needname: "Broco Lee",
    message: "Going home for the weekend",
  }
]
function processData(database) {
  const listItems = database.map((entry, index) =>
    <PendingCov
      desk={entry.desk}
      loc={entry.loc}
      date={entry.date}
      time={entry.time}
      needname={entry.needname}
      message={entry.message}
    />
  );
  return listItems;
}

export default function Cover() {
  return (
    <div className="all">
      <div className="topWordssss">
        <h1 className="tspecial">Pending Coverage</h1>
        <h1 className="tsame">Pending Supervisor Approval</h1>
        <h1 className="tsame">Request History</h1>
      </div>
      <div className="middleWordssss">
        <h2 className="msame01">Time and Location</h2>
        <h2 className="msame00">Needing Coverage</h2>
        <h2 className="msame02">Notes</h2>
        <h2 className="msame03"></h2>
      </div>
      {processData(database)}
      {/* <PendingCov
        desk="Front Desk"
        loc="Moffitt"
        date="Wednesday, March 6, 2020"
        time="3:00 PM - 5:00 PM"
        needname="Broco Lee"
        message="Going home for the weekend"
      />
      <PendingCov
        desk="Front Desk"
        loc="Moffitt"
        date="Thursday, March 7, 2020"
        time="3:00 PM - 5:00 PM"
        needname="Ug Lee"
        message="Need extra sleep"
      />
      <PendingCov
        desk="Front Desk"
        loc="Moffitt"
        date="Friday, March 8, 2020"
        time="2:00 PM - 4:00 PM"
        needname="Fami Lee"
      /> */}
    </div>
  );
}

