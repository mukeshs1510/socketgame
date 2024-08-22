const http = require("http");
const { Server } = require("socket.io");

const env = process.env.ENVIRONMENT || "DEVELOPMENT";

let io;
const startServer = async (app) => {
    try {
        const server = http.createServer(app);

        io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });

        io.on("connection", (socket) => {
            console.log("A client connected", socket.id);

            socket.on("disconnect", () => {
                console.log("Client disconnected", socket.id);
            });
        });

        server.listen(process.env.PORT, () => {
            console.log(`server started on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
        process.exit(1); // Exit the process if server fails to start
    }
};

const getSocketIoInstance = () => {
    if (!io) {
        throw new Error("Socket.io instance has not been initialized.");
    }
    return io;
};

module.exports = { startServer, getSocketIoInstance };
