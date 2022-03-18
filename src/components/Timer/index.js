import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCounter, getButton } from '../../redux/actions';

class Timer extends Component {
  componentDidMount = () => {
    const ONE_SECOND = 1000;
    this.myTimer = setInterval(this.counter, ONE_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.myTimer);
  }

  counter = () => {
    const { dispatch, counter } = this.props;
    if (counter !== 0) {
      dispatch(getCounter());
    }
    if (counter === 0) {
      clearInterval(this.myTimer);
      const correta = document.getElementById('correct-answer');
      correta.className = 'correct';
      const erradas = document.querySelectorAll('.wrong-answer');
      for (let i = 0; i < erradas.length; i += 1) {
        erradas[i].className = 'wrong';
      }
      dispatch(getButton({ disableButton: true }));
    }
  }

  render() {
    const { counter } = this.props;
    return (
      <h1>{counter}</h1>
    );
  }
}

Timer.propTypes = {
  counter: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

export default connect(mapStateToProps, null)(Timer);
