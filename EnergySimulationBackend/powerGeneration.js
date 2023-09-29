function generateSolarEnergyData() {
  // Constants for the energy range and total energy goal
  const minTotalEnergy = 1100; // 1.1 kW
  const maxTotalEnergy = 2100; // 2.1 kW

  // Initialize variables
  const data = [];
  let totalEnergy = 0;

  // Simulate a realistic solar energy pattern (bell curve)
  for (let hour = 0; hour < 24; hour++) {
    let solarFactor = 0; // Initialize solar factor to zero by default

    // Solar production only during daylight hours (e.g., 6 AM to 6 PM)
    if (hour >= 6 && hour <= 18) {
      solarFactor = calculateSolarFactor(hour, 0); // Realistic solar factor at the beginning of the hour
    }

    // Generate random variation between -10% to +10%
    const randomVariation = (Math.random() - 0.5) * 0.2;

    // Calculate average energy for this hour
    const averageEnergy = solarFactor * (1000 + 1000 * randomVariation); // Energy in watts

    // Ensure the energy is non-negative
    const finalEnergy = Math.max(0, averageEnergy);

    // Random scaling factor between 1 and 2
    const randomScalingFactor = 1 + Math.random();

    // Scale energy by the random factor
    const scaledEnergy = finalEnergy * randomScalingFactor;

    // Add energy data point to the array
    data.push({ hour, energy: scaledEnergy });

    // Update the total energy produced
    totalEnergy += scaledEnergy;
  }

  // Calculate the scaling factor based on the total energy constraints
  const scalingFactor = (maxTotalEnergy - minTotalEnergy) / totalEnergy;

  // Scale the energy data to meet the total energy constraints
  for (let i = 0; i < data.length; i++) {
    data[i].energy *= scalingFactor;
  }

  return performScaling(data);
}

function performScaling(data) {
  const randomVal = Math.random();
  for (let d of data) {
    d["energy"] += randomVal * d["energy"];
  }
  return data;
}

// Function to calculate the solar factor (adjust this for your specific pattern)
function calculateSolarFactor(hour, minute) {
  // Example: Simple bell curve with peak around noon
  const peakHour = 12;
  const peakWidth = 3;
  const deviation = Math.abs(hour - peakHour) + minute / 60;
  const solarFactor = Math.exp(-(deviation ** 2) / (2 * peakWidth ** 2));
  return solarFactor;
}

// Example usage
const solarData = generateSolarEnergyData();
console.log(solarData);

let sum = 0;
for (let data of solarData) {
  sum += data["energy"];
}
console.log(sum);
