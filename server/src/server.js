import { createServer } from "http";
import dotenv from "dotenv";
// import connectDB from "./db.js";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const uri = process.env.MONGO_URL;

const server = createServer(app);

// change to the one in ubuntu
async(() => {
  // await connectDB(uri);
  server.listen(PORT, () =>
    console.log(`Listening to port http://localhost:${PORT}`)
  );
})();
