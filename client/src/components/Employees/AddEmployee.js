// import React from "react";
// import Modal from "react-modal";

// export default class AddEmployee extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       modalOpen: true,
//     };
//     this.openModal = this.openModal.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//     this.submitClick = this.submitClick.bind(this);
//   }

//   openModal() {
//     this.setState({ modalOpen: true });
//   }

//   closeModal() {
//     this.setState({ modalOpen: false });
//   }

//   submitClick() {
//     var firstName = document.getElementById("firstName");
//     var firstNameText = firstName.value;
//     console.log(firstNameText);
//     var lastName = document.getElementById("lastName");
//     var lastNameText = lastName.value;
//     console.log(lastNameText);
//     var email = document.getElementById("email");
//     var emailText = email.value;
//     console.log(emailText);
//     fetch("http://localhost:8000/employees", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         firstName: firstNameText,
//         lastName: lastNameText,
//         email: emailText,
//       }),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((jsonResponse) => {
//         console.log(jsonResponse);
//       });
//     function cancelClick() {
//       console.log("doesNothingForNow");
//     }
//   }

//   render() {

//     console.log("RENDER THAT MODAL ASJDF");
//     return (

//     );
//   }
// }
