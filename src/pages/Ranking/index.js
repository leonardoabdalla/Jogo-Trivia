import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ranking2 = ranking.sort((a, b) => b.score - a.score || a.name - b.name);
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking2.map(({ name, score, pic }, index) => (
            <div key={ index }>
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
              <img
                src={ pic }
                alt={ `Foto do player ${index}` }
              />
            </div>
          ))
        }
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Play Again
          </button>
        </Link>
      </>
    );
  }
}

export default Ranking;
