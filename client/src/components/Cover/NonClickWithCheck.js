import React from "react";
import "./WithCheck.css";
import check_fill from "./Images/check_fill.svg";
import check_nofill from "./Images/check_nofill.svg";
import deny_fill from "./Images/deny_fill.svg";
import deny_nofill from "./Images/deny_nofill.svg";

class NonClickWithCheck extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var approvalButton;
    var denialButton;
    if (this.props.approval === "Approved") {
      approvalButton = <img className="check_fill" src={check_fill} />;
      denialButton = <img className="deny_nofill" src={deny_nofill} />;
      console.log("approval ture");
      console.log("denial flase");
    } else {
      approvalButton = <img className="check_nofill" src={check_nofill} />;
      denialButton = <img className="deny_fill" src={deny_fill} />;
      console.log("approval tuasdfkjsdfre");
      console.log("denial flaasdjfhsdse");
    }
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
          {approvalButton}
          {denialButton}
        </div>
      </div>
    );
  }
}
export default NonClickWithCheck;
