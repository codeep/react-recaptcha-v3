# react-recaptcha-google

This component is created in order to make the experience of integrating Google ReCaptcha into React apps easier and smoother.

Currently, we are using ReCaptcha V3, which is still in beta version; so, we will update our component when they release the stable version.

P.S. It will open the ReCaptcha window only when there are some doubts by Google; otherwise, it will automatically generate the recaptcha token.

# Google ReCaptcha V3

## Installation

`npm install react-recaptcha-v3 --save`

## Usage

First of all, get your site key for ReCaptcha V3 [here](https://www.google.com/recaptcha/admin#v3signup "V3 signup")

There are two steps that you need to implement.

### 1. Use `loadReCaptcha()` to initialize the ReCaptcha

This function should be imported and called in the main (parent) component of your app. We recommend calling it in `componentDidMount()` of `App.js`.

```
import { loadReCaptcha } from 'react-recaptcha-google'

...

componentDidMount() {
  loadReCaptcha(your_site_key);
}
```


### 2. Use `ReCaptcha` to integrate ReCaptcha in a particular component

#### invisible Recaptcha

Create a new component with the following code and give it a try!

```
import React, { Component } from 'react';
import { ReCaptcha } from 'react-recaptcha-google'

class ExampleComponent extends Component {

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
  }

  render() {
    return (
      <div>

        <ReCaptcha
            sitekey="your_site_key"
            action='action_name'
            verifyCallback={this.verifyCallback}
        />

        <h2>Google ReCaptcha with React </h2>

        <code>
          1. Add <strong>your site key</strong> in the ReCaptcha component. <br/>
          2. Check <strong>console</strong> to see the token.
        </code>
      </div>
    );
  };
};

export default ExampleComponent;

```


##### Optional props

* `data-theme` - you can add `theme` prop with a value of either `"dark"` or `"light"`(default) to control the background theme of the visible ReCaptcha (when size is `normal` or `compact`)
* `data-badge` - you can send `badge` prop with one of the following values: bottomright (default), bottomleft, inline. This will allowyou to reposition the ReCaptcha badge.
