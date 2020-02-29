import React from "react";
import "./WithCheck.css";
import check_fill from "../check_fill.svg";
import check_nofill from "../check_nofill.svg";
import deny_fill from "../deny_fill.svg";
import deny_nofill from "../deny_nofill.svg";

class NonClickWithCheck extends React.Component {
  constructor(props) {
    super(props);
    this.approved = false;
  }

  render() {
    var approvalButton;
    var denialButton;
    if (this.approved) {
      approvalButton = <img className="check" src={check_fill} />;
      denialButton = <img className="deny" src={deny_nofill} />;
      console.log("approval ture");
      console.log("denial flase");
    } else {
      approvalButton = <img className="check" src={check_nofill} />;
      denialButton = <img className="check" src={deny_fill} />;
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
          <button className="checkbutton1">{approvalButton}</button>
          <button className="denybutton1">{denialButton}</button>
        </div>
      </div>
    );
  }
}
export default NonClickWithCheck;
