// index.js - A sample Node.js application using popular dependencies.

// 1. Express (Web Framework)
const express = require('express');
// 2. Axios (HTTP Client)
const axios = require('axios');
// 3. Lodash (Utility Library)
const _ = require('lodash');

const app = express();
const port = 3000;

/**
 * Utility function using Lodash to clean up an array of numbers.
 * @param {Array<number|null|undefined>} list
 * @returns {Array<number>}
 */
function processData(list) {
    // Uses _.compact to remove falsy values (null, undefined, 0, false)
    const compacted = _.compact(list);
    // Uses _.uniq to return only unique values
    return _.uniq(compacted);
}

// Simple route using Express
app.get('/', async (req, res) => {
    let apiData = [];
    try {
        // Use Axios to fetch data from a public API
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        apiData = response.data;

        // Log the cleaned data using the Lodash utility
        const sampleNumbers = [10, 20, 10, null, 30, undefined, 20];
        const cleanedNumbers = processData(sampleNumbers);

        console.log(`[INFO] Cleaned numbers: ${cleanedNumbers.join(', ')}`);

        res.json({
            message: "Node.js application is running successfully!",
            external_data_fetched: apiData.title,
            dependencies_used: ["express", "axios", "lodash"]
        });

    } catch (error) {
        console.error("[ERROR] Failed to fetch data:", error.message);
        res.status(500).send("Error processing request.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`Sample Artifactory App running at http://localhost:${port}`);
    console.log(`Test dependencies by visiting the URL above.`);
    console.log(`======================================================\n`);
});