import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Answer from '../Answer';

class Question extends Component {
  render() {
    const { questions } = this.props;
    const questArray = questions;
    return (
      <div>
        { questArray
          .map((answer, index) => (<Answer key={ index } question={ answer } />)) }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});
Question.propTypes = {
  questions: PropTypes.objectOf.isRequired,
};
export default connect(mapStateToProps)(Question);
