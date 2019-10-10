import React, { Component } from 'react';

import c_data from "../c_data.js";
import '../style/Form.css';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            token: '',
            error: '',
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    onSubmit = (event) => {
        let port = c_data['port'];
    
        event.preventDefault();

        fetch("http://localhost:" + port + "/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((res) => {
            if (res.status === 200) {
                console.log("success")
                this.props.history.push('/'); //back to home

            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            this.setState({ error: 'Error logging in please try again'});
        });
    }
    render() {
        const error = this.state.error;

        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <h1>Login Below!</h1>
                    <p><span className="field-error-form">{error}</span></p>
                    <legend>E-mail</legend>
                    <input className="input"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required
                    />
                    <br />
                    <br />


                    <legend>Password</legend>
                    <input className="input"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
                    />
                    <br />
                    <br />

                    <button type="Submit"> LOGIN </button>
                    {/* <input type="Submit" value="Submit" /> */}
                </form>
            </div>
            
        );
    }
}

export default Login;