import React from 'react';
import axios from 'axios';

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin() {
    const { email, password } = this.state;
    axios.post('/api/users/login', {
      email,
      password,
    })
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem('jwt', response.data.auth_token);
          location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('Not Authorized');
        }
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="flex-container">
        <div className="row">
          <h1>Please Login</h1>

          <form className="login-form" onSubmit={this.validateUser}>
            <input type="email" placeholder="Username" value={email} onChange={this.handleEmailChange} />
            <input type="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} />
            <button type="button" onClick={this.handleLogin}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogInForm;
