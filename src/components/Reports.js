import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Report from './Report';
import ReportAdmin from './ReportAdmin';

import c_data from '../c_data.js'; //SET localhost: xxxx
import reports from '../data/reports.js';

import '../style/Form.css';


class Reports extends Component {
    constructor(props) {
        super(props);
          this.state = { 
              rep: reports,
              apiResponse: "",
              reports: "",
          };
    }


    callAPI() {
        let parent = this;
        let port = c_data['port'];
        console.log(port);
        fetch("http://localhost:" + port + "/reports")
            .then(res => {
              res.json().then(res => {
              // console.log("api res: "  , res);
                parent.setState({
                  reports: res
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
    const reports = this.state.rep;

    const repLink = reports.map((report, index) => {
      return (
        <li key={index}>
        <Link to={`${match.url}/week/${index}`}> {report.title}</Link>
        </li>
      )
    })
    
    return (
      <div className="container">
        <h1>Reports</h1>
        <ul className="menu">
          {repLink}
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

