# fun-with-postmessage

Experimenting with using a headless iframe as a chat client.

```bash
npm install # The "apps" themselves have no dependencies; this is just to host them locally.
npm start
```

... then browse to http://localhost:8080.

## How it works

Running `npm start` starts two local services: `client-app`, which acts like a simple website, and `server-app`, which acts like a hosted chat widget (the idea being to simulate message passing between domains). The client app includes a `script` tag that loads a script hosted by `server-app` and then instantiates the chat widget by calling `widget.init()`, which writes an `iframe` into the page that acts as a chat widget.

Importantly, the `iframe` is "headless"; it contains no UI of its own. Its jobs are to:

* accept chat inputs from `client-app`
* notify `client-app` of "responses" from `server-app`
* draw a UI into `client-app`'s DOM and keep it updated
* deserialize "conversations" from localStorage on startup to get the widget into the UI quickly

One of the many benefits of this approach is that it allows `client-app` to position and manage the chat widget however it likes because the widget's UI belongs to its DOM, rather than the `iframe`'s. The widget also "ships" with some default styling, but that styling can be overridden by `client-app` if necessary. (See `otherpage.html` for an example.)
