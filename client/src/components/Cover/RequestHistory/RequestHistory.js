import React from "react";
import "./RequestHistory.css";
import WithCheck from "../NonClickWithCheck";
import { Redirect } from "react-router-dom";

function processData(database) {
  const listItems = database.map((entry, index) => (
    <WithCheck
      desk={entry.desk}
      loc={entry.loc}
      date={entry.date}
      time={entry.time}
      needname={entry.needname}
      covername={entry.covername}
      approval={entry.approval}
    />
  ));
  return listItems;
}
class RequestHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], redirect: null };
  }

  componentDidMount() {
    fetch("/api/requesthistory", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.items === null) {
          this.setState({ redirect: <Redirect push to="/login" /> });
          return;
        }
        this.setState({
          items: jsonResponse.items
        });
        console.log(this.state.items);
      });
  }

  render() {
    return (
      <div>
        {this.state.redirect}
        <div className="middleWordsss">
          <h2 className="msame1">Time and Location</h2>
          <h2 className="msame">Needing Coverage</h2>
          <h2 className="msame15">Covered By</h2>
          <h2 className="msame2"></h2>
        </div>
        <div className="shiftHistory"></div>
        {processData(this.state.items)}
      </div>
    );
  }
}
export default RequestHistory;
