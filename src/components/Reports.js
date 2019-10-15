import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Report from './Report';
import Login from './Login';
import ReportAdmin from './ReportAdmin';
import Auth from './Auth';

import c_data from '../c_data.js'; //SET localhost: xxxx
// import dataReports from '../data/reports.js'; // Used on dev mode on local computer. 

import '../style/Form.css';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      apiResponse: [],
      error: "",
      admin: false,
    };

    this.state = this.initialState;
    this.Auth = new Auth();
  }


  getReports() {
      let parent = this;
      let port = c_data['port'];
      fetch("http://localhost:" + port + "/reports")
          .then(res => {
            res.json().then(res => {
            // console.log("api res: "  , res);
              parent.setState({
                apiResponse: res
                })
              })
            })
      .catch(error => this.setState({ error, isLoading: false }));
    }

  //DO wen render the page - get the reports
  UNSAFE_componentWillMount() {
      this.getReports();
  }

  checkAuth() {
    const { match } = this.props;
      if (this.Auth.loggedIn()) {
        console.log("du är inloggad!")
        return (
            <li>
              <Link to={`${match.url}/admin`}>Admin</Link>
            </li>
        );
      }
  }

  render() {
    const { match } = this.props;
    const { apiResponse} = this.state;
    

    // CATCH THE FIRST. WONT MAP EMPTY Value of 
    if (!apiResponse) {
      this.getReports();
    }

    const apiLink = apiResponse.map((row, index) => {
      return (
        <li key={index}>
          <Link to={`${match.url}/week/${row.id}`}> {row.title}</Link>
        </li>
      )
    })

    const adminLink = this.checkAuth();

    
    return (
      <div className="container">
        <h1>Reports</h1>
        <ul className="menu">
          {apiLink}
          {adminLink}
          {/* <li>
            <Link to={`${match.url}/admin`}>Admin</Link>
          </li> */}

        </ul>
        <Switch>
          <Route path={`${match.path}/admin`} component={ReportAdmin} />
          <Route path={"/login"} component={Login} />

          <Route path={`${match.path}/week/:id`} component={Report} />
        </Switch>
        
        </div>
    )
  }

}
export default Reports

