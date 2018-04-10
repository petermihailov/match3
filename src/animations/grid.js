import anime from 'animejs';

export default ({
  swap
})

function swap({gridNode, from, to}) {
  return new Promise((res, rej) => {
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
        duration: 700
      });

      animation.complete = () => {
        res();
        [fromNode, toNode].forEach((node) => node.removeAttribute('style'));
      }
    } else {
      rej()
    }
  })
}

function swap1({gridNode, from, to}) {
  return swap({gridNode, from, to})
    .then(response => ({ response }))
    .catch(error => ({ error }))
}