const fs = require("fs");

const path = require("path");

const userAgentLoggerDB = path.join(__dirname, "../loggerDB.json");

function saveUserAgent(userAgent) {
  let data = [];
  if (fs.existsSync(userAgentLoggerDB)) {
    const raw = fs.readFileSync(userAgentLoggerDB);
    data = JSON.parse(raw);
  }

  data.push(userAgent);
  fs.writeFileSync(userAgentLoggerDB, JSON.stringify(data, null, 2));
}

function getUserAgentGraph() {
  

  function countStringOccurrences(arr) {
    const counts = {}; // Initialize an empty object to store counts

    // Iterate over each string in the array
    arr.forEach((str) => {
      // If the string is already a key in 'counts', increment its value
      // Otherwise, add the string as a new key with a value of 1
      counts[str] = (counts[str] || 0) + 1;
    });

    return counts;
  }

  const raw = fs.readFileSync(userAgentLoggerDB);
  const data = JSON.parse(raw);
  const finalData = data.map((uaString) => {
    // Check if the string contains a space
    if (uaString.includes(" ")) {
      // If it does, split by space and take the last part
      const parts = uaString.split(" ");
      return parts[parts.length - 1]; // or parts.pop();
    } else {
      // If it doesn't contain a space, keep the original string
      return uaString;
    }
  });

  const agentGraph = countStringOccurrences(finalData);

  return agentGraph;
}

module.exports = {
    saveUserAgent,
    getUserAgentGraph
}
