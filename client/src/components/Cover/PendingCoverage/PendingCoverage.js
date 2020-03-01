import React from "react";
import "./PendingCoverage.css";

function processData(database) {
  const listItems = database.map((entry, index) => (
    <PendingCoverageItem
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

class PendingCoverageItem extends React.Component {
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
      <div className="shift1">
        <div className="time_loc1">
          <div className="firstrow1">
            <div className="bold_desk1">
              <p className="desk">{this.props.desk}</p>
            </div>
            <div className="colorful_box1">
              <p className="loc">{this.props.loc}</p>
            </div>
          </div>
          <p className="date1">{this.props.date}</p>
          <p className="time">{this.props.time}</p>
        </div>
        <div className="need_cov1">
          <p className="needname">{this.props.needname}</p>
        </div>
        <div className="notes1">
          <p className="message">{this.props.message}</p>
        </div>
      </div>
    );
  }
}
class PendingCoverage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    fetch("/pendingcoverage", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        this.setState({
          items: jsonResponse.items
        });
        console.log(this.state.items);
      });
  }

  render() {
    return (
      <div className="all">
        <div className="topWordssss">
          <h1 className="tspecial">Pending Coverage</h1>
          <h1 className="tsame">
            <a href="/pendingsupervisor">Pending Supervisor Approval</a>
          </h1>
          <h1 className="tsame">
            <a href="/requesthistory">Request History</a>
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
export default PendingCoverage;
