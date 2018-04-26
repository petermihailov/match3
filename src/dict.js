const dict = {
  // russian
  ru: {
    back: 'Назад',
    startGame: 'Играть',
    startGameWithBot: 'Играть с Ботом',
    restart: 'Заново',

    settings: {
      label: 'Настройки',
      botDifficulty: 'Сложность бота',
      botDifficultyEasy: 'Легкий',
      botDifficultyMedium: 'Средний',
      lang: 'Язык',
      langRu: 'Русский',
      langEn: 'English',
      scoreToWin: 'Сколько очков до победы?'
    },

    rules: {
      label: 'Правила',
    },

    gameMessages: {
      additionalMove: {
        title: '5 в ряд!',
        message: 'Дополнительный ход!'
      },
      win: {
        title: '🎉 Победа! 🎉',
        message: (winner) => `Игрок ${winner} выиграл!`
      },
      goodMove: {
        title: 'Во дела!',
        message: '10 000+ за ход!'
      },
      noMoves: {
        message: 'Нет ходов!'
      }
    }
  },

  // english
  en: {
    back: 'Back',
    startGame: 'Start',
    startGameWithBot: 'Start with Bot',
    restart: 'Restart',

    settings: {
      label: 'Settings',
      botDifficulty: 'Bot difficulty',
      botDifficultyEasy: 'Easy',
      botDifficultyMedium: 'Medium',
      lang: 'Language',
      langRu: 'Русский',
      langEn: 'English',
      scoreToWin: 'Score to win'
    },

    rules: {
      label: 'Rules (Rus)',
    },

    gameMessages: {
      additionalMove: {
        title: '5 in the row!',
        message: 'Additional move!'
      },
      win: {
        title: '🎉 Victory! 🎉',
        message: (winner) => `Player ${winner} won!`
      },
      goodMove: {
        title: 'God move!',
        message: '10 000+ points!'
      },
      noMoves: {
        message: 'No moves!'
      }
    }
  }
};

export default dict;