import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Answer from '../Answer';
import { getCounter, getButton } from '../../redux/actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      counter: 30,
      myTimer: 0,
    };
  }

  componentDidMount = () => {
    const ONE_SECOND = 1000;
    const counter = setInterval(this.counter, ONE_SECOND);
    this.setState({
      myTimer: counter,
    });
  }

  counter = () => {
    const { dispatch } = this.props;
    const { counter, myTimer } = this.state;
    if (counter !== 0) {
      this.setState({
        counter: counter - 1,
      }, () => dispatch(getCounter(counter)));
    }
    if (counter === 0) {
      clearInterval(myTimer);
      const correta = document.getElementById('correct-answer');
      correta.className = 'correct-answer';
      const erradas = document.querySelectorAll('.wrong-answer');
      for (let i = 0; i < erradas.length; i += 1) {
        erradas[i].className = 'wrong';
      }
      this.setState({
      }, () => dispatch(getButton({ disableButton: true })));
    }
  }

  render() {
    const { counter } = this.state;
    const { questions } = this.props;
    const questArray = Object.values(questions);
    if (questArray.length > 0) {
      return (
        <>
          <Answer
            question={ questArray[0] }
          />
          <p>{counter}</p>

        </>
      );
    }
    return (<h1> Loading </h1>);
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});
Question.propTypes = {
  questions: PropTypes.objectOf.isRequired,
};
export default connect(mapStateToProps)(Question);
