import React, { Component } from 'react';

import '../style/Form.css';

import Form from './Form';
// import users from '../data/users';

import c_data from '../c_data.js';


class Register extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            newUser: [],
            error: "",
        };

        this.state = this.initialState;
    }


    handleSubmit = user => {
        let port = c_data['port'];
        let url = 'http://localhost:' + port + '/register'

        const headers = {
            'Content-type': 'application/json',
        }

        this.setState({ newUser: [...this.state.newUser, user] }, () => {
            console.log(this.state.newUser);
            JSON.stringify(this.state.newUser);
            console.log(this.state.newUser[0].name);

            fetch(url, {
                method: "POST",
                body: JSON.stringify(this.state.newUser[0]),
                headers: headers
            })
                .then((result) => {
                    console.log(result);
                    result.json()
                })
                .then((info) => { 
                    console.log(info); 

                    // window.location = '/login';
                    // alert("User succesfully registered!");
                }) //201 sucess if success
                .catch(error => this.setState({ error, msg: "something error" }));



        });

       
        
    }

    render() {
        const { user } = this.state;

        return (
            <div className="container">
                <h1>Register new user </h1>
                <p>To be able to add reports.</p>
                <Form handleSubmit={this.handleSubmit} user={user}/>
                <p>
                </p>
            </div>
        )
    }

}
export default Register

