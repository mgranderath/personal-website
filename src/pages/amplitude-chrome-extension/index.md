---
title: Using Amplitude in a Chrome Extension
date: "2019-01-25"
---

For one of my projects I utilized Amplitude for Event tracking and this is how I did it.

<!-- end -->

## Why Amplitude?

In my last internship I had already used it for event tracking and I was used to it. I also wanted pure event tracking
analytics and nothing like Google Analytics.

## Setting up

First you have to install the amplitude-js module:

```bash
# npm
npm install amplitude-js
# yarn
yarn add amplitude-js
```

## Using Amplitude

Now that we have the library installed we can utilize it in `popup.js` etc.

```javascript
import amplitude from "amplitude-js/amplitude";

amplitude.getInstance().init("API_KEY");
amplitude.getInstance().logEvent("ExampleEvent", {
    exampleProperty: "test"
});
```