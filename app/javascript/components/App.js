import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Alert } from '../helpers/notifications';
import Editor from './Editor';
import LogInForm from './LogInForm';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem('jwt');
    axios.post('/api/users/valid_token', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => this.setState({ isLoggedIn: true }));
  }

  render() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return (
        <div>
          <Route path="/events/:id?" component={Editor} />
          <Alert stack={{ limit: 3 }} />
        </div>
      );
    }

    return <LogInForm />;
  }
}

export default App;
