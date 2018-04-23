import React, {Component} from 'react';
import cn from 'classnames';
import anime from 'animejs';
import styles from './fireworks.scss'

/*
Fireworks by Julian Garnier
https://codepen.io/juliangarnier/pen/gmOwJX
 */

const COLORS = ['#00ff3a', '#ff8e00', '#00b0ff', '#ff4133', '#9f51bd'];
const COUNT = 30;

export default class Fireworks extends Component {
  constructor(props) {
    super(props);
    this.fireworksRef = React.createRef();
  }

  setCanvasSize = () => {
    const canvas = this.canvas;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.getContext('2d').scale(2, 2);
  };

  setParticleDirection = (p) => {
    const angle = anime.random(0, 360) * Math.PI / 180;
    const value = anime.random(50, 180);
    const radius = [-1, 1][anime.random(0, 1)] * value;

    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle)
    }
  };

  createParticle = (x, y) => {
    const ctx = this.ctx;
    const p = {x, y};

    p.color = COLORS[anime.random(0, COLORS.length - 1)];
    p.radius = anime.random(16, 32);
    p.endPos = this.setParticleDirection(p);
    p.draw = function () {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    };

    return p;
  };

  createCircle = (x, y) => {
    const ctx = this.ctx;

    return ({
      x,
      y,
      color: '#FFF',
      radius: 0.1,
      alpha: .5,
      lineWidth: 6,
      draw: function () {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
  };

  renderParticle = (anim) => {
    for (let i = 0; i < anim.animatables.length; i++) {
      anim.animatables[i].target.draw();
    }
  };

  animateParticles(x, y) {
    const circle = this.createCircle(x, y);
    const particles = [];

    for (let i = 0; i < COUNT; i++) {
      particles.push(this.createParticle(x, y));
    }

    anime.timeline().add({
      targets: particles,
      x: function (p) {
        return p.endPos.x;
      },
      y: function (p) {
        return p.endPos.y;
      },
      radius: 0.1,
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: this.renderParticle
    })
      .add({
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800),
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: this.renderParticle,
        offset: 0
      });
  }

  animate = (e) => {
    const {disabled} = this.props;

    if (!disabled) {
      const pointerX = e.clientX || e.touches[0].clientX;
      const pointerY = e.clientY || e.touches[0].clientY;
      this.animateRender.play();
      this.animateParticles(pointerX, pointerY);
    }
  };

  autoFire = () => {
    this.animateParticles(
      anime.random(50, window.innerWidth - 50),
      anime.random(50, window.innerHeight - 100)
    );

    const duration = anime.random(100, 500);

    if (this.props.autoFire) {
      anime({duration}).finished.then(this.autoFire);
    }
  };

  componentDidMount() {
    this.canvas = this.fireworksRef.current;
    this.ctx = this.canvas.getContext('2d');

    this.animateRender = anime({
      duration: Infinity,
      update: () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    });

    this.setCanvasSize();

    if (this.props.autoFire) {
      this.autoFire();
    }

    document.addEventListener('touchstart', this.animate);
    window.addEventListener('resize', this.setCanvasSize);
  }

  componentWillUnmount() {
    document.removeEventListener('touchstart', this.animate);
    window.removeEventListener('resize', this.setCanvasSize);
  }

  componentWillReceiveProps({autoFire}) {
    if (autoFire) {
      this.autoFire();
    }
  }

  render() {
    const {className} = this.props;

    return (
      <canvas ref={this.fireworksRef} className={cn(styles.fireworks, className)}/>
    )
  }
}