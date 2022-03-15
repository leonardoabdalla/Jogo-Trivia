import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Answer.css';

class Answer extends Component {
  randomAnswers = () => {
    const { question } = this.props;
    const arrayAnswers = [question.correct_answer, ...question.incorrect_answers];
    const randomAnswers = arrayAnswers.sort(() => Math.random() - Number('0.5'));
    return randomAnswers;
  }

  changeColor = () => {
    const correta = document.getElementById('correct-answer');
    correta.className = 'correct-answer';
    const erradas = document.querySelectorAll('.wrong-answer');
    for (let i = 0; i < erradas.length; i += 1) {
      erradas[i].className = 'wrong';
    }
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
                  id="correct-answer"
                  onClick={ this.changeColor }
                >
                  { answer }
                </button>)
              : (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  className="wrong-answer"
                  onClick={ this.changeColor }
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
