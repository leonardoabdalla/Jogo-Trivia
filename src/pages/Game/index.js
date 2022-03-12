import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../services/Api';
import { getTokenAPI } from '../../actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionIndex: 0,
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
    this.setState({
      questions: questionsApi.results,
    });
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <>
        <h1>TRIVIA</h1>
        <p>Questions</p>
      </>
    );
  }
}

export default connect()(Game);
