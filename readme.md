# Frontend Application

This document provides instructions for building and running the frontend application using Docker.

## Getting Started

Follow these steps to build and run the frontend application:

### 1. Build the Docker Image

First, build the Docker image for the frontend application with the following command:

```
docker build -t frontend .
```

### 2. Run the Above Docker Image

```
docker run -p 3000:80 frontend
```

# Open http://localhost:3000/ in the browser to see the UI
