import React from "react";
import { Redirect } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
  }

  render() {
    return <h1>{this.state.redirect}Loading...</h1>;
  }
  componentDidMount() {
    fetch("/homepage")
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.user === null) {
          this.setState({ redirect: <Redirect push to="/login" /> });
        } else if (jsonResponse.user.is_sup) {
          this.setState({ redirect: <Redirect push to="/masterschedule" /> });
        } else {
          this.setState({ redirect: <Redirect push to="/yourshifts" /> });
        }
      });
  }
}

export default Home;
