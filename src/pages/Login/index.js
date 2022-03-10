import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
// import { fetchToken } from '../../services/Api';
import { getTokenAPI } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      buttonDisable: false,
      // game: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validatedUser = this.validatedUser.bind(this);
    this.goToGame = this.goToGame.bind(this);
  }

  validatedUser() {
    const { name, email } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const PASSWORD_MIN__LENGTH = 2;
    this.setState({
      buttonDisable: email.match(emailRegex)
        && name.length > PASSWORD_MIN__LENGTH,
    });
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    }, this.validatedUser());
  }

  async goToGame() {
    // this.setState({ game: true });
    const { history, fetchToken } = this.props;
    history.push('/game');

    await fetchToken();
  }

  render() {
    const { name, email, buttonDisable } = this.state;
    // const { getTokenAPI } = this.props;
    // if (game) {
    //   return <Redirect to="/game" />;
    // }
    return (
      <div>
        <form>
          <input
            placeholder="Name"
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            validation="validName"
            onChange={ this.handleChange }
          />
          <input
            placeholder="Email"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            validation="validEmail"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={
              this.goToGame
            }
            disabled={ !buttonDisable }
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(getTokenAPI()),
});
Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
