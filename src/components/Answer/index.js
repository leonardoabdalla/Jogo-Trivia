import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Answer.css';

class Answer extends Component {
  constructor() {
    super();
    this.state = {
      randomQuestion: [],
    };
  }

  componentDidMount() {
    const { question } = this.props;
    this.setState({ randomQuestion: this.randomAnswers(question) });
  }

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
    const { counter } = this.props;
    console.log(counter);
  }

  render() {
    const { question, button } = this.props;
    const { randomQuestion } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <h3 data-testid="question-text">{ question.question }</h3>
        <div data-testid="answer-options">
          {randomQuestion.map((answer, index) => (
            question.correct_answer === answer
              ? (
                <button
                  type="button"
                  data-testid="correct-answer"
                  id="correct-answer"
                  onClick={ this.changeColor }
                  disabled={ button }
                >
                  { answer }
                </button>
              )
              : (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  className="wrong-answer"
                  onClick={ this.changeColor }
                  disabled={ button }
                >
                  { answer }
                </button>
              )
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  counter: state.counter,
  button: state.button.disableButton,
});

Answer.propTypes = {
  question: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  button: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Answer);
