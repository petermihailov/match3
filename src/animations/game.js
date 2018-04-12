import anime from 'animejs';

export default ({
  updateScore
});

function updateScore({pointsNode, newScore, oldScore}) {
  if (pointsNode) {
    const animatedScore = {value: oldScore};

    const animation = anime({
      targets: animatedScore,
      value: newScore,
      round: 1,
      easing: 'easeOutCirc',
      duration: Math.abs(newScore - oldScore) / 3,
      update: () => pointsNode.innerText = (animatedScore.value).toLocaleString('ru')
    });

    return animation.finished;
  }
}