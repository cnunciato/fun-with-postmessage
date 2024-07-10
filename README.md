# fun-with-postmessage

Experimenting with using a headless iframe as a chat client.

```bash
npm install
npm --prefix spa-site install
npm start
```

... then browse to either of these URLs:

* `static-site`, a simple static site that runs at http://localhost:8080
* `spa-site`, an single-page app written in React (via Vite) that runs at http://localhost:5173

## How it works

Running `npm start` launches three local services: the two sites above, which act as consumers/embedders of a hypothetical chat widget, plus a third that acts as a web application hosting the widget and the "service" that powers it. The intent is to show how a "headless" (i.e., invisible) `iframe` and `window.postMessage` can enable message passing across  domain boundaries as well as grant full control over the widget's UI -- styling, positioning, etc. -- to consuming apps of various types.

Both `static-site` and `spa-site` embed the chat widget using a single `script` tag that loads a script from `server-app` and then instantiates the chat widget by calling `widget.init()`. The script then writes an invisible `iframe` into the page, and from that point forward, the frame and script conspire to:

* handle chat inputs from `static-site` and `spa-site`
* notify both of "responses" from `server-app`
* draw a UI into the DOM of each site using some default styling, and keep the DOM updated
* deserialize "conversations" from localStorage on startup to get the widget bootstrapped into the UI quickly

One of the many benefits of this approach is that it allows consuming sites to position and manage the chat widget however they like because the widget UI belongs to the consuming site's DOM, rather than to the `iframe` itself. This makes the widget much more lightweight, flexible, and customizable (default styles can be overridden, positioning can be inline or fixed, etc, etc. -- see http://localhost:8080/otherpage.html for an example) and thus easier to integrate and maintain across different web properties.
