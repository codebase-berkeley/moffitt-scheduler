import React from "react";
import WithCheck from "../WithCheck";
import "./PendingSupervisor.css";
import { Redirect } from "react-router-dom";

class PendingSupervisor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      redirect: null,
    };
    this.processData = this.processData.bind(this);
    this.removeFromState = this.removeFromState.bind(this);
  }
  componentDidMount() {
    fetch("/pendingsupervisor", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.items == null) {
          this.setState({ redirect: <Redirect push to="/login" /> });
          return;
        }
        this.setState({
          items: jsonResponse.items,
        });
      });
  }

  processData(database) {
    const listItems = database.map((entry, index) => {
      return (
        <WithCheck
          desk={entry.desk}
          loc={entry.loc}
          date={entry.date}
          time={entry.time}
          needname={entry.needname}
          covername={entry.covername}
          approval={entry.approval}
          requestId={entry.requestId}
          fixState={this.removeFromState}
        />
      );
    });
    return listItems;
  }

  removeFromState(requestIndex) {
    var newItems = [];
    for (var i = 0; i < this.state.items.length; i++) {
      if (requestIndex !== this.state.items[i].requestId) {
        newItems.push(this.state.items[i]);
      }
    }
    this.setState({ items: newItems });
  }

  render() {
    return (
      <div>
        {this.state.redirect}
        <div className="middleWords">
          <h2 className="msame11">Time and Location</h2>
          <h2 className="msame0">Needing Coverage</h2>
          <h2 className="msame08">Covered By</h2>
          <h2 className="msame22"></h2>
        </div>
        <div className="pendingShifts"></div>
        {this.processData(this.state.items)}
        <div class="Supervisor"></div>
      </div>
    );
  }
}

export default PendingSupervisor;
