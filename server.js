import app from "./app.js";
import dotenv from "dotenv";

// Load env variables (in case it's not loaded inside app.js)
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
