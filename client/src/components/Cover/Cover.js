import React from "react";
import PendingCov from "./PendingCov";
import "./Cover.css";

const database = [
  {
    desk: "Front Desk",
    loc: "Moffitt",
    date: "Wednesday, March 6, 2020",
    time: "3:00 PM - 5:00 PM",
    needname: "Broco Lee",
    message: "Going home for the weekend"
  },
  {
    desk: "Front Desk",
    loc: "Moffitt",
    date: "Wednesday, March 6, 2020",
    time: "3:00 PM - 5:00 PM",
    needname: "Broco Lee",
    message: "Going home for the weekend"
  }
];
function processData(database) {
  const listItems = database.map((entry, index) => (
    <PendingCov
      desk={entry.desk}
      loc={entry.loc}
      date={entry.date}
      time={entry.time}
      needname={entry.needname}
      message={entry.message}
    />
  ));
  return listItems;
}

class Cover extends React.Component {
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
          message: "Going home for the weekend"
        }
      ]
    };
  }

  render() {
    return (
      <div className="all">
        <div className="topWordssss">
          <h1 className="tspecial">Pending Coverage</h1>
          <h1 className="tsame">
            <a href="/cover/pendingsupervisor">Pending Supervisor Approval</a>
          </h1>
          <h1 className="tsame">
            <a href="/cover/requesthistory">Request History</a>
          </h1>
        </div>
        <div className="middleWordssss">
          <h2 className="msame01">Time and Location</h2>
          <h2 className="msame00">Needing Coverage</h2>
          <h2 className="msame02">Notes</h2>
          <h2 className="msame03"></h2>
        </div>
        {processData(this.state.items)}
      </div>
    );
  }
}
export default Cover;
