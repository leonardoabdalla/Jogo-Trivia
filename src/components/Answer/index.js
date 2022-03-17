import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScore } from '../../redux/actions';

import './Answer.css';

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

  changeColor = (answer) => {
    const correta = document.getElementById('correct-answer');
    correta.className = 'correct';
    const erradas = document.querySelectorAll('.wrong-answer');
    for (let i = 0; i < erradas.length; i += 1) {
      erradas[i].className = 'wrong';
    }
    const verifyAnswer = answer.target;
    const { dispatch, counter, question } = this.props;
    console.log(typeof counter);
    const BASE_CALCULATOR = 10;
    if (verifyAnswer.className === 'correct') {
      console.log('entrou');
      const points = BASE_CALCULATOR + (counter * difficulties[question.difficulty]);
      console.log(points);
      this.setState({
      }, () => dispatch(getScore(points)));
      localStorage.setItem('score', points);
    } else {
      console.log('nao entrou no if');
    }
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
  score: state.player.score,
});

Answer.propTypes = {
  question: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  button: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Answer);
