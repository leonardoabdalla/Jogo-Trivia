import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdSettings } from 'react-icons/md';
import { getLogin, getTokenAPI } from '../../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      buttonDisable: false,
    };
  }

  validatedUser = () => {
    const { name, email } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const PASSWORD_MIN__LENGTH = 2;
    this.setState({
      buttonDisable: email.match(emailRegex)
        && name.length > PASSWORD_MIN__LENGTH,
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.validatedUser);
  }

  goToGame = async () => {
    const { name, email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(getTokenAPI());
    dispatch(getLogin({ email, name }));
    history.push('/game');
  }

  render() {
    const { name, email, buttonDisable } = this.state;
    const { history } = this.props;
    return (
      <div>
        <form>
          <input
            placeholder="Name"
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            placeholder="Email"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={
              this.goToGame
            }
            disabled={ !buttonDisable }
            data-testid="btn-play"
            text=""
          >
            Play
          </button>
          <div>
            <MdSettings
              data-testId="btn-settings"
              onClick={ () => history.push('/settings') }
            />
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect()(Login);
