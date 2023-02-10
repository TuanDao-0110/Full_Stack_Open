```
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    browser->>server: {"content": "This is a new note", "date": "2023-2-10"}
    server-->>browser: 201 Created
    deactivate server
    
    Note right of browser: The browser updates the list of notes with the new note and render to the page 
```