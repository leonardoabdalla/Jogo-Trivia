import React from 'react';
import { fetchToken } from '../../services/Api';
import Header from '../Header';

class Game extends React.Component {
  componentDidMount = async () => {
    const apei = await fetchToken();
    console.log(apei);
  }

  render() {
    return (
<<<<<<< HEAD
      <h1>TRIVIA</h1>
=======

      <div>
        <h1>TRIVIA</h1>
        <Header />
      </div>
>>>>>>> refs/remotes/origin/requisito/3
    );
  }
}

export default Game;
