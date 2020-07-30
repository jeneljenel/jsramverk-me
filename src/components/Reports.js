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
    this.getReports = this.getReports.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.Auth = new Auth();
  }


  getReports() {
    let parent = this;
    let port = c_data['port'];
    let url = 'http://localhost:' + port + '/reports';
    // let api = c_data['me-api'];
    // let path = '/reports';
    // let url = api + path;
    // console.log(url)

    const headers = {
      'Content-type': 'application/json',
    }

    fetch(url, {
      headers: headers
    })
      .then(response => {
        response.json().then(res => {
        console.log("api res.reports: "  , res.data);
          parent.setState({
            apiResponse: res.data
            });
          });
        })
      .catch(error => this.setState({ error, isLoading: false }));
   }

  //DO wen render the page - get the reports
  UNSAFE_componentWillMount() {
    this.setState(this.initialState);
    this.getReports();
  }

  checkAuth() {
    const { match } = this.props;
      if (this.Auth.loggedIn()) {
        return (
            <>
            <li>
              <Link to={`${match.url}/admin`}>ADD NEW</Link>
            </li>
            <li>
              <Link onClick={this.handleLogout}>Logout</Link>
            </li>
            </>
        );
      }
  }

  handleLogout() {
    this.Auth.logout();
    this.props.history.replace('/login')

  }

  render() {
    const { match } = this.props;
    const { apiResponse} = this.state;
    // CATCH THE FIRST. WONT MAP EMPTY Value of 
    if (!apiResponse) {
      console.log("fetching reports");
      this.getReports();
    }
    console.log(typeof apiResponse['reports']);
    // const apiLink = for (const [row, index] of apiResponse['reports'] ){
    //   return (
    //     <li key={index}>
    //       <Link to={`${match.url}/week/${row.id}`}> {row.title}</Link>
    //     </li>
    //   )
    // })

    const apiLink = "something wrong with the api...";

    const adminLink = this.checkAuth();

    
    return (
      <div className="container">
        <h1>Reports</h1>
        <ul className="menu">
          {apiLink}
          {adminLink}

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

