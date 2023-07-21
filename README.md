# Environmental Compliance Monitoring System



## Overview

This project aims to enhance compliance with Rwanda's environmental safety policies using robotics, automation, and beaming light communication through smart bulbs. The system utilizes robotics equipped with IoT sensors and Arduino Nano to collect environmental data, including air quality, CO2 emission, humidity, temperature, and noise pollution. The collected data is then processed, analyzed, and transformed into a compliance scale using customized calculations. The compliance scale is sent to the smart bulb as a color profile to visually represent the environmental conditions.

## Features

- Robotics and IoT sensors for data collection
- Customized calculations for generating the compliance scale
- Integration with Arduino IoT Cloud APIs for seamless data transfer
- Web application for data analysis and visualization
- Automated communication with smart bulbs to display the compliance color profile

## Technology Stack

- React.js: A modern JavaScript library for building user interfaces.
- Vite: A fast build tool for web development.
- Node.js: A JavaScript runtime for server-side development.
- Arduino IoT Cloud APIs: For data integration with Arduino Nano IoT board.

## Compliance Scale and Interpretation

The system categorizes environmental parameters into different ranges and assigns numerical values based on compliance. The final compliance scale is obtained by averaging the individual parameter values.

### Air Quality
- Excellent: 001 - 150ppm
- Very Good: 151 - 250ppm
- Good: 251 - 350ppm
- Moderate: 351 - 450ppm
- Unhealthy: 451 - 950ppm
- Danger: 951 & over

### Industrial Pollution (CO2 Emission)
- Excellent: 001 - 150ppm
- Very Good: 151 - 250ppm
- Good: 251 - 350ppm
- Moderate: 351 - 450ppm
- Unhealthy: 451 - 950ppm
- Danger: 951 & over

### Industrial Waste Treatment (Humidity + Temperature)
- Excellent: 001 - 010
- Very Good: 011 - 020
- Good: 021 - 030
- Moderate: 031 - 060
- Poor: 061 - 090
- Danger: 091 - 100

### Noise Pollution
- Excellent: 001 - 030
- Very Good: 031 - 060
- Good: 061 - 090
- Moderate: 091 - 150
- Poor: 151 - 270
- Danger: 271 & over

### Compliance Scale Calculation

The compliance scale is calculated by summing up the values of all parameters and dividing the result by the number of parameters. For example, if Air Quality (AQ) = 7, CO2 Emission = 5, Industrial Waste = 7, and Noise = 10, then the compliance scale would be (7 + 5 + 7 + 10) / 4 = 7.25.

### Color Profile

The compliance scale is used to determine the color profile to be sent to the smart bulb for visualization.

- Compliant: 001 - 005 (Green color profile)
- Moderate Compliant: 006 - 007 (Blue color profile)
- Non-compliant: 008 - 010 (Red color profile)


## Conclusion

This project provides a comprehensive solution for enhancing compliance with environmental safety policies in Rwanda. By using robotics, IoT sensors, and smart bulbs, the system offers real-time monitoring and visualization of environmental conditions. The web or mobile application serves as an intuitive interface for users to access and analyze the compliance scale data. Together, we can contribute to a cleaner and safer environment for everyone. 

# ev-compliance-system
