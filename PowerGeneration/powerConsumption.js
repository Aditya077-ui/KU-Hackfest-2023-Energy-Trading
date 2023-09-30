function generateNepaliHouseholdPowerData() {
  // Constants for power consumption in Nepal households (in watts)
  const appliances = {
    "LED Bulb": { power: 7 },
    "CFL Bulb": { power: 15 },
    Fan: { power: 60 },
    Television: { power: 50 },
    Refrigerator: { power: 150 },
    "Electric Stove": { power: 1500 },
    // Add more appliances as needed
  };

  // Initialize variables
  const data = [];

  // Simulate power consumption for each hour of the day
  for (let hour = 0; hour < 24; hour++) {
    const powerUsage = {};

    // Simulate power usage for each appliance
    for (const appliance in appliances) {
      const { power } = appliances[appliance];
      const isOn = Math.random() < 0.5; // Randomly decide if the appliance is on or off
      const randomPower = isOn ? power : 0;
      powerUsage[appliance] = randomPower;
    }

    // Add power consumption data point to the array
    data.push({ hour, powerUsage });
  }

  return data;
}

// Example usage
const nepalHouseholdPowerData = generateNepaliHouseholdPowerData();
// console.log(nepalHouseholdPowerData);

function calculateDailyTotalPowerUsage(powerData) {
  let totalPower = 0;

  for (const hourData of powerData) {
    for (const appliance in hourData.powerUsage) {
      totalPower += hourData.powerUsage[appliance];
    }
  }

  return totalPower;
}

// Example usage: Calculate the total power used in a day by the simulated household
const totalPowerUsed = calculateDailyTotalPowerUsage(nepalHouseholdPowerData);
console.log(`Total power used in a day: ${totalPowerUsed} watts`);

function calculateHourlyTotalPowerUsage(powerData) {
  const hourlyTotalPower = [];

  for (let hour = 0; hour < 24; hour++) {
    let totalPower = 0;

    for (const hourData of powerData) {
      if (hourData.hour === hour) {
        for (const appliance in hourData.powerUsage) {
          totalPower += hourData.powerUsage[appliance];
        }
      }
    }

    hourlyTotalPower.push({ hour, totalPower });
  }

  return hourlyTotalPower;
}

// Example usage: Calculate the hourly total power used in a day by the simulated household
const hourlyPowerUsage = calculateHourlyTotalPowerUsage(
  nepalHouseholdPowerData
);
console.log(hourlyPowerUsage);
