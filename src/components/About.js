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
    // let port = c_data['port']
    // let url = 'http://localhost:' + port;
    let api = c_data['me-api'];
    let path = '/';
    let url = api + path;
    console.log(url)

    const headers = {
      'Content-type': 'application/json',
    }

    fetch(url, {
      headers: headers
    })
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

    if (!about) {
      this.callAPI();
    }

    return (
        <div className="container">
          <h1>{about.title}</h1>
          <p>{about.text}</p>

        </div>
    )
  }
}
export default Hello
