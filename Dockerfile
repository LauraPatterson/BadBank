FROM node:18-slim

# Step 3.1 - Add working directory
WORKDIR /BankingAppFinal

# Step 3.2 - Copy npm dependencies
COPY package.json /BankingAppFinal/package.json

# Step 3.3 - Install dependencies
RUN npm install

# Copy app source code
COPY /public/. /BankingAppFinal/public/.
COPY index.js /BankingAppFinal/index.js
COPY index.js /BankingAppFinal/dal.js

#Expose port and start the application

EXPOSE 3000

RUN node index.js