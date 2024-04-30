# PubMed Search Application

This application allows users to search for publications on PubMed and view detailed information about them.

## Frontend Server (React)

### Functionalities:
- **Search Bar:** Allows users to input a search query.
- **Results List:** Displays a list of search results obtained from the backend server.
- **Pagination:** Allows users to navigate through multiple pages of search results.
- **Detailed View:** Provides detailed information about a selected search result.

### Usage:
1. Clone the repository.
2. Navigate to the frontend directory (`cd frontend`).
3. Install dependencies with `npm install`.
4. Start the development server with `npm start`.
5. Access the application at `http://localhost:3000`.

## Backend Server (Flask)

### Functionalities:
- **Search Endpoint (`/api/search`):** Accepts POST requests with search queries and returns a list of search results.
- **Details Endpoint (`/api/details`):** Accepts GET requests with IDs of search results and returns detailed information about those results.

### Usage:
1. Navigate to the backend directory (`cd backend`).
2. Start the Flask server with `python app.py`.
3. The server will run on `http://localhost:5000`.

## Technologies Used:
- React
- Flask
- Axios

## Authors:
- Vivek A Dhameliya

## License:
This project is licensed under the [MIT License](LICENSE).
