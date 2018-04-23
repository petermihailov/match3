import React from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import actions from './../../actions';
import dict from './../../dict';
import cn from 'classnames';
import styles from './settings.scss';
import {Container} from './../../components';

const Settings = ({lang, setLang, botDifficulty, setBotDifficulty, goBack}) => (
  <Container className={styles.settings}>
    <h1>{dict[lang].settings.label}</h1>
    <div className={styles.list}>
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
    botDifficulty: state.settings.botDifficulty,
    lang: state.settings.lang,
  }),
  (dispatch) => ({
    setBotDifficulty: (val) => dispatch(actions.game.setBotDifficulty(val)),
    setLang: (val) => dispatch(actions.i18n.changeLang(val)),
    goBack: () => dispatch(goBack()),
  }),
)(Settings);