import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'


import Auth from './Auth';
import ReportAdmin from './ReportAdmin';



import c_data from '../c_data.js'; //SET localhost: xxxx
// import reports from '../data/reports.js'; //used to test and handle data


class Report extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      apiResponse: [],
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
    // fetch("http://localhost:1337/reports/week/" + match.params.repWeek, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
        }
      })

      .then(res => {
        res.json().then(res => {
          // console.log("api res: "  , res);
          parent.setState({
            apiResponse: res
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
    const { apiResponse } = this.state;
    const { match } = this.props;


    // CATCH THE FIRST. WONT MAP EMPTY Value of 
    if (!apiResponse) {
      this.getReport();
    }
    
    const editLink = this.checkAuth();

    return (
      <div>
        <h1>{apiResponse.title}</h1>
        <p>{apiResponse.text}</p>
        <br />
        <br />
        {editLink}
        <p><i>Bug! You have to click Reports to be able to fetch another report. </i></p>
        <Switch>
          <Route path={`${match.path}/admin`} component={ReportAdmin} />
        </Switch>
      </div>
    )
  }
}


export default Report;