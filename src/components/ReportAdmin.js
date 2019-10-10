import React, { Component } from 'react';

import '../style/Form.css';
import c_data from '../c_data.js'; //SET localhost: xxxx


class ReportAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const port = c_data['port'];

        fetch('http://localhost' + port + '/reports', {
            method: 'POST',
            // body: data,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (res.status === 201) {
                console.log("added")
                this.props.history.push('/reports'); //back to home
            } else {
                console.log("error")
            }
        })
    }

    render() {
        const {fields, errors} = this.state;
        let formIsValid = true;

        return (
            <div>
                <h1>Add report </h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <span className="field-error-form">{errors["form"]}</span>
                        <label className="input-label">Title</label>
                        <br />
                        <input className="input"
                            type="text"
                            name="title"/>
                        <span className="field-error">{errors["title"]}</span>
                        <br />
                        <br />

                        <textarea className="input-textarea"
                            type="text"
                            name="text" 
                            />
                        <span className="field-error">{errors["text"]}</span>
                        <br />
                        <br />
                        <button type="Submit">OK </button>
                </form>
               
            </div>
        )
    }

}
export default ReportAdmin

