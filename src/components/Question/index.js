import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Answer from '../Answer';
import Timer from '../Timer';

class Question extends Component {
  render() {
    const { questions } = this.props;
    const questArray = Object.values(questions);
    if (questArray.length > 0) {
      return (
        <>
          <Answer
            question={ questArray[0] }
          />
          <Timer />

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
