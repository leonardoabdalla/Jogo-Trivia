import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  getGravatar = () => {
    const { email } = this.props;
    const gravatarHash = MD5(email)
      .toString()
      .toLowerCase()
      .trim();
    const gravatarEmail = `https://www.gravatar.com/avatar/${gravatarHash}`;
    return gravatarEmail;
  }

  render() {
    const { name, score } = this.props;
    console.log(typeof score);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.getGravatar() }
          alt="Foto do Perfil"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}
const mapStateToProps = ({ player:
  { gravatarEmail: { name, email }, score } }) => ({
  name,
  email,
  score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
