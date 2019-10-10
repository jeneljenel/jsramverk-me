import React from 'react'
import ReactDOM from 'react-dom'
import {
    Route,
    Link,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'


import About from './components/About';
import Reports from './components/Reports';

import Register from './components/Register';
import Login from './components/Login';

import Notfound from './notfound';

import './index.css';

const routing = (
    <Router>
        <div>
            <ul className="menu">
                <li>
                    <Link to="/">About</Link>
                </li>
                <li>
                    <Link to="/reports">Reports</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
            <Switch>
                <Route exact path="/" component={About} />
                <Route path="/reports" component={Reports} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />




                <Route component={Notfound} />
            </Switch>
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'))
