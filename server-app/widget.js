(function(win, doc) {
    win.widget = {
        init: (sel) => {
            const widgetServerUrl = "http://localhost:8081";
            const clientOrigin = win.origin;

            win.addEventListener("DOMContentLoaded", () => {
                const stylesheet = doc.createElement("link");
                stylesheet.setAttribute("rel", "stylesheet");
                stylesheet.setAttribute("href", `${widgetServerUrl}/server-app/widget.css`);
                doc.querySelector("head").appendChild(stylesheet);

                const form = doc.createElement("form");
                form.setAttribute("id", "widget-form");
                doc.querySelector(sel).appendChild(form);

                const input = doc.createElement("input");
                input.setAttribute("id", "widget-input");
                form.appendChild(input);

                const button = doc.createElement("button");
                button.setAttribute("id", "widget-button");
                button.textContent = "Send";
                form.appendChild(button);

                const messages = doc.createElement("div");
                messages.setAttribute("id", "widget-data");
                doc.querySelector(sel).appendChild(messages);

                const frame = doc.createElement("iframe");
                frame.setAttribute("id", "widget-controller");
                frame.setAttribute("src", `${widgetServerUrl}/server-app/widget.html?clientOrigin=${clientOrigin}`);
                frame.setAttribute("style", "width: 0; height: 0; display: none;");
                doc.querySelector(sel).appendChild(frame);

                win.addEventListener("message", event => {
                    if (event.data.event === "messages") {
                        const list = document.createElement("ol");

                        event.data.data.forEach(message => {
                            const item = document.createElement("li");
                            item.textContent = message;
                            list.appendChild(item);
                        });

                        doc.querySelector(`${sel} > #widget-data`).replaceChildren(list);
                    }

                    if (event.data.event === "load") {
                        doc.querySelector(sel).style.display = "block";
                    }
                });

                form.addEventListener("submit", event => {
                    event.preventDefault();
                    frame.contentWindow.postMessage(input.value, widgetServerUrl);
                    input.value = "";
                    input.focus();
                });
            });
        }
    }
})(window, document);
