import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from './../../actions';
import styles from './menu.scss';
import {Container} from './../../components';
import Logo from './logo';

class Menu extends Component {
  render() {
    const {startGame, startGameWithBot} = this.props;

    return (
      <Container className={styles.menu}>
        <Logo className={styles.logo}/>
        <div className={styles.buttons}>
          <button onClick={startGameWithBot}>Play with BOT</button>
          <button onClick={startGame}>Start game</button>
        </div>
      </Container>
    );
  }
}

export default connect(
  undefined,
  (dispatch) => ({
    startGame: () => dispatch(actions.game.startGame()),
    startGameWithBot: () => dispatch(actions.game.startGameWithBot()),
  }),
)(Menu);