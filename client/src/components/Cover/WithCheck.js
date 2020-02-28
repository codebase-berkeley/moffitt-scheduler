import React from "react";
import "./WithCheck.css";
import check_nofill from "../check_nofill.svg";
import deny_nofill from "../deny_nofill.svg";

class WithCheck extends React.Component {
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
      <div className="shift">
        <div className="time_loc">
          <div className="firstrow">
            <div className="bold_desk">
              <p className="desk">{this.props.desk}</p>
            </div>
            <div className="colorful_box">
              <p className="loc">{this.props.loc}</p>
            </div>
          </div>
          <p className="date">{this.props.date}</p>
          <p className="time">{this.props.time}</p>
        </div>
        <div className="need_cov">
          <p className="needname">{this.props.needname}</p>
        </div>
        <div className="covering">
          <p className="covername">{this.props.covername}</p>
        </div>
        <div className="approval">
          <button className="checkbutton" onClick={this.approvalClick}>
            <img className="check" src={check_nofill} alt="check" />
          </button>
          <button className="denybutton" onClick={this.denialClick}>
            <img className="deny" src={deny_nofill} alt="deny" />
          </button>
        </div>
      </div>
    );
  }

  approvalClick(e) {
    console.log("In click function");
    fetch("/pendingsupervisor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ approve: true })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
      });
  }

  denialClick(e) {
    console.log("In click function");
    fetch("/pendingsupervisor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ approve: false })
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
      });
  }
}
export default WithCheck;
