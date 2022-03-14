import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
  answersQuestion = () => {
    const { question } = this.props;
    const correct = question.correct_answer;
    const incorrects = question.incorrect_answers;

    return [
      <button
        type="button"
        data-testid="correct-answer"
        id="correct-answer"
        key="correct-answer"
      >
        {correct}
      </button>,
      incorrects.map((answer, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
        >
          {answer}
        </button>

      )),
    ];
  }

  render() {
    const { question } = this.props;
    return (
      <>
        <div>
          <div data-testid="answer-options" />
          <h2 data-testid="question-category">{question.category}</h2>
          <h3 data-testid="question-text">{question.question}</h3>
          {this.answersQuestion()}
          <div data-testid="answer-options" />
        </div>
        <br />
        <button type="button" disabled>Próxima Pergunta</button>

      </>
    );
  }
}

Answer.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Answer;
