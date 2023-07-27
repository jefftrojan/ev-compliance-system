import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './complianceSystem.css';

const EnvironmentalComplianceSystem = () => {
  const initialSensorData = {
    airQuality: '--',
    co2Emission: '--',
    humidity: '--',
    temperature: '--',
    noiseLevel: '--',
  };
  const [sensorData, setSensorData] = useState(initialSensorData);
  const [complianceScale, setComplianceScale] = useState('--');
  const [colorProfile, setColorProfile] = useState('--');

  const fetchSensorData = async () => {
    try {
      const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaTIuYXJkdWluby5jYy9pb3QiLCJhenAiOiJpbm92UDRqQkluWEo3TTBhRGV2eFJpcUFIZ0xyRmRBaCIsImV4cCI6MTY5MDQ0MjI5OCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiaHR0cDovL2FyZHVpbm8uY2MvY2xpZW50X2lkIjoidGVzdGFwaSIsImh0dHA6Ly9hcmR1aW5vLmNjL2lkIjoiNTcxZjZkNzYtOWM2Ni00ZWZiLTkzY2QtMjI4ZTVjMzUwZTBlIiwiaHR0cDovL2FyZHVpbm8uY2MvcmF0ZWxpbWl0IjoxMCwiaHR0cDovL2FyZHVpbm8uY2MvdXNlcm5hbWUiOiJhYmR1bGthcmltMjAyMyIsImlhdCI6MTY5MDQ0MTk5OCwic3ViIjoiaW5vdlA0akJJblhKN00wYURldnhSaXFBSGdMckZkQWhAY2xpZW50cyJ9.yACenM48ylMa7Q5D-ZW2nc8RezlZRXTtbOp5f6XcKos";
      const deviceId = "560f2590-0e64-46cb-ad3a-a9a2bbec0efa";

      const response = await axios.get(`http://localhost:3001/getSensorData`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      const sensorData = response.data;
      if (sensorData) {
        setSensorData(sensorData);
        calculateComplianceScale(sensorData.airQuality, sensorData.co2Emission, sensorData.humidity, sensorData.noiseLevel);
      } else {
        console.error("Error fetching sensor data: Received null or undefined response");
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getComplianceRange = (value, ranges) => {
    for (const range of ranges) {
      if (value >= range.min && value <= range.max) {
        return range.scale;
      }
    }
    return 0;
  };

  const calculateComplianceScale = (airQuality, co2Emission, humidity, noiseLevel) => {
    const airQualityRanges = [
      { min: 0, max: 50, scale: 10 },
      { min: 51, max: 100, scale: 8 },
      { min: 101, max: 150, scale: 6 },
      { min: 151, max: 200, scale: 4 },
      { min: 201, max: 300, scale: 2 },
      { min: 301, max: 500, scale: 1 },
    ];

    const co2EmissionRanges = [
      { min: 0, max: 500, scale: 10 },
      { min: 501, max: 1000, scale: 8 },
      { min: 1001, max: 1500, scale: 6 },
      { min: 1501, max: 2000, scale: 4 },
      { min: 2001, max: 5000, scale: 2 },
      { min: 5001, max: 10000, scale: 1 },
    ];

    const humidityRanges = [
      { min: 0, max: 20, scale: 1 },
      { min: 21, max: 40, scale: 2 },
      { min: 41, max: 60, scale: 4 },
      { min: 61, max: 80, scale: 6 },
      { min: 81, max: 100, scale: 8 },
    ];

    const noiseLevelRanges = [
      { min: 0, max: 40, scale: 10 },
      { min: 41, max: 60, scale: 8 },
      { min: 61, max: 70, scale: 6 },
      { min: 71, max: 80, scale: 4 },
      { min: 81, max: 100, scale: 2 },
      { min: 101, max: 150, scale: 1 },
    ];

    // Calculate compliance scale
    const airQualityRange = getComplianceRange(airQuality, airQualityRanges);
    const co2EmissionRange = getComplianceRange(co2Emission, co2EmissionRanges);
    const humidityRange = getComplianceRange(humidity, humidityRanges);
    const noiseLevelRange = getComplianceRange(noiseLevel, noiseLevelRanges);

    const totalRanges = 4;
    const totalComplianceScale = (airQualityRange + co2EmissionRange + humidityRange + noiseLevelRange) / totalRanges;

    setComplianceScale(totalComplianceScale.toFixed(2));

    // Determine color profile based on compliance scale 
    let colorProfile;
    if (totalComplianceScale >= 1 && totalComplianceScale <= 5) {
      colorProfile = "Compliant (Green)";
    } else if (totalComplianceScale >= 6 && totalComplianceScale <= 7) {
      colorProfile = "Moderate Compliant (Blue)";
    } else if (totalComplianceScale >= 8 && totalComplianceScale <= 10) {
      colorProfile = "Non-Compliant (Red)";
    } else {
      colorProfile = "Unknown";
    }

    setColorProfile(colorProfile);
    console.log("Color profile:", colorProfile);
  };

  return (
    <div className="container">
      <h1>Environmental Compliance System</h1>
      <div>
        <p>Air Quality (ppm): {sensorData.airQuality}</p>
        <p>CO2 Emission (ppm): {sensorData.co2Emission}</p>
        <p>Humidity: {sensorData.humidity}</p>
        <p>Temperature: {sensorData.temperature}</p>
        <p>Noise Level: {sensorData.noiseLevel}</p>
      </div>
      <div>
        <hr />
        <p>Compliance Scale: {complianceScale}</p>
        <p>Color Profile: {colorProfile}</p>
      </div>
      <div>
        <hr />
        <p>Compliance Scale Ranges:</p>
        <ul>
          <li>1-5: Compliant (Green)</li>
          <li>6-7: Moderate Compliant (Blue)</li>
          <li>8-10: Non-Compliant (Red)</li>
        </ul>
      </div>
    </div>
  );
};

export default EnvironmentalComplianceSystem;
