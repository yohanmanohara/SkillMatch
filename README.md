# SkillMatch Project - Docker Setup

## Overview

This project consists of three main services:

1. **API Gateway** - Handles API requests and routes them to appropriate services.
2. **Main Server** - The backend server responsible for authentication, data management, and integration with MongoDB and Azure.
3. **Client** - The frontend application built with Next.js.

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

```
./
├── api_gateway/            # API Gateway service
├── main_server/            # Main backend server
├── client/                 # Frontend Next.js application
├── docker-compose.yml      # Docker Compose configuration file
└── README.md               # This documentation
```

## Environment Variables

The `docker-compose.yml` file includes essential environment variables:

### Main Server

- `PORT=3002`
- `MONGO_URI=mongodb+srv://Recruitwise:recruitwise@recruitwise.us4pdz2.mongodb.net/`
- `JWT_SECRET=secret`
- `EMAIL=warushayohan80@gmail.com`
- `EMAIL_PASSWORD=wlasedetnswsefnc`
- `AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=skillmatchassests;AccountKey=Mf6KmDSB79WLPy6wV2Xk3TkgxU3Ixpkm/Nt561L1fphpMMKDz/3fiyeFradMZAjg9wLEnx3gE1jv+ASt5Z1o0A==;EndpointSuffix=core.windows.net`
- `AZURE_CONTAINER_NAME=skill`

### Client

- `NEXT_PUBLIC_SERVER_URL=http://localhost:3001`

## Running the Project

1. Clone the repository and navigate to the project directory.
2. Ensure Docker is running.
3. Run the following command to start the services:
   ```sh
   docker-compose up --build
   ```
4. The services will be available at:
   - API Gateway: `http://localhost:3001`
   - Main Server: `http://localhost:3002`
   - Client: `http://localhost:3000`

## Stopping the Project

To stop the services, run:

```sh
docker-compose down
```

## Notes

- The project uses Docker volumes to persist `node_modules` for each service.
- Ensure your `.env` files (if used) are correctly set up before running the containers.
- If you need to rebuild the containers, use:
  ```sh
  docker-compose up --build --force-recreate
  ```

## Troubleshooting

- If any service fails to start, check the logs with:
  ```sh
  docker-compose logs -f <service_name>
  ```
- Ensure that MongoDB credentials and other sensitive data are correctly configured.

## Future Improvements

- Implement a network for better container communication.
- Add health checks to ensure services are running properly.
- Secure sensitive environment variables using a `.env` file (not committed to version control).

---

This README provides an overview of the Dockerized setup for SkillMatch. If you encounter any issues, please refer to the official Docker documentation or seek help from the development team.

