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
        // let api = c_data['me-api']
        // let path = "/register";
        // let url = api + path;
        console.log(url);

        const headers = {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': url
        }


        this.setState({ newUser: [...this.state.newUser, user] }, () => {
            JSON.stringify(this.state.newUser);
            console.log(this.state.newUser[0]);
            let user = this.state.newUser[0];

            let name = user.name;
            let email = user.email;
            let birthday = user.birthday;
            let password = user.password;

            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    name: name,
                    email: email,
                    birthday: birthday,
                    password: password
                })
            })
                .then((res) => {
                    if (res.status === 201) {
                        console.log("user added")
                        this.props.history.replace('/login');

                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                    //res.json() //run json to be able to read the data
                })
                .catch((error) => {
                    // console.log(error);
                    this.setState({ error, msg: "something error" })
                });



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


//FUNKADE FÖRUT
// this.setState({ newUser: [...this.state.newUser, user] }, () => {
//     JSON.stringify(this.state.newUser);
//     fetch(url, {
//         method: "POST",
//         body: JSON.stringify(this.state.newUser[0]),
//         headers: headers
//     })
//         .then((result) => {
//             console.log(result);
//             result.json()
//         })
//         .then((info) => {
//             console.log(info);
//             if (info.status === 201) {
//                 console.log("you're registered")
//                 this.props.history.replace('/login');
//             }
//             // this.props.history.replace('/login');

//             // window.location = '/login';
//             alert("Your user was succefully added!");
//         }) //201 sucess if success
//         .catch(error => this.setState({ error, msg: "something error" }));



// });