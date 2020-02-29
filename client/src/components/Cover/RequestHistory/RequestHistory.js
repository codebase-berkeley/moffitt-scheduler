import React from "react";
import "./RequestHistory.css";
import WithCheck from "../NonClickWithCheck";

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
class RequestHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    fetch("/requesthistory", {
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
      <div>
        <div className="topWordsss">
          <h1 className="tsame">
            <a href="/cover">Pending Coverage</a>
          </h1>
          <h1 className="tsame">
            <a href="/cover/pendingsupervisor">Pending Supervisor Approval</a>
          </h1>
          <h1 className="tspecial">Request History</h1>
        </div>
        <div className="middleWordsss">
          <h2 className="msame1">Time and Location</h2>
          <h2 className="msame">Needing Coverage</h2>
          <h2 className="msame">Covered By</h2>
          <h2 className="msame2"></h2>
        </div>
        <div className="shiftHistory"></div>
        {processData(this.state.items)}
      </div>
    );
  }
}
export default RequestHistory;
