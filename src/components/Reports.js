import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Report from './Report';
import ReportAdmin from './ReportAdmin';

import c_data from '../c_data.js'; //SET localhost: xxxx
// import dataReports from '../data/reports.js'; // Used on dev mode on local computer. 

import '../style/Form.css';


class Reports extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      isLoading: true,
      apiResponse: [],
      error: "",
    };

    this.state = this.initialState;
    this.UNSAFE_componentWillMount = this.UNSAFE_componentWillMount.bind(this);
  }


  callAPI() {
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

  UNSAFE_componentWillMount() {
      this.callAPI();
  }

  render() {
    const { match } = this.props;
    const { apiResponse} = this.state;

    // CATCH THE FIRST. WONT MAP EMPTY Value of 
    if (!apiResponse) {
      this.callApi();
    }

    const apiLink = apiResponse.map((row, index) => {
      return (
        <li key={index}>
          <Link to={`${match.url}/week/${index}`}> {row.title}</Link>
        </li>
      )
    })



    
    return (
      <div className="container">
        <h1>Reports</h1>
        <ul className="menu">
          {apiLink}
          <li>
            <Link to={`${match.url}/admin`}> Admin</Link>
          </li>
        </ul>
        <Switch>
          <Route path={`${match.path}/admin`} component={ReportAdmin} />
          <Route path={`${match.path}/week/:repWeek`} component={Report} />
        </Switch>
        
        </div>
    )
  }

}
export default Reports

