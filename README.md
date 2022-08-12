# Circe

## Overview

This is a single-page application website made with React that allows users to trade plants with each other (based on offer and demand), as well as discover new plants they don't yet know and showcase their current plant collection.

## Features

-   Application has a top navigation that allows the user to navigate to:
    -   Personal profile 
    -   Page to trade plants with other users. Here users can add or delete plants to their wishlist, as well as upload what they have to offer. 
        -   In the trade page, trading matches are displayed in two categories: if someone has something to trade that the user is looking for, it is displayed as a match. If the user also has something that the other user is looking for, then a message displaying FULL MATCH appears (an immediate trade can be done). A modal window leads from the matches page to the user's profile who has the desired plant.
    -   Page to view latest users and plants for trade, and search for a specific user or specific plant.
    -   Page to explore and discover new plants (by searching in the Plantbook API). Here users can learn about the requirements different plants have with the displayed data (temperature, humidity, light, etc). Users can add their discoveries to their wishlists.
    -   Link that will enable the user to log out.
-   In the personal profile, the user can upload a profile picture as well as add a small biography. There is a component that displays the current weather conditions in the user's location (by requesting an weather API), and conditionally renders gardening advice based on factors such as temperature and humidity. 


## Technology

-   JavaScript, AWS S3, Node.js, Express.js, PostgreSQL, Socket.IO, React & Redux

## Preview


