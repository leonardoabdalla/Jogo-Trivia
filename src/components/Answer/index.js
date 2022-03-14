import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
  randomAnswers = () => {
    const { question } = this.props;
    const arrayAnswers = [question.correct_answer, ...question.incorrect_answers];
    const randomAnswers = arrayAnswers.sort(() => Math.random() - Number('0.5'));
    return randomAnswers;
  }

  render() {
    const { question } = this.props;

    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <h3 data-testid="question-text">{ question.question }</h3>
        <div data-testid="answer-options">
          { this.randomAnswers(question).map((answer, index) => (
            question.correct_answer === answer
              ? (
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  { answer }
                </button>)
              : (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                >
                  { answer }
                </button>)
          )) }
        </div>
      </div>
    );
  }
}
Answer.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Answer;
