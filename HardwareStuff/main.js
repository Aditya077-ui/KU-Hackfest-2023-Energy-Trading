const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

// Replace with your Arduino's serial port name
const portName = "COM6"; // Use the appropriate port name for your system

const port = new SerialPort(portName, { baudRate: 9600 });

const parser = port.pipe(new Readline({ delimiter: "\n" }));

SerialPort.list().then((ports) => {
  console.log("Available ports:");
  ports.forEach((port) => {
    console.log(port.path);
  });
});

// Open the serial port
port.on("open", () => {
  // Wait for the port to be open before sending commands
  setTimeout(() => {
    // Example commands
    sendCommand("powerToggle homeA 0");
  }, 2000);
});

parser.on("data", (data) => {
  console.log("got word from arduino:", data);
});

// Send a command to the Arduino sketch
function sendCommand(command) {
  console.log("Sending command:", command);
  port.write(command + "\n", (err) => {
    if (err) {
      console.error("Error sending command:", err);
    }
  });
}
