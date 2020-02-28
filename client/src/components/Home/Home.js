import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>Home</h1>
    }
    componentDidMount() {
        fetch('example/age')
          .then((response) => {
            return response.json();
          })
          .then((jsonResponse) => {
            console.log("Age:", jsonResponse.age);
          })
    }
}

export default Home