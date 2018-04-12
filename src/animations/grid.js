import anime from 'animejs';

export default ({
  swap,
  removeMatches,
  applyGravity,
})

const SIZE = 50.828125;

function swap({from, to}) {
  const gridNode = document.querySelector('[data-type="grid"]');
  const fromNode = gridNode.querySelector(`[data-row='${from.row}'][data-col='${from.col}']`);
  const toNode = gridNode.querySelector(`[data-row='${to.row}'][data-col='${to.col}']`);

  if (fromNode && toNode) {
    const rectFrom = fromNode.getBoundingClientRect();
    const rectTo = toNode.getBoundingClientRect();
    const offset = ((rectTo.top - rectFrom.top) + (rectTo.left - rectFrom.left));
    const axis = from.row !== to.row ? 'Y' : 'X';

    const animation = anime({
      targets: [fromNode, toNode],
      [`translate${axis}`]: (el, i) => i === 0 ? offset : offset * -1,
      elasticity: 0,
      duration: 250
    });

    animation.complete = () => {
      [fromNode, toNode].forEach((node) => node.removeAttribute('style'));
    };

    return animation.finished;
  }
}

function removeMatches(matches) {
  const gridNode = document.querySelector('[data-type="grid"]');

  const nodes = matches.reduce((acc, {row, col, length, horizontal}) => {
    for (let i = 0; i < length; i++) {
      if (horizontal) {
        acc.push(gridNode.querySelector(`[data-row='${row}'][data-col='${col + i}']`))
      } else {
        acc.push(gridNode.querySelector(`[data-row='${row + i}'][data-col='${col}']`))
      }
    }

    return acc;
  }, []);

  const animation = anime({
    targets: nodes,
    background: '#fff',
    scale: 0,
    elasticity: 0,
    easing: 'easeInBack',
    duration: 250
  });

  animation.complete = () => {
    nodes.forEach((node) => node.removeAttribute('style'));
  };

  return animation.finished;
}

function applyGravity(removedMatches) {
  const gridNode = document.querySelector('[data-type="grid"]');

  const animationObjects = removedMatches.reduce((acc, {row, col, length, horizontal}) => {
    if (horizontal) {
      for (let i = 0; i < length; i++) {
        for (let j = row; j !== 0; j--) {
          acc.push({
            targets: gridNode.querySelector(`[data-row='${j - 1}'][data-col='${col + i}']`),
            offset: 0,
            duration: 400,
            elasticity: 100,
            translateY: SIZE
          });
        }
      }
    } else {
      for (let j = row; j !== 0; j--) {
        acc.push({
          targets: gridNode.querySelector(`[data-row='${j - 1}'][data-col='${col}']`),
          offset: 0,
          duration: 400,
          elasticity: 100,
          translateY: SIZE * length
        });
      }
    }

    return acc;
  }, []);

  if (animationObjects.length > 0) {
    const animation = anime.timeline();

    animationObjects.forEach((obj) => animation.add(obj));

    animation.complete = () => {
      animationObjects.forEach((obj) => obj.targets.removeAttribute('style'));
    };

    return animation.finished;
  }
}