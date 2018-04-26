import React from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import actions from './../../actions';
import dict from './../../dict';
import cn from 'classnames';
import styles from './settings.scss';
import {Container} from './../../components';

const Settings = ({lang, scoreToWin, botDifficulty, setScoreToWin, setLang, setBotDifficulty, goBack}) => (
  <Container className={styles.settings}>
    <h1>{dict[lang].settings.label}</h1>
    <div className={styles.list}>
      {/* кол-во очков для победы */}
      <div>
        <div className={styles.title}>{dict[lang].settings.scoreToWin}</div>
        <div className={styles["btn-group"]}>
          <button className={cn({[styles.active]: scoreToWin === 10000})} onClick={() => setScoreToWin(10000)}>
            {(10000).toLocaleString('ru')}
          </button>
          <button className={cn({[styles.active]: scoreToWin === 20000})} onClick={() => setScoreToWin(20000)}>
            {(20000).toLocaleString('ru')}
          </button>
          <button className={cn({[styles.active]: scoreToWin === 30000})} onClick={() => setScoreToWin(30000)}>
            {(30000).toLocaleString('ru')}
          </button>
        </div>
      </div>

      {/* сложность бота */}
      <div>
        <div className={styles.title}>{dict[lang].settings.botDifficulty}</div>
        <div className={styles["btn-group"]}>
          <button className={cn({[styles.active]: botDifficulty === 0})} onClick={() => setBotDifficulty(0)}>
            {dict[lang].settings.botDifficultyEasy}
          </button>
          <button className={cn({[styles.active]: botDifficulty === 1})} onClick={() => setBotDifficulty(1)}>
            {dict[lang].settings.botDifficultyMedium}
          </button>
        </div>
      </div>

      {/* язык */}
      <div>
        <div className={styles.title}>{dict[lang].settings.lang}</div>
        <div className={styles["btn-group"]}>
          <button className={cn({[styles.active]: lang === 'ru'})} onClick={() => setLang('ru')}>
            {dict[lang].settings.langRu}
          </button>
          <button className={cn({[styles.active]: lang === 'en'})} onClick={() => setLang('en')}>
            {dict[lang].settings.langEn}
          </button>
        </div>
      </div>
    </div>
    <button onClick={goBack}>{dict[lang].back}</button>
  </Container>
);

export default connect(
  (state) => ({
    ...state.settings
  }),
  (dispatch) => ({
    setScoreToWin: (val) => dispatch(actions.game.setScoreToWin(val)),
    setBotDifficulty: (val) => dispatch(actions.game.setBotDifficulty(val)),
    setLang: (val) => dispatch(actions.i18n.changeLang(val)),
    goBack: () => dispatch(goBack()),
  }),
)(Settings);