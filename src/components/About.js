import React, { Component } from 'react'
import '../style/About.css'

import c_data from '../c_data.js'; //SET localhost: xxxx


class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    let parent = this;
    let port = c_data['port']
    fetch("http://localhost:" + port)
      .then(res => {
        res.json().then(res => {
          parent.setState({
            apiResponse: res.data
          })
        })
      })
  }

  UNSAFE_componentWillMount() {
    this.callAPI();
  }

  render() {
    const about = this.state.apiResponse;

    return (
        <div className="container">
          <h1>{about.title}</h1>
          <p>{about.text}</p>
          {/* <p>Gamla about >> </p>
          <About /> */}
        </div>
    )
  }
}
export default Hello
