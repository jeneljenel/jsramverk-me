import React, { Component } from 'react';


import Auth from './Auth';
import '../style/Form.css';
import c_data from '../c_data.js'; //SET localhost: xxxx


class ReportAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            errors: '',
            report: this.props.report
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);

        this.Auth = new Auth();
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const port = c_data['port'];
        let token = this.state.token;

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
        };

        let title = data.get('title');
        let text = data.get('text');


        fetch('http://localhost:' + port + '/reports', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                title: title,
                text: text
            })
        })
            .then((res) => {
                if (res.status === 201) {
                    console.log("added")
                    // this.props.history.push('/reports'); //back to home -- have to write a props
                    window.location = ('/reports')
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ errors: 'Something went wrong. Try agaian' });
            })

    }

    //Do at load
    //Check auth
    UNSAFE_componentWillMount() {
        if (!this.Auth.loggedIn()) {
            // this.props.history.replace('/login')
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

    render() {
        const { errors } = this.state;
        // const { report } = this.props;

        console.log(this.props);
        console.log(this.state);

        return (
            <div>
                <h1>Administrate reports </h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <span className="field-error-form">{errors["form"]}</span>
                    <span className="field-error">{errors}</span>

                        <label className="input-label">Title</label>
                        <br />
                        <input className="input"
                            type="text"
                            name="title" />
                        <br />
                        <br />

                        <textarea className="input-textarea"
                            type="text"
                            name="text" 
                            />
                        <br />
                        <br />
                        <button type="Submit">OK </button>
                </form>
               
            </div>
        )
    }

}
export default ReportAdmin

