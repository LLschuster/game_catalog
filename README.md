# Game Catalog

A responsive game catalog, with the options of adding and deleting items from it.
Using firestore database, firebase cloud functions and react.

## How to access page

```
App is deployed under https://llschuster.github.io/game_catalog/
```

For local installation (note: adding and deleting will return cors errors)
```bash
(cd client && npm install && npm run start)
go to localhost:6969
```

## structure
```
client folder: contains all frontend code
cloudfunctions folder: contains firebase cloud functions
docs folder: is the folder that gets deployed as a github page.
```

## To be improve

```
Improve visuals, primarily how to handle the relationship between base game and expansions
reset the form for adding a new game after submitting.
Took a shortcut in regards deploying the application, doing it on a github action should be better.
Add pagination for retrieving the game catalog.
Add loading states when fetching/posting to the API's
```