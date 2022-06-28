# Frontend Mentor - Tip calculator app

![Design preview for the Tip calculator app coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Demo](#Demo)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person


### Screenshot

![capture](https://user-images.githubusercontent.com/60886336/176317208-66b68ef7-9a3f-46fc-ac0f-1959531fe691.png)


### Demo

- Live Site URL: [Tip calculator app](https://sanurb.github.io/Frontend-Mentor-Challenges/tip-calculator-app/index.html)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties (named classes according to BEM)
- Flexbox
- Mobile-first workflow
- JS

### What I learned
In this challenge I was able to put into practice a more efficient way of selecting items

```js
const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(
        `Double check your '${selector}' selector and make sure it's typed correctly`
    );
};
```

this also allows us to have a great error handling, and the most important thing is not to repeat ourselves. #DYR which is one of the most important principles

Selecting items is as easy as:
```js
selectElement("#bill-input");
```

Important note: In the event that you have to select multiple elements at once for looping purposes, this will not work since it will only return the first element. For this, use 
```js 
document.querySelectorAll();
```

## Author

> :man: Santiago Urbano Rivadeneira
> :e-mail: [E-mail](dsanturban@gmail.com)
> :octocat: [Github](https://github.com/sanurb)
> :bird: [Twitter](https://twitter.com/dsanturban)
> :blue_book: [Linkedin](https://www.linkedin.com/in/santurban)
