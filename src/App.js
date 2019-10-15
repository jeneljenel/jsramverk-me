import React, { Component } from 'react';
import './App.css';

// import AuthService from './components/AuthService';
// import withAuth from './components/withAuth';
// const Auth = new AuthService();


class App extends Component {
  // handleLogout() {
  //   Auth.logout()
  //   this.props.history.replace('/login');
  //   // window.location = '/login';

  // }

  render () {
    return (
      <div>"Något här sen kanske"</div>
      // <div className="App">
      //   <div className="App-header">
      //     <h2>Welcome {this.props.user.username}</h2>
      //   </div>
      //   <p className="App-intro">
      //     <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
      //   </p>
      // </div>
    );
  }

}

export default App;
// export default withAuth(App);

