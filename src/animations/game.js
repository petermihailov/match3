import anime from 'animejs';

export default ({
  updateScore
});

function updateScore(pointsNode, oldScore, newScore) {
  const animatedScore = {value: oldScore};

  if (pointsNode) {

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
