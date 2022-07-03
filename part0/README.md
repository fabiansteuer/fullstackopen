# Part 0

All answers include sequence diagram code for [WebSequenceDiagrams](https://www.websequencediagrams.com/).

## 0.4 New note

```
note over browser:
user enters note into input
field and clicks save button
end note

browser->server: HTTT POST https://studies.cs.helsinki.fi/exampleapp/new_note

note over server
server extracts note from request
body, adds the current date to it
and saves it in notes array
end note

server->browser: 302 redirect to https://studies.cs.helsinki.fi/exampleapp/notes
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

## 0.5 Single page app

```
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

## 0.6 New note

```
note over browser:
user enters note into input
field and clicks save button
end note

note over browser:
JavaScript code adds note to local list
of notes and sends note to server
end note

browser->server: HTTT POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

note over server
server extracts note from request
body and saves it in notes array
end note

server->browser: 201 note created confirmation
```