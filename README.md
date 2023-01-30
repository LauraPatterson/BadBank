# BadBank

<img src="./public/bank.png" width=250 height=250>

## Description
Node.js app that uses MongoDB and runs on port 3001 

### My contribution
Wrote all the files from scratch
#### index.js
-created all the server routes

#### dal.js
-wrote all the database queries and functions

## How To Run:
Note: This app requires a MongoDB running in the background. 
If you have Docker installed, you can run <code>docker run --name lp-badbank -d mongo</code>
You can change the name, but you'll also have to change the name in dal.js
1. Download files locally and put into a folder (make sure public folder matches)
2. Navigate to that folder in Terminal (or equivalent) and run npm install
3. Once npm install completes, run node index.js
4. Once the application is running locally, open your browser and go to localhost:3001

## Roadmap of future improvements:
- [x] Fix my docker
- [ ] Add user context in nav
- [ ] Add Firebase Auth

## License Information
Distributed under MIT License  
Please read LICENSE file for further details.
