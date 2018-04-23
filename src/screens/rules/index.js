import React from 'react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import actions from './../../actions';
import dict from './../../dict';
import styles from './rules.scss';
import {Container} from './../../components';

const Rules = ({lang, goBack}) => (
  <Container className={styles.rules}>
    <h1>{dict[lang].rules.label}</h1>
    <div>
      <p>
        Бой разделен на ходы, которые игроки делают по очереди.
      </p>
      <p>
        Право первого хода определяется случайным образом.
      </p>
      <p>
        На ход у вас есть <span className={styles.accent}>30 секунд</span>.
      </p>
      <p>
        Для того, чтобы сделать ход нужно поменять местами соседние фишки так, чтобы составить комбинацию из трёх и
        более фишек одного цвета в ряд.
      </p>
      <p>
        Если составлена последовательность из 5 и более фишек – составившему дается <span className={styles.accent}>дополнительных ход</span>.
      </p>
      <p>
        Каждая фишка имеет свой цвет и номинал. Бой ведется до тех пор пока кто-то из игроков не набирет 
        <span className={styles.accent}>{(20000).toLocaleString('ru')}</span> очков.
      </p>
    </div>
    <button onClick={goBack}>{dict[lang].back}</button>
  </Container>
);

export default connect(
  (state) => ({
    lang: state.i18n.lang
  }),
  (dispatch) => ({
    goBack: () => dispatch(goBack()),
  }),
)(Rules);