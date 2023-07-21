import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './complianceSystem.css';

const EnvironmentalComplianceSystem = () => {
  const [sensorData, setSensorData] = useState({
    airQuality: '--',
    co2Emission: '--',
    humidity: '--',
    temperature: '--',
    noiseLevel: '--',
  });
  const [complianceScale, setComplianceScale] = useState('--');
  const [colorProfile, setColorProfile] = useState('--');

  const fetchSensorData = async () => {
    try {
      const authToken = "YOUR_API_AUTH_TOKEN"; // Replace with your Arduino Cloud API token
      const deviceId = "YOUR_DEVICE_ID"; // Replace with your Arduino IoT device ID

      const response = await axios.get(`https://api2.arduino.cc/iot/v2/devices/${deviceId}/properties`, {
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      });

      const sensorData = response.data.data;
      setSensorData(sensorData);
      calculateComplianceScale(sensorData.air_quality, sensorData.co2_emission, sensorData.humidity, sensorData.noise_level);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const calculateComplianceScale = (airQuality, co2Emission, humidity, noiseLevel) => {
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
  };

  return (
    <div className="container">
      <h1 className="heading">Environmental Compliance System</h1>
      <div className="card">
        <p>Air Quality (ppm): <span className="value">{sensorData.airQuality}</span></p>
        <p>CO2 Emission (ppm): <span className="value">{sensorData.co2Emission}</span></p>
        <p>Humidity: <span className="value">{sensorData.humidity}</span></p>
        <p>Temperature: <span className="value">{sensorData.temperature}</span></p>
        <p>Noise Level: <span className="value">{sensorData.noiseLevel}</span></p>
      </div>
      <div className="card">
        <p>Compliance Score: <span className="value">{complianceScale}</span></p>
        <p>Color Profile: <span className="value">{colorProfile}</span></p>
      </div>
    </div>
  );
};

export default EnvironmentalComplianceSystem;
