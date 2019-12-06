# slumber-frontend
React/Redux frontend for Slumber, a sleep log/dream diary/~~sleep-performance analytics~~ web app.
Also makes use of the react-calendar and date-fns packages

## to-do:
- Move token from localStorage to an httpOnly cookie
- Put API url in env variable or something for all action files to access
- Separate out actions by model (user, sleep, etc.) -each one references getUser from user actions

## Known Bugs:
- when refreshing while logged in, navbar momentarily shows the logged-out buttons
- when moving to a different tab while there is an error message, the error message is still there upon return