import React from "react";
import "./PendingCov.css";

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

class PendingCov extends React.Component {
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
  // export default class PendingCov(props) {
  //   return (
  //     <div className="shift1">
  //       <div className="time_loc1">
  //         <div className="firstrow1">
  //           <div className="bold_desk1">
  //             <p className="desk">{props.desk}</p>
  //           </div>
  //           <div className="colorful_box1">
  //             <p className="loc">{props.loc}</p>
  //           </div>
  //         </div>
  //         <p className="date1">{props.date}</p>
  //         <p className="time">{props.time}</p>
  //       </div>
  //       <div className="need_cov1">
  //         <p className="needname">{props.needname}</p>
  //       </div>
  //       <div className="notes1">
  //         <p className="message">{props.message}</p>
  //       </div>
  //     </div>
  //   );
  // };

  // loginClick(e) {
  //   console.log("In click function");
  //   var approve = document.getElementById("approve");
  //   var deny = document.getElementById("deny");
  //   fetch("/login", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ approve: approve, deny: deny })
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(jsonResponse => {
  //       console.log(jsonResponse);
  //     });
}
export default PendingCov;
