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

      <div>
        <h1>TRIVIA</h1>
        <Header />
      </div>
    );
  }
}

export default Game;
