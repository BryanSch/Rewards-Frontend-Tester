# Rewards Test FrontEnd

## Overview

This is a simple front end express.js app that can be used to test the backend https://github.com/web34nBeYonD/Rewards_Backend that is running on your localhost:3000

Inputs from a receipt are entered, upon which the data is sent to the backend API to return a unique ID and total reward points based on specific rules.

## Example

I have created a front end sample component where you can live test examples by manually putting the receipt inputs

https://rewards-frontend-droplet.vercel.app/

## Rules

These rules collectively define how many points should be awarded to a receipt.

1 point for every alphanumeric character in the retailer name.

50 points if the total is a round dollar amount with no cents.

25 points if the total is a multiple of 0.25.

5 points for every two items on the receipt.

If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.

6 points if the day in the purchase date is odd.

10 points if the time of purchase is after 2:00pm and before 4:00pm.

## Requirements

- Node JS
- This backend server running on your local or other location https://github.com/web34nBeYonD/Rewards_Backend

## Instructions

1. Setup your backend server via the repository:

https://github.com/web34nBeYonD/Rewards_Backend

2. Clone the repository:

```
git clone https://github.com/web34nBeYonD/Rewards-Frontend-Tester
```

3. Update api.js with your backend server API URL if not using localhost:3000

4. Install dependencies with npm install, and start the app with npm start

5. In the front end, Enter Retailer, Purchase Date, Purchase Time, Items, and Prices --> then hit submit

The front end will display the receipt ID assigned and the Total Points calculated (reward points) based on the backend server criteria rules highlighted in yellow
