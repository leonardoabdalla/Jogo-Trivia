import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.css';

class Header extends Component {
  getGravatar = () => {
    const { email } = this.props;
    const gravatarHash = MD5(email)
      .toString()
      .toLowerCase()
      .trim();
    const gravatarEmail = `https://www.gravatar.com/avatar/${gravatarHash}`;
    localStorage.setItem('picture', gravatarEmail);
    return gravatarEmail;
  }

  render() {
    const { name, score } = this.props;
    console.log(typeof score);
    return (
      <header>
        <div className="header-container">
          <div className="left-section">
            <img
              data-testid="header-profile-picture"
              src={ this.getGravatar() }
              alt="Foto do Perfil"
            />
          </div>
          <h4 data-testid="header-player-name">{ name }</h4>
          <div className="right-section">
            <h3 data-testid="header-score">{ score }</h3>
          </div>
        </div>
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
