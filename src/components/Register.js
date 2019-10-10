import React, { Component } from 'react';

import '../style/Form.css';

import Form from './Form';
// import users from '../data/users';

import c_data from '../c_data.js';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };

    }


    // handle submit
    handleSubmit = user => {
        let port = c_data['port'];

        this.setState({ user: [...this.state.user, user] });

        console.log(this.state.user)

        fetch('http://localhost:' + port + '/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((result) => result.json())
            .then((info) => { console.log(info); }) //201 sucess if success
            .catch(error => this.setState({ error, msg: "something error" }));


        window.location = '/signup';
        
    }

    render() {
        const { user } = this.state;

        console.log(this.state.user);
        return (
            <div className="container">
                <h1>Register new user </h1>
                <p>To be able to add reports.</p>
                <Form handleSubmit={this.handleSubmit} user={user}/>
                <p>
                    OBS! Beta. Nothing works.
                </p>
            </div>
        )
    }

}
export default Register

