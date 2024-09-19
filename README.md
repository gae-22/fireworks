# Fireworks Web Application

This project is a real-time interactive fireworks display web application. Users can launch fireworks by clicking a button, and the display is synchronized across all connected clients using WebSockets.

## Features

-   Real-time fireworks display
-   Synchronized across multiple clients
-   Dockerized for easy deployment

## Technologies Used

-   Node.js
-   Express.js
-   WebSocket (ws)
-   HTML5 Canvas
-   Docker

## Project Structure

```
fireworks/
│
├── server/
│ ├── Dockerfile
│ ├── server.js
│ └── package.json
│
├── client/
│ ├── Dockerfile
│ ├── index.html
│ ├── css/
│ │ └── styles.css
│ └── js/
│ └── fireworks.js
│
├── docker-compose.yml
└── README.md
```

## Setup and Running

### Prerequisites

-   Docker
-   Docker Compose

### Running the Application

1. Clone this repository:

```bash
git clone https://gitlab.mma.club.uec.ac.jp/gae/fireworks.git
cd fireworks
```

2. Build and run the Docker containers:

```bash
docker compose up --build
```

3. Access the application in your web browser at `http://localhost`

## Usage

-   Open the application in multiple browser windows.
-   Click the "Launch Fireworks" button in any window.
-   Observe the fireworks display synchronized across all open windows.

## Development

To modify the application:

1. Make changes to the relevant files in the `client/` or `server/` directories.
2. Rebuild and restart the Docker containers:

```bash
docker compose down
docker compose up --build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
