const csv = require('fast-csv');
const fs = require('fs');
const isString = require('lodash.isstring');
const { resolve } = require('path');

const e = {};

/**
 * This serves as a general parser for all CSV file and returns a promise.
 *
 * @param {String} filepath - the filepath of the csv file
 *
 * @return {Promise} a promise with the data attached to the resolution.
 */
e.parse = async (filepath) => {
  if (!isString(filepath)) {
    console.error(`No available path to file: ${filepath}`);
    return;
  }

  const data = [];
  return new Promise((resolve) => {
    fs.createReadStream(filepath)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => console.error(error))
      .on('data', (row) => data.push(row))
      .on('end', (rowCount) =>
        console.log(`Parsed ${rowCount} rows in ${filepath}`)
      )
      .on('finish', () => resolve(data));
  });
};

e.sanitizeProjects = (agencies, projects, apps) => {};

e.sanitizeApplications = (agencies, projects, apps) => {};

module.exports = e;
