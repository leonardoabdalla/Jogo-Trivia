import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Answer from '../Answer';

class Question extends Component {
  state = {
    indexQuestion: 0,
    questionHandle: true,
  }

  handleQuestion = () => {
    this.setState({ questionHandle: false });
    const { indexQuestion } = this.state;
    const totalQuestion = 4;
    if (indexQuestion < totalQuestion) {
      this.setState((state) => ({
        indexQuestion: state.indexQuestion + 1,
      }), () => this.setState({ questionHandle: true }));
    } else {
      const { history, score, name } = this.props;
      const pic = localStorage.getItem('picture');
      // const pic2 = JSON.stringify(pic);
      const user = { name, score, pic };
      if (localStorage.getItem('ranking') === null) {
        localStorage.setItem('ranking', JSON.stringify([user]));
      } else {
        localStorage.setItem(
          'ranking',
          // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('ranking')),
            user,
          ]),
        );
      }
      console.log(history);
      history.push('/feedback');
    }
  }

  render() {
    const { questions } = this.props;
    const { indexQuestion, questionHandle } = this.state;
    const questArray = Object.values(questions);
    if (questArray.length > 0 && questionHandle) {
      return (
        <Answer
          question={ questArray[indexQuestion] }
          handleQuestion={ this.handleQuestion }
        />
      );
    }
    return (<h1> Loading </h1>);
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  score: state.player.score,
  name: state.player.gravatarEmail.name,
});
Question.propTypes = {
  questions: PropTypes.objectOf.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Question);
