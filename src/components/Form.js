import React, { Component } from 'react';
import '../style/Form.css';
import '../style/Button.css';

import Datepicker from './Datepicker';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            user: {
                name: '',
                email: '',
                birthday: '',
                password: '',
            },
            errors: {},
            hidden: true,
        };

        this.state = this.initialState;
        // this.showPassword = this.showPassword.bind(this);
    };


    handleChange = (value, event) => {
        let user = this.state.user;
        if (value === "birthday") {
            console.log(event);
            console.log(value);
            user[value] = event;
            this.setState({ user });

        } else {
            console.log(value);
            user[value] = event.target.value;
            this.setState({ user });
        }

    };

    handleValidation = () => {
        const {user, errors} = this.state;
        let formIsValid = true;

        for (var value in user) {
            let input = user[value];

            if (!input) {
                console.log("något är tomt och det är " + value)
                formIsValid = false;
                errors[value] = "Cannot be empty";
            };
        };
                

        //email
        if (typeof user["email"] !== "undefined") {
            let lastAtPos = user["email"].lastIndexOf('@');
            let lastDotPos = user["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && user["email"].indexOf('@@') === -1 && lastDotPos > 2 && (user["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            };
        };

        //password
        let psw = user["password"];
        if (!psw.match(/[a-z]/g) && !psw.match(
            /[A-Z]/g) && !psw.match(
                /[0-9]/g) && !psw.match(
                    /[^a-zA-Z\d]/g) && !psw.length >= 8) {
            formIsValid = false;
            errors["password"] = "Password is not valid";
        }
        
        
        this.setState({ errors: errors });
        return formIsValid;
    }

    emptyErrors = (value) => {
        let errors = this.state.errors;
        errors[value] = '';

        this.setState({ errors });

    }

    //passes the form as user and clear the form
    onFormSubmit = (event) => {
        event.preventDefault()

        let formIsValid = this.handleValidation();
        let errors = this.state.errors;
        
        
        if (formIsValid) {
            console.log(this.state.user);
            this.props.handleSubmit(this.state.user);
            this.setState(this.initialState);
        } else {
            errors["form"] = "Oops! Something went wrong."
            this.setState({ errors });
        }
    }

    render() {
        const { user, errors } = this.state

        return (
            <form onSubmit={this.onFormSubmit} id="register-form">
                <span className="field-error-form">{errors["form"]}</span>

                <fieldset>
                    <legend>Your info</legend>
                    <label className="input-label" >Name</label>
                    <br />
                    <input className="input"
                        type="text"
                        name="name"
                        value={user["name"]}
                        onChange={this.handleChange.bind(this, "name")}
                        onClick={this.emptyErrors.bind(this, "name")}
                        noValidate />
                    <span className="field-error">{errors["name"]}</span>
                    <br />
                    <br />


                    <label className="input-label">Email</label>
                    <br />
                    <input className="input"
                        type="email"
                        name="email"
                        value={user["email"]}
                        onChange={this.handleChange.bind(this, "email")}
                        onClick={this.emptyErrors.bind(this, "email")}
                        noValidate />
                    <span className="field-error">{errors["email"]}</span>
                </fieldset>
                <br />

                <fieldset>
                    <legend>Birthday</legend>
                    <Datepicker
                        handleChange={this.handleChange}
                        name="birthday"
                        value={user["birthday"]}
                        onClick={this.emptyErrors.bind(this, "birthday")}
                    />
                    <span className="field-error">{errors["birthday"]}</span>



                    </fieldset>
                    <br />
                    <fieldset>
                        <legend>Password</legend>
                        <p>We will send you an e-mail to confirm user. You will be asked to confirm with this password.</p>

                    <label className="input-label">Password</label>
                    <br />

                    <input className="input"
                        type={this.state.hidden ? "password" : "text"}
                        name="password"
                        value={user["password"]}
                        onChange={this.handleChange.bind(this, "password")}
                        onClick={this.emptyErrors.bind(this, "password")}
                        noValidate
                    />
                    <div className="field-psw-info">1 uppercase char, 1 lowercase char, 1 digit, 1 special char, min 8 char
                    </div>

                    <br />
                    <span className="field-error">{errors["password"]}</span>
                    <br />
                    <button type="Submit" id="submit-form">OK </button>
                </fieldset>

                
            </form>


        )
    }
}

export default Form
