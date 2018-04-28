import anime from 'animejs';

export default ({
  swap,
  removeMatches,
  applyGravity,
  fillVoid
})

const SIZE = 50.828125;

function swap({from, to}) {
  const gridNode = document.querySelector('[data-type="grid"]');

  if (gridNode) {
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
}

function removeMatches(matches) {
  const gridNode = document.querySelector('[data-type="grid"]');

  if (gridNode) {
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
}

function applyGravity(grid) {
  const gridNode = document.querySelector('[data-type="grid"]');
  const changes = [];

  if (gridNode) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const piece = grid[row][col];

        if (piece) {
          let shiftDown = 0;

          for (let i = 1; i < grid.length - row; i++) {
            if (grid[row + i][col] === null) {
              shiftDown++;
            }
          }

          if (shiftDown) {
            changes.push({
              targets: gridNode.querySelector(`[data-row='${row}'][data-col='${col}']`),
              translateY: SIZE * shiftDown,
              offset: 0,
              duration: 400,
              elasticity: 100
            });
          }
        }
      }
    }

    if (changes.length) {
      const animation = anime.timeline();

      changes.forEach((obj) => animation.add(obj));

      animation.complete = () => {
        changes.forEach((obj) => obj.targets.removeAttribute('style'));
      };

      return animation.finished;
    }
  }
}

function fillVoid(changes) {
  const gridNode = document.querySelector('[data-type="grid"]');

  if (gridNode) {
    const animation = anime.timeline();

    const animationChanges = changes.map((obj) => {
      const node = gridNode.querySelector(`[data-row='${obj.row}'][data-col='${obj.col}']`);

      return ({
        targets: node,
        opacity: [0, 1],
        translateY: [-(SIZE * 2), 0],
        offset: anime.random(0, 100),
        duration: 400,
        elasticity: 100
      })
    });

    animationChanges.forEach((obj) => animation.add(obj));

    animation.complete = () => {
      animationChanges.forEach((obj) => obj.targets.removeAttribute('style'));
    };

    return animation.finished;
  }
}