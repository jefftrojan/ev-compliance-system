import express, { json } from 'express';
import get from 'axios';
import cors from 'cors';
const app = express();
const port = 3001;

app.use(cors());

app.use(json());

app.get('/getSensorData', async (req, res) => {
  try {
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaTIuYXJkdWluby5jYy9pb3QiLCJhenAiOiJpbm92UDRqQkluWEo3TTBhRGV2eFJpcUFIZ0xyRmRBaCIsImV4cCI6MTY5MDQ0MjI5OCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiaHR0cDovL2FyZHVpbm8uY2MvY2xpZW50X2lkIjoidGVzdGFwaSIsImh0dHA6Ly9hcmR1aW5vLmNjL2lkIjoiNTcxZjZkNzYtOWM2Ni00ZWZiLTkzY2QtMjI4ZTVjMzUwZTBlIiwiaHR0cDovL2FyZHVpbm8uY2MvcmF0ZWxpbWl0IjoxMCwiaHR0cDovL2FyZHVpbm8uY2MvdXNlcm5hbWUiOiJhYmR1bGthcmltMjAyMyIsImlhdCI6MTY5MDQ0MTk5OCwic3ViIjoiaW5vdlA0akJJblhKN00wYURldnhSaXFBSGdMckZkQWhAY2xpZW50cyJ9.yACenM48ylMa7Q5D-ZW2nc8RezlZRXTtbOp5f6XcKos";
    const deviceId = "560f2590-0e64-46cb-ad3a-a9a2bbec0efa";

    const response = await get(`https://api2.arduino.cc/iot/v2/devices/${deviceId}/properties`, {
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    });

    const sensorData = response.data.data;
    res.json(sensorData);
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    res.status(500).json({ error: "Error fetching sensor data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
