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
      const { history } = this.props;
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
});
Question.propTypes = {
  questions: PropTypes.objectOf.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default connect(mapStateToProps)(Question);
