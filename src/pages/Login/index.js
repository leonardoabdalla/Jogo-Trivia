import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      // validName: false,
      // validEmail: false,
      buttonDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.handleClick);
  }

  handleClick() {
    const { name, email } = this.state;
    const validationButton = (name.length > 0 && email.length > 0);
    this.setState({
      buttonDisable: !validationButton,
    });
  }

  render() {
    const { buttonDisable } = this.state;
    return (
      <div>
        <form>
          <input
            placeholder="Name"
            data-testid="input-player-name"
            type="text"
            name="name"
            validation="validName"
            // value={ name }
            onChange={ this.handleChange }
          />
          <input
            placeholder="Email"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            validation="validEmail"
            // value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={ this.handleClick }
            disabled={ buttonDisable }
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
