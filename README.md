# 🌱 Circe

## 🌱 Overview

This is a single-page application website made with React that allows users to trade plants with each other (based on offer and demand), as well as discover new plants they don't yet know and showcase their current plant collection.

## 🌱 Features

-   Application has a top navigation that allows the user to navigate to:
    -   Personal profile
    -   Page to trade plants with other users. Here users can add or delete plants to their wishlist, as well as upload what they have to offer.
        -   In the trade page, trading matches are displayed in two categories: if someone has something to trade that the user is looking for, it is displayed as a match. If the user also has something that the other user is looking for, then a message displaying FULL MATCH appears (an immediate trade can be done). A modal window leads from the matches page to the user's profile who has the desired plant.
    -   Page to view latest users and plants for trade, and search for a specific user or specific plant.
    -   Page to explore and discover new plants (by searching in the Plantbook API). Here users can learn about the requirements different plants have with the displayed data (temperature, humidity, light, etc). Users can add their discoveries to their wishlists.
    -   Link that will enable the user to log out.
-   In the personal profile, the user can upload a profile picture as well as add a small biography. There is a component that displays the current weather conditions in the user's location (by requesting an weather API), and conditionally renders gardening advice based on factors such as temperature and humidity.

## 🌱 Technology

-   <p> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/javascript/javascript-plain.svg" alt="javascript" width="40" height="40"/> </a> &nbsp; <a href="https://aws.amazon.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> &nbsp; <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/nodejs/nodejs-original.svg" alt="nodejs" width="40" height="40"/> </a> &nbsp; <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/express/express-original.svg" alt="express" width="40" height="40"/> </a> &nbsp; <a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> &nbsp; <a href="https://socket.io/" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="socket.io" width="40" height="40"/> </a> &nbsp; <a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> &nbsp; <a href="https://redux.js.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/c5378d6c2510ffa0b3e4475af95618a8048d6cf1/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> &nbsp; </p>

-   JavaScript, AWS S3, Node.js, Express.js, PostgreSQL, Socket.IO, React & Redux

## Preview

**_Profile Page and Weather API_**
<img src="client/public/profile-page.gif">

<br>

**_Exploring New Plants_** <br>
<img src="client/public/explore-window-1.gif">

<br>
<img src="client/public/explore-window-2.gif">

<br>

**_Trading: wishlist and plants to trade_**
<img src="client/public/trade-window-1.gif">

<br>

**_Trading: matches_** <br>
<img src="client/public/trade-window-2.gif">

<br>

**_Latest plants and users_**
<img src="client/public/news1.gif">

<br>
<img src="client/public/news2.gif">

<br>
