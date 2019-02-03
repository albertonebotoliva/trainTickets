# trainTickets

This repo intends to be a basic crawler from a static html source.

I tried to keep it as simple as possible and as little dependencies as possible.
```
npm start - to console.log the output object
npm run test - to launch the tests
```

I found some issues on the input html, having \r\n characters and \" so the first step on the crawling process was to fix the html.
The output is a bit different from the original one, adding the passengers in all the trips (not only in the last trip), and the date format is also different.
