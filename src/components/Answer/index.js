import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
//   constructor() {
//     super();
//     this.state = {
//       questionIndex: 0,
//     };
//   }

  answersQuestion = () => {
    const { question } = this.props;
    // const { questionIndex } = this.state;
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
      incorrects.map((element, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
        >
          {element}
        </button>
      )),
    ];
  }

  render() {
    const { question } = this.props;
    // const { questionIndex } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <h3 data-testid="question-text">{ question.question }</h3>
        { this.answersQuestion() }
      </div>
    );
  }
}

Answer.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Answer;
