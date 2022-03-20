import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Header from '../Header';

import './style.css';

const goodAssertion = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <div className="feedback-section">

          <h1 data-testId="feedback-text">Feedback</h1>
          { assertions < goodAssertion
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>}
          <p data-testid="feedback-total-score">
            {score}
          </p>
          <p data-testid="feedback-total-question">
            {assertions}
          </p>
          <Link to="/">
            <button
              className="button-feedback"
              data-testid="btn-play-again"
              type="button"
            >
              Play Again
            </button>
          </Link>
          <Link to="/ranking">
            <button
              className="button-ranking"
              data-testid="btn-ranking"
              type="button"
            >
              Ranking
            </button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
