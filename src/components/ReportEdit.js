import React, { Component } from 'react';
import Auth from './Auth';

import c_data from '../c_data.js'; //SET localhost: xxxx

class Report extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            report: [],
            user: '',
            token: '',
            errors: ''
        };

        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new Auth();
    }

    handleSubmit(event) {
        event.preventDefault();
        const port = c_data['port'];
        let token = this.state.token;

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        };

        let title = this.state.report.title;
        let text = this.state.report.text;
        let id = this.state.report.id;


        fetch('http://localhost:' + port + '/reports/edit', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                title: title,
                text: text,
                id: id
            })
        })
            .then((res) => {
                console.log(res)
                if (res.status === 201) {
                    console.log("report succesfully edit")
                    // this.props.history.push('/reports'); //back to home -- have to write a props
                    window.location = (`/reports/week/${id}`)
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ errors: 'Something went wrong. Try agaian' });
            })
    


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
                    parent.setState({
                        report: res
                    })
                })
            })
    }

    UNSAFE_componentWillMount() {
        //Fetch report
        this.getReport();
        //Check auth
        this.checkAuth();

    }

    //If logged in, show edit
    checkAuth() {
        if (!this.Auth.loggedIn()) {
            window.location = "/login";
        }
        else {
            try {
                const profile = this.Auth.getProfile();
                const token = this.Auth.getToken();
                this.setState({
                    user: profile,
                    token: token
                })
            }
            catch (err) {
                this.Auth.logout()
                this.props.history.replace('/login')
            }
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        
        let report = this.state.report;
        report[name] = value

        this.setState({
            report
        });
    
    };

    render() {
        const { report, errors} = this.state;


        // CATCH THE FIRST. WONT MAP EMPTY Value of 
        if (!report) {
            this.getReport();
        }

        console.log(report);

        return (
            <div>
                <h1>Edit reports </h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <span className="field-error-form">{errors["form"]}</span>
                    <span className="field-error">{errors}</span>

                    <label className="input-label">Title</label>
                    <br />
                    <input className="input"
                        type="text"
                        name="title" 
                        value={report.title}
                        onChange={this.handleChange}/>
                    <br />
                    <br />

                    <textarea className="input-textarea"
                        type="text"
                        name="text"
                        value={report.text}
                        onChange={this.handleChange}
                    />
                    <input className="input-hidden"
                        name="id"
                        value={report.id}
                    />
                    <br />
                    <br />
                    <button type="Submit">OK </button>
                </form>

            </div>
        )
    }
}


export default Report;