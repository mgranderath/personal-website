---
title: Using Sentry in a Browser Extension
date: "2019-02-07"
---

You would think that utilizing Sentry to track errors in a Browser extension is easy but it is actually not. This is how
I solved it.

<!-- end -->

# Installing Sentry

To use sentry in the browser extension first install the package using yarn or npm

```bash
# npm
npm install @sentry/browser
# yarn
yarn add @sentry/browser
```

# Using Sentry

To utilize sentry you have to follow the usual setup they give you on their website

```javascript
import * as sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_DSN"
})

function example() {
  throw new Error("Example Error")
}
example()
```

Now you might think that you will be tracking errors but unfortunately this will not work out of the box.
You first have to make some changes to the above code:

1. wrap the whole execution in a try-catch
2. add an eventlistener for the "unhandledrejection" event

The code will then look like this:

```javascript
import * as sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_DSN"
})

window.addEventListener('unhandledrejection', event => {
  Sentry.captureEvent(event.reason)
});

function example() {
  throw new Error("Example Error")
}

try {
  example()
} catch (e) {
  Sentry.captureEvent(e)
}
```

**Success**! Now sentry will capture the error/exception but you will quickly notice something that
doesn't look alright.

# Fixing the Problem

If you upload sourcemaps to sentry you would expect that they would be used to simplify finding the error
but unfortunately, by default, sentry reports the error in the `.js` file with the full path on the users
system. You might see a error description with a path like this: 
```
.../Default/Extensions/<extension-id>/0.0.1.10_0/content_script.js
``` 
instead of just the truncated relative path.

We have to truncate the path manually before sending the event to make sure that sentry recognizes
the files for the sourcemaps. We do this by specifying a `beforeSend` function in the `Sentry.init` call.

```javascript
Sentry.init({
  dsn: 'YOUR_DSN',
  beforeSend(event, hint) {
    if (event.exception) {
      event.exception.values[0].stacktrace.frames.forEach((frame) => {
        frame.filename = frame.filename.substring(frame.filename.lastIndexOf("/"))
      });
    }
    return event;
  } 
});
```

This will properly report errors and the correct sourcemaps will be used by sentry.

##### What I use this for?

I am currently working on StreamParty, "a browser extension, that allows you to watch video streams in sync with your 
significant other all across the world, on multiple platforms." Check it out! https://www.streamparty.tv/