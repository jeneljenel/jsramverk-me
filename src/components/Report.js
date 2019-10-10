import React, { Component } from 'react'
import reports from '../data/reports.js';


class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rep: reports,
    };
  }

  callAPI() {
    let parent = this;
    let { match } = this.props;
    fetch("http://localhost:1337/reports/week/" + match.params.repWeek, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
        }
      })

      .then(res => {
        res.json().then(res => {
          // console.log("api res: "  , res);
          parent.setState({
            report: res
          })
        })
      })
  }

  UNSAFE_componentWillMount() {
    this.callAPI();
  }

  render () {
    const reports = this.state.rep;
    const { match } = this.props;
    const report = reports[match.params.repWeek];
    return (
      <div>
        <h1>{report.title}</h1>
        <p>{report.text}</p>
        <br />
        <br />
        <p><i>Bug! You have to click Reports to be able to fetch another report. </i></p>
      </div>
    )
  }
}


export default Report;