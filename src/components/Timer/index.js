// import React, { Component } from 'react';

// class Timer extends Component {
//   constructor() {
//     super();

//     this.state = {
//       counter: 30000,
//     };

//     this.timer = null;
//   }

//   componentDidMount() {
//     const ONE_SECOND = 1000;
//     this.timer = setInterval(
//       () => this.setState((prevState) => ({ counter: prevState.counter - 1 })),
//       ONE_SECOND,
//     );
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const TIME_LIMIT = 0;

//     const { counter } = prevState;

//     if (counter === TIME_LIMIT) {
//       this.setState({
//         counter: 30000,
//       });
//     }
//   }

//   componentWillUnmount() {
//     console.log('Desmonatando o componente');
//     clearInterval(this.timer);
//   }

//   render() {
//     return (
//       <h1>Timer</h1>
//     );
//   }
// }

// export default Timer;
