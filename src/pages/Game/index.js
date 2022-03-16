import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Question from '../../components/Question';
import Header from '../Header';
import { fetchQuestions } from '../../services/Api';
import { getTokenAPI, getCounter, getButton } from '../../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 30,
      myTimer: 0,
    };
  }

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
  }

  render() {
    const { counter } = this.state;
    const { isLoading } = this.props;
    if (isLoading) {
      return (<Header />);
    }
    return (
      <div>
        <Header />
        <Question />
        <p>{ counter }</p>
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
