import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Header';

const goodAssertion = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
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
            data-testid="btn-play-again"
            type="button"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: Proptypes.number.isRequired,
  score: Proptypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
