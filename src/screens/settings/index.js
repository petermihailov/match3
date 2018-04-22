import React, {Component} from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import actions from './../../actions';
import cn from 'classnames';
import styles from './settings.scss';
import {Container} from './../../components';

class Menu extends Component {
  render() {
    const {botDifficulty, setBotDifficulty, goBack} = this.props;

    return (
      <Container className={styles.settings}>
        <div>
          <div className={styles.title}>Сложность бота</div>
          <div className={styles["btn-group"]}>
            <button className={cn({[styles.active]: botDifficulty === 0})} onClick={() => setBotDifficulty(0)}>Легкий</button>
            <button className={cn({[styles.active]: botDifficulty === 1})} onClick={() => setBotDifficulty(1)}>Средний</button>
          </div>
        </div>

        <button onClick={goBack}>Назад</button>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    botDifficulty: state.game.botDifficulty
  }),
  (dispatch) => ({
    setBotDifficulty: (val) => dispatch(actions.game.setBotDifficulty(val)),
    goBack: () => dispatch(goBack()),
  }),
)(Menu);