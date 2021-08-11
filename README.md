# node-unittest-demo

## Install and run
1. Open command prompt / bash shell
2. npm install
3. node app.js

## Sample request and response
http://localhost:3000/user_1_2/sessions/2

sample response:
```json
{"userinfo":{"userId":"2","firstname":"TestFirst","lastname":"TestLast"},"userInfoCheck":"Y"}
```

## Run unit tests
* Run tests only - `npm run test`
* Run tests and coverage - `npm run coverage`
* To customize the coverage percentage to which fail the build, modify the `.nycrc` file:
```
    "lines": 70,
    "branches": 70,
    "functions": 70,
    "statements": 70
```
