# Frontend Mentor - Hangman game solution

This is a solution to the [Hangman game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/hangman-game-rsQiSVLGWn). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Overview

### The challenge

Users should be able to:

- Learn how to play Hangman from the main menu.
- Start a game and choose a category.
- Play Hangman with a random word selected from that category.
- See their current health decrease based on incorrect letter guesses.
- Win the game if they complete the whole word.
- Lose the game if they make eight wrong guesses.
- Pause the game and choose to continue, pick a new category, or quit.
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.
- Navigate the entire game only using their keyboard.

### Screenshot

![](./public/preview.jpg)

### Links

- Solution URL: [repo](https://github.com/g1alexander/hangman_game)
- Live Site URL: [website](https://hangman-game-ai.vercel.app/)

## My process

### Built with

- [Next js](https://nextjs.org/) - React Framework
- [Open AI](https://openai.com/) - Text generation models
- [reCAPTCHA](https://www.google.com/recaptcha/about/) - website protector against spam and abuse.

### What I learned

In the Next.js section, I gained knowledge on how to manage the 'api' folder to create a REST API efficiently.
As for OpenAI, I explored creating custom prompts and setting parameters to get accurate responses according to my expectations.

### Continued development

My goal is to improve the interactivity of the game so that the user can fully navigate using only the keyboard.

## Getting Started

rename `.env.example`

```bash
mv .env.example .env.local
```

adds the open ai api key and recaptcha tokens to the environment:

- open ai: [link](https://platform.openai.com/api-keys)
- recaptcha: [link](https://developers.google.com/recaptcha/intro)
- url recaptcha endpoint (`URL_CAPTCHA`): `https://www.google.com/recaptcha/api/siteverify`

install dependencies and run the development server:

```bash
yarn && yarn dev
```

## Author

- Website - [g1alexander.com](https://www.g1alexander.com)
- Frontend Mentor - [@g1alexander](https://www.frontendmentor.io/profile/g1alexander)
- Twitter - [@g1alexander\_](https://www.twitter.com/g1alexander_)
