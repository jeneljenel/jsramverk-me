import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'


import Auth from './Auth';
import ReportEdit from './ReportEdit';



import c_data from '../c_data.js'; //SET localhost: xxxx
// import reports from '../data/reports.js'; //used to test and handle data


class Report extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      report: [],
      error: "",
    };

    this.state = this.initialState;
    this.Auth = new Auth();
  }

  getReport() {
    let parent = this;
    let { match } = this.props;
    let port = c_data['port'];

    fetch("http://localhost:" + port + "/reports/week/" + match.params.id, {
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
    //Fetch report
    this.getReport();

  }

  //If logged in, show edit
  checkAuth() {
    const { match } = this.props;

    if (this.Auth.loggedIn()) {
      console.log("du är inloggad!")
      return (
        <li>
          <Link to={`${match.url}/edit`}>Edit</Link>
        </li>
      );
    }
  }

  render () {
    const { report } = this.state;
    const { match } = this.props;


    // CATCH THE FIRST. WONT MAP EMPTY Value of 
    if (!report) {
      this.getReport();
    }
    
    const editLink = this.checkAuth();
    console.log(report);

    return (
      <div>
        <h1>{report.title}</h1>
        <p>{report.text}</p>
        <br />
        <br />
        {editLink}
        <p><i>Bug! You have to click Reports to be able to fetch another report. </i></p>
        <Switch>
          <Route path={`${match.path}/edit`} report={report} component={ReportEdit} />
        </Switch>
      </div>
    )
  }
}


export default Report;