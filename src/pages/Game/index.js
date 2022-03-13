import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getQuestionsThunkApi } from '../../redux/actions';
import Question from '../../components/Question';
import Header from '../Header';

class Game extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    if (localStorage.token) {
      getQuestions(localStorage.token);
    }
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return (<Header />);
    }
    return (
      <div>
        <Header />
        <Question />
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  isLoading: state.questions.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(getQuestionsThunkApi(token)),
});

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
