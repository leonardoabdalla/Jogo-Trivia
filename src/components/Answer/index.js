import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScore } from '../../redux/actions';

import './Answer.css';
import Timer from '../Timer';

const difficulties = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class Answer extends Component {
  constructor() {
    super();
    this.state = {
      randomQuestion: [],
      isDisable: true,
    };
  }

  componentDidMount() {
    const { question } = this.props;
    this.setState({ randomQuestion: this.randomAnswers(question) });
  }

  randomAnswers = (question) => {
    // const { question } = this.props;
    const arrayAnswers = [question.correct_answer, ...question.incorrect_answers];
    const randomAnswers = arrayAnswers.sort(() => Math.random() - Number('0.5'));
    return randomAnswers;
  }

  handleNextButton = () => {
    const { handleQuestion } = this.props;
    handleQuestion();
  }

  changeColor = (answer) => {
    const correta = document.getElementById('correct-answer');
    correta.className = 'correct';
    const erradas = document.querySelectorAll('.wrong-answer');
    for (let i = 0; i < erradas.length; i += 1) {
      erradas[i].className = 'wrong';
    }
    const verifyAnswer = answer.target;
    const BASE_CALCULATOR = 10;
    this.setState({ isDisable: false });
    if (verifyAnswer.className === 'correct') {
      const { dispatch, counter, question } = this.props;
      const points = BASE_CALCULATOR + (counter * difficulties[question.difficulty]);
      dispatch(getScore(points));
      localStorage.setItem('score', points);
    } else {
      console.log('nao entrou no if');
    }
  }

  render() {
    const { question, button } = this.props;
    const { randomQuestion, isDisable } = this.state;
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
        <Timer />
        { !isDisable
        && (
          <button
            type="button"
            data-testid="btn-next"
            className="btn-next"
            onClick={ this.handleNextButton }
          >
            Próxima
          </button>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  counter: state.counter,
  button: state.button.disableButton,
  score: state.player.score,
  currentQuestion: state.player.currentQuestion,
  totalQuestions: state.player.totalQuestions,
});

Answer.propTypes = {
  question: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  button: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Answer);
