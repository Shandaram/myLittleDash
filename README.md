# **System Performance Dashboard**

A responsive and accessible dashboard application that monitors and visualizes system performance metrics in real-time. This project is designed to provide key insights into system health, tracking critical statistics like **CPU load**, **battery status**, and **memory usage**. These metrics are presented through user-friendly widgets, with dark mode available.

## **Features**
- Real-time tracking of system performance metrics.
- Responsive visualizations powered by **Chart.js**.
- Modular architecture with separate **frontend** and **backend** components.
- State management with **Redux Toolkit**.
- Integration with **systeminformation** for accurate system data retrieval.


## **Project Structure**
This project is divided into two main components:

### **1. Frontend**
- A React-based application for visualizing system metrics.
- Designed with accessibility and responsiveness in mind.
- Dependencies include:
  - **React** for building the user interface.
  - **Chart.js** and **react-chartjs-2** for interactive graphs.
  - **Redux Toolkit** and **React-Redux** for state management.
  - **Axios** for API communication.

**Frontend Scripts**:
- `start`: Starts the development server.
- `build`: Builds the application for production.
- `test`: Runs the test suite.


### **2. Backend**
- A lightweight **Node.js** server using **Express**.
- Provides system metrics through APIs powered by **systeminformation**.
- Supports CORS to allow cross-origin requests from the frontend.

**Backend Dependencies**:
- **Express**: Handles server routing and API endpoints.
- **Systeminformation**: Retrieves system performance metrics.
- **CORS**: Enables cross-origin communication.


## **Installation and Usage**

### **Prerequisites**
Ensure the following tools are installed on your system:
- **Node.js** (v16 or later)
- **npm** (v7 or later)

### **Setup**

#### Clone the Repository
```bash
git clone https://github.com/your-username/system-monitor-dashboard.git
cd system-monitor-dashboard
```

#### Install Dependencies

**Frontend**:
```bash
cd frontend
npm install
```

**Backend**:
```bash
cd backend
npm install
```


### **Running the Application**

#### Start the Backend Server
Navigate to the backend folder and start the server:
```bash
cd backend
node server.js
```

The backend server will start on `http://localhost:4000`.

#### Start the Frontend Application
Open a new terminal, navigate to the frontend folder, and start the development server:
```bash
cd frontend
npm start
```

The frontend application will be available at `http://localhost:3000`.

---
