import React from "react";
import WithCheck from "../WithCheck.js";
import "./PendingSupervisor.css";

function processData(database) {
  const listItems = database.map((entry, index) => (
    <WithCheck
      desk={entry.desk}
      loc={entry.loc}
      date={entry.date}
      time={entry.time}
      needname={entry.needname}
      covername={entry.covername}
    />
  ));
  return listItems;
}
class PendingSupervisor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          desk: "Front Desk",
          loc: "Moffitt",
          date: "Wednesday, March 6, 2020",
          time: "3:00 PM - 5:00 PM",
          needname: "Broco Lee",
          covername: "Ug Lee"
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <div className="topWords">
          <h1 className="tsame">
            <a href="/cover">Pending Coverage</a>
          </h1>
          <h1 className="tspecial">Pending Supervisor Approval</h1>
          <h1 className="tsame">
            <a href="/cover/requesthistory">Request History</a>
          </h1>
        </div>
        <div className="middleWords">
          <h2 className="msame11">Time and Location</h2>
          <h2 className="msame0">Needing Coverage</h2>
          <h2 className="msame0">Covered By</h2>
          <h2 className="msame22"></h2>
        </div>
        <div className="pendingShifts"></div>
        {processData(this.state.items)}
      </div>
    );
  }
  loginClick(e) {
    console.log("In click function");
    var approve = document.getElementById("approve");
    var deny = document.getElementById("deny");
    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ approve: approve, deny: deny })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
      });
  }
}
export default PendingSupervisor;
