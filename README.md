`EmailsInput` is an input field with emails.

<img src="https://raw.githubusercontent.com/machadoum/emails-input/master/frame2.png" alt="design" style="width:300px;"/>

Demo: https://machadoum.github.io/emails-input/

Github repository: https://github.com/machadoum/emails-input/

## How to use it

1. Download the script [here](https://raw.githubusercontent.com/machadoum/emails-input/master/dist/emails-input.js)
2. import the script in your HTML file.
   `<script src="emails-input.js"></script>`
3. Create an empty div tag where you want to display `EmailInput`.
   `<div id="emails-input"></div>`
4. Call `EmailInput` with the previously created DOM node as argument. `EmailsInput(document.querySelector("#emails-input"));`

### Example:

```html
<div id="emails-input"></div>
<script src="emails-input.js"></script>
<script>
  EmailsInput(document.querySelector("#emails-input"));
</script>
```

You can also check the demo page code: [here](https://github.com/machadoum/emails-input/blob/master/index.html)

### Next steps

- Write tests
- Add a method that returns all valid e-mails added.
- Add support for the initial state.
- Improve documentation.
- Improve distribution (cdn, npm module, versioning).

## Development Notes:

### How to contribute?

- Build: `yarn build`
- Development mode: `yarn watch`
- Release: `yarn release`
- Check linter and code style `yarn checkup`

#### Why roolup?

It's a better fit for libraries then webpack. [Read more](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)

### Shortcuts taken

Given the amount of requirements and the limited amount of time, I've decided to take some shortcuts to speedup my development.

- Email validation handled by HTML validity API.
- A very simples implemention of Random e-mail.
- It's not pixel perfect on IE.
- I used `node.innerHTML` for initializing the HTML.

### Other considerations

- CSS is transpiled by postcss because I didn't need most of the features of sass or less.
- It should be accessible (a11y) by keyboard navigations and provide some context for voice over.
- `babel` transpiles the source code to es5 (for IE 11). But `core-js` polyfill is not included.
- All CSS code is automatically injected in the header.
- I added a CSS function named `px()` to simplify the conversion between `px` and `rem`. [Read more](https://engageinteractive.co.uk/blog/em-vs-rem-vs-px).
- Code conventions are checked by prettier, eslint and stylelint.
- I added a very small subset of `normalize.css` covering the used tags. It's scoped to the component so it doesn't conflict.
