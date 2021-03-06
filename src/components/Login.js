import React, { Component } from 'react';

import c_data from "../c_data.js";
import Auth from "./Auth";
import '../style/Form.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.Auth = new Auth();
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let port = c_data['port'];
        let url = "http://localhost:" + port + "/login";
        // let api = c_data['me-api'];
        // let path = '/login';
        // let url = api + path;
        console.log(url)

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': url
        };

        if (this.Auth.getToken()) {
            headers['Access-Control-Allow-Origin'] = url;
            headers['Authorization'] = 'Bearer ' + this.Auth.getToken();
        }

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((res) => {
                console.log(res);

                if (res.status === 200) {
                    console.log("success")
                    res.json().then((data) => {
                        let info = data.data;
                        // console.log("set local with: ", info.token);
                        this.Auth.setToken(info.token)
                        this.props.history.replace('/reports');
                    })
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch((err) => {
                console.error(err);
                this.setState({ error: 'Error logging in please try again' });
            })

        
    }


    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    UNSAFE_componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/reports');
    }

   
    render() {
        const error = this.state.error;

        return (
            <div className="container">
                <form onSubmit={this.handleFormSubmit}>
                    <h1>Login Below!</h1>
                    <p><span className="field-error-form">{error}</span></p>
                    <legend>E-mail</legend>
                    <input className="input"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={this.handleChange}
                        required
                    />
                    <br />
                    <br />


                    <legend>Password</legend>
                    <input className="input"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={this.handleChange}
                        required
                    />
                    <br />
                    <br />

                    <button type="Submit"> LOGIN </button>
                </form>
                <br />
            </div>
            
        );
    }



}

export default Login;

