import React, { Component } from "react";
import styled from "styled-components";

const slideData = [
  {
    index: 0,
    headline: "New Fashion Apparel",
    button: "Shop now",
    src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
  },
  {
    index: 1,
    headline: "In The Wilderness",
    button: "Book travel",
    src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg",
  },
  {
    index: 2,
    headline: "For Your Current Mood",
    button: "Listen",
    src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg",
  },
  {
    index: 3,
    headline: "Focus On The Writing",
    button: "Get Focused",
    src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg",
  },
];

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = { current: 0 };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
  }

  handlePreviousClick() {
    const previous = this.state.current - 1;

    this.setState({
      current: previous < 0 ? this.props.slides.length - 1 : previous,
    });
  }

  handleNextClick() {
    const next = this.state.current + 1;

    this.setState({
      current: next === this.props.slides.length ? 0 : next,
    });
  }

  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index,
      });
    }
  }

  render() {
    const { current } = this.state;
    const { slides, heading } = this.props;
    const headingId = `slider-heading__${heading
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    const wrapperTransform = {
      transform: `translateX(-${current * (100 / slides.length)}%)`,
    };

    return (
      <Wrapper>
        <div className="slider" aria-labelledby={headingId}>
          <ul className="slider__wrapper" style={wrapperTransform}>
            <h3 id={headingId} className="visuallyhidden">
              {heading}
            </h3>

            {slides.map((slide) => (
              <li
                key={slide.index}
                className={`slide ${
                  current === slide.index ? "slide--current" : ""
                }`}
                onClick={() => this.handleSlideClick(slide.index)}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
              >
                <div className="slide__image-wrapper">
                  <img
                    className="slide__image"
                    alt={slide.headline}
                    src={slide.src}
                    onLoad={this.imageLoaded}
                  />
                </div>

                <article className="slide__content">
                  <h2 className="slide__headline">{slide.headline}</h2>
                  <button className="slide__action btn">{slide.button}</button>
                </article>
              </li>
            ))}
          </ul>

          <div className="slider__controls">
            <button
              className="btn btn--previous"
              title="Go to previous slide"
              onClick={this.handlePreviousClick}
            >
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </button>

            <button
              className="btn btn--next"
              title="Go to next slide"
              onClick={this.handleNextClick}
            >
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }
}
const Wrapper = styled.main`
  @import url("https://fonts.googleapis.com/css?family=Playfair+Display:700|IBM+Plex+Sans:500&display=swap");

  :root {
    --color-primary: #6b7a8f;
    --color-secondary: #101118;
    --color-accent: #1d1f2f;
    --color-focus: #6d64f7;
    --base-duration: 600ms;
    --base-ease: cubic-bezier(0.25, 0.46, 0.45, 0.84);
  }

  // =========================
  // Global
  // =========================

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  body {
    font-family: "IBM Plex Sans", sans-serif;
    background-color: var(--color-secondary);
  }

  #app {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    overflow-x: hidden;
    width: 100%;
  }

  h1,
  h2,
  h3 {
    font-family: "Playfair Display", serif;
  }

  .visuallyhidden {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute !important;
    white-space: nowrap;
    width: 1px;
  }

  // =========================
  // Icons
  // =========================

  .icon {
    fill: var(--color-primary);
    width: 100%;
  }

  // =========================
  // Buttons
  // =========================

  .btn {
    background-color: var(--color-primary);
    border: none;
    border-radius: 0.125rem;
    color: white;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    padding: 1rem 2.5rem 1.125rem;

    &:focus {
      outline-color: var(--color-focus);
      outline-offset: 2px;
      outline-style: solid;
      outline-width: 3px;
    }

    &:active {
      transform: translateY(1px);
    }
  }

  // =========================
  // Slider controls
  // =========================

  .slider__controls {
    display: flex;
    justify-content: center;
    position: absolute;
    top: calc(100% + 1rem);
    width: 100%;

    .btn {
      --size: 3rem;

      align-items: center;
      background-color: transparent;
      border: 3px solid transparent;
      border-radius: 100%;
      display: flex;
      height: var(--size);
      padding: 0;
      width: var(--size);

      &:focus {
        border-color: var(--color-focus);
        outline: none;
      }

      &--previous > * {
        transform: rotate(180deg);
      }
    }
  }

  // =========================
  // Slider
  // =========================

  .slider {
    --slide-size: 70vmin;
    --slide-margin: 4vmin;

    height: var(--slide-size);
    margin: 0 auto;
    position: relative;
    width: var(--slide-size);
  }

  .slider__wrapper {
    display: flex;
    margin: 0 calc(var(--slide-margin) * -1);
    position: absolute;
    transition: transform var(--base-duration) cubic-bezier(0.25, 1, 0.35, 1);
  }

  // =========================
  // Slide
  // =========================

  .slide {
    border: 5px solid red;
    align-items: center;
    color: white;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: var(--slide-size);
    justify-content: center;
    margin: 0 var(--slide-margin);
    opacity: 0.25;
    position: relative;
    text-align: center;
    transition: opacity calc(var(--base-duration) / 2) var(--base-ease),
      transform calc(var(--base-duration) / 2) var(--base-ease);
    width: var(--slide-size);
    z-index: 1;

    &--previous,
    &--next {
      &:hover {
        opacity: 0.5;
      }
    }

    &--previous {
      cursor: w-resize;

      &:hover {
        transform: translateX(2%);
      }
    }

    &--next {
      cursor: e-resize;

      &:hover {
        transform: translateX(-2%);
      }
    }
  }

  .slide--current {
    --x: 0;
    --y: 0;
    --d: 50;

    opacity: 1;
    pointer-events: auto;
    user-select: auto;

    @media (hover: hover) {
      &:hover .slide__image-wrapper {
        transform: scale(1.025)
          translate(
            calc(var(--x) / var(--d) * 1px),
            calc(var(--y) / var(--d) * 1px)
          );
      }
    }
  }

  .slide__image-wrapper {
    background-color: var(--color-accent);
    border-radius: 1%;
    height: 100%;
    left: 0%;
    overflow: hidden;
    position: absolute;
    top: 0%;
    transition: transform calc(var(--base-duration) / 4) var(--base-ease);
    width: 100%;
  }

  .slide__image {
    --d: 20;

    height: 110%;
    left: -5%;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: -5%;
    transition: opacity var(--base-duration) var(--base-ease),
      transform var(--base-duration) var(--base-ease);
    user-select: none;
    width: 110%;

    @media (hover: hover) {
      .slide--current & {
        transform: translate(
          calc(var(--x) / var(--d) * 1px),
          calc(var(--y) / var(--d) * 1px)
        );
      }
    }
  }

  .slide__headline {
    font-size: 8vmin;
    font-weight: 600;
    position: relative;
  }

  .slide__content {
    --d: 60;

    opacity: 0;
    padding: 4vmin;
    position: relative;
    transition: transform var(--base-duration) var(--base-ease);
    visibility: hidden;

    .slide--current & {
      animation: fade-in calc(var(--base-duration) / 2) var(--base-ease)
        forwards;
      visibility: visible;

      @media (hover: hover) {
        transform: translate(
          calc(var(--x) / var(--d) * -1px),
          calc(var(--y) / var(--d) * -1px)
        );
      }
    }

    > * + * {
      margin-top: 2rem;
    }
  }

  // =========================
  // Animations
  // =========================

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default Slider;
