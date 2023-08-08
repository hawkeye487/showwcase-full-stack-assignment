# Showcase Full Stack Assignment

This repository contains my implementation for the full stack assignment for the Showwcase interview process. The application is a simple educational experience tracker that allows users to add, edit, and delete educational experiences. 


## Features

- User authentication and authorization using Clerk
- Display and manage educational experiences
- Interactive UI for adding, editing, and deleting education entries
- Seamless integration of React Query for data fetching and mutations
- Docker containerization for backend
- All the endpoints are protected
- Deployed to Render
- Autocompleteion feature for university name

## Tech Stack Used

- **Frontend:** React, TypeScript, Styled-Components
- **Backend:** Node, Express, TypeScript
- **Authentication:** Clerk
- **Backend Deployment:** Render
- **Frontend Deployment:** Vercel
- **Database:** Postgress hosted in railwayy.app
- **Backend Containerization:** Docker
- **Data fetching and mutations:** React Query and SWR
- **ORM:** Prisma

## Project Structure
```
showwcase-full-stack-assignment/
  ├── frontend/
  │    
  ├── backend/

```
## Running the project locally


### Frontend

```
cd frontend
```

add following environment variables in .env file
```
VITE_REACT_APP_CLERK_PUBLISHABLE_KEY= YOUR_PUBLISHABLE_KEY

VITE_BACKEND_API_BASE_URL= YOUR_BACKEND_API_BASE_URL

VITE_SHOW_SUGGESTION_API_URL= YOUR_SHOW_SUGGESTION_API_URL
``````

after adding environment variables run following commands
```
npm install
npm run dev
```
Violaaa! your frontend is running on http://localhost:PORT (PORT will be shown in terminal)

### Backend
```
cd backend
```
add following environment variables in .env file
```
DATABASE_URL= YOUR_DATABASE_URL
CLERK_API_KEY= YOUR_CLERK_API_KEY
```
after adding environment variables run following commands
```
docker-compose up
```
Violaaa! your backend is running on http://localhost:3000 

**Note:** There is a another folder named ``proxy-server`` which is used to proxy the API call from the frontend in production. It is used to avoid Mixed Content Error while acessing the http endpoint for showing suggestion of university(autocompleteion feature). You don't need to run it locally. It is already deployed on render. You can check it out [here](https://proxy-server-blxb.onrender.com/api/getUniversity/?name=Harvard)


### Backend API Endpoints

**Note:** All the endpoints are protected. You need to pass authorization token in the header to acess them. You can get the authorization token by logging in to the frontend application.

- GET /education
- POST /education
- PUT /education/:id
- DELETE /education/:id

- GET /user
- POST /user

## Deployment
Frontend is deployed on Vercel and backend is deployed on Render.

Frontend: https://showwcase-full-stack-assignment.vercel.app/

Backend-Base-URL: https://backend-for-showwcase-full-stack.onrender.com/ (you can't acess, you need authorization token to acess it)