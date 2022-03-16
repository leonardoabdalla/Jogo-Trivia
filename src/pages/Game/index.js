import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Question from '../../components/Question';
import Header from '../Header';
import { fetchQuestions } from '../../services/Api';
import { getTokenAPI } from '../../redux/actions';
import '../../components/Answer/Answer.css';

class Game extends React.Component {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    console.log(token);
    let questionsApi = await fetchQuestions(token);
    // verifica se o token expirou
    const expiredToken = 3;
    if (questionsApi.response_code === expiredToken) {
      // se ele expirou, realiza uma nova requisição de token
      await dispatch(getTokenAPI());
      const newToken = localStorage.getItem('token');
      // realiza a requisição das questões com o novo token
      questionsApi = await fetchQuestions(newToken);
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

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, null)(Game);
