import React, { Component } from 'react';
import '../style/Form.css';
import '../style/Button.css';


class FormLogin extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            fields: {
                email: '',
                password: '',
            },
            errors: {},
            hidden: true,
        };

        this.state = this.initialState;
    };


    handleChange = (field, event) => {
        let fields = this.state.fields;
 
        fields[field] = event.target.value;
        this.setState({ fields });
        

    };

    handleValidation = () => {
        const {fields, errors} = this.state;
        let formIsValid = true;

        for (var value in fields) {
            let input = fields[value];

            if (!input) {
                console.log("något är tomt och det är " + value)
                formIsValid = false;
                errors[value] = "Cannot be empty";
            };
        };
                

        //email
        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            };
        };

        //password
        let psw = fields["password"];
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

    emptyErrors = (field) => {
        let errors = this.state.errors;
        errors[field] = '';

        this.setState({ errors });

    }

    //passes the form as user and clear the form
    onFormSubmit = (event) => {
        event.preventDefault()

        let formIsValid = this.handleValidation();
        let errors = this.state.errors;
        
        
        if (formIsValid) {
            alert("User is logged in.");
            this.props.handleSubmit(this.state.fields);
            this.setState(this.initialState);
        } else {
            errors["form"] = "Oops! Something went wrong."
            this.setState({ errors });
        }
    }

    render() {
        const { fields, errors } = this.state

        return (
            <form onSubmit={this.onFormSubmit}>
                <span className="field-error-form">{errors["form"]}</span>

                <fieldset>
                    <legend>Login</legend>
                    <label className="input-label" >Your email</label>
                    <br />
                    <input className="input"
                        type="email"
                        name="email"
                        value={fields["email"]}
                        onChange={this.handleChange.bind(this, "email")}
                        onClick={this.emptyErrors.bind(this, "email")}
                        noValidate />
                    <span className="field-error">{errors["email"]}</span>
                    <br />
                    <br />


                    <label className="input-label" >Password</label>
                    <br />
                    <input className="input"
                        type={this.state.hidden ? "password" : "text"}
                        name="password"
                        value={fields["password"]}
                        onChange={this.handleChange.bind(this, "password")}
                        onClick={this.emptyErrors.bind(this, "password")}
                        noValidate
                    />

                    <br />
                    <span className="field-error">{errors["password"]}</span>
                    <br />
                    <button type="Submit">OK </button>
                </fieldset>

                
            </form>


        )
    }
}

export default FormLogin


