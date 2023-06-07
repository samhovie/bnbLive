# bnbLive

Rent out your favorite live performace venue! Inspired by AirBnb, bnbLive is a site dedicated to finding a place for your next event. Browse and interact with venues listed by others, or post your own.

Check it out! [bnbLive](https://aa-project1.onrender.com)

## Technologies Used

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />

## Spots

<img width="1470" alt="Screenshot 2023-06-07 at 4 20 38 PM" src="https://github.com/samhovie/authenticate-me/assets/33816775/6bf4e245-8006-4bf0-98bd-350d40a95bd3">

## Spot Details and Reviews

<img width="1470" alt="Screenshot 2023-06-07 at 4 21 02 PM" src="https://github.com/samhovie/authenticate-me/assets/33816775/3e1560ca-aac1-4de8-a0be-a1a0978cef8b">

## Getting started
1. Clone this repository:

   https://github.com/samhovie/authenticate-me.git
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   * `npm install`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `npx dotenv sequelize db:create`
   * `npx dotenv sequelize db:migrate` 
   * `npx dotenv sequelize db:seed:all`

5. Start the app for both backend and frontend using:

   * `npm start`

6. Now you can use the Demo User or Create an account


# Features 

## Spots
* Users can create a Spot
* Users can read/view other Spot
* Users can update their Spot
* Users can delete their Spot

## Reviews
* Users can create Reviews on Spots
* users can read/view all of the Reviews on a Spot
* Users can delete their Review(s) on a Spot

## Bookings
Logged-in Users can
* Create a booking at a spot
* Update their booking at a spot
* Read all of their bookings
* Delete/Cancel their booking

## Future Features
### Google Maps Api
Logged in Users can
* Locate their spot with Google Maps Api 

## Backend Routes
### Spots
All spots  
```GET /api/spots```  
Spots of current user   
```GET /api/spots/current```  
Spot by id  
```GET /api/spots/:id```  
Create a spot  
```POST /api/spots/```  
Edit a spot  
```PUT /api/spots/:id```  
Delete a spot  
```DELETE /api/spots/:id```  

### Reveiws
Reviews of current user  
```GET /api/reviews/current```  
Reviews by spot id  
```GET /api/spots/:id/reviews```  
Create review  
```POST /api/spots/:id/reviews```  
Edit review  
```PUT /api/spots/:id/reviews```  
Delete review  
```DELETE /api/spots/:id/reviews```  


## Contact Info
https://www.linkedin.com/in/samhovie/
