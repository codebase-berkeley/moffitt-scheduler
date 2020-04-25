import React from "react";
import "./PendingCoverage.css";

function processData(database) {
  const listItems = database.map((entry, index) => (
    <PendingCoverageItem
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
      items: [{}],
    };
  }

  render() {
    let library = this.props.loc;
    let libraryid;
    let locName = this.props.loc;
    if (library === "Moffitt3") {
      libraryid = "moffitt3CoverBox";
      locName = "Moffitt 3rd";
    } else if (library === "Moffitt4") {
      libraryid = "moffitt4CoverBox";
      locName = "Moffitt 4th";
    } else {
      libraryid = "doeCoverBox";
      locName = "Doe";
    }
    return (
      <div className="shift1">
        <div className="time_loc1">
          <div className="firstrow1">
            <div className={libraryid}>
              <p className="loc">{locName}</p>
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
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.setState({
          items: jsonResponse.items,
        });
        console.log(this.state.items);
      });
  }

  render() {
    return (
      <div className="all">
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
