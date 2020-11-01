const uniq = require('lodash.uniq');
const path = require('path');
const parser = require('./src/parser');
const keys = require('lodash.keys');

const files = {
  '2020_projects': '20201019_projects.csv',
  '2020_usergroups': '20201019_usergroups.csv',
  '2020_applications': '20201022_applications.csv',
};

const defaultPath = path.join(__dirname, 'data', 'raw');
const projectPath = path.join(defaultPath, files['2020_projects']);
const userGroupPath = path.join(defaultPath, files['2020_usergroups']);
const applicationPath = path.join(defaultPath, files['2020_applications']);

const projectPromise = parser.parse(projectPath);
const userPromise = parser.parse(userGroupPath);
const appPromise = parser.parse(applicationPath);

/**
 * For analysis purposes, it is worth finding out the uniqueness of the fields.
 * Use this function to figure out the unique values of all the application
 * fields.
 *
 * @param {Object} apps - the values from the applicatons csv file
 */
function applicationUniqueness(apps) {
  // Some of these parameters are simple keys and datefields, and do not
  // contain much value in pulling value uniqueness.
  const appKeys = [
    // 'id',
    // 'name',
    'ownerAgencyName',
    'successors',
    'leadingBusinessCapability',
    'businessCriticality',
    'functionalFit',
    'technicalFit',
    // 'lifecycle:plan',
    // 'lifecycle:active',
    // 'lifecycle:endOfLife',
    'timeTag',
    'hostingTypeTag',
    'majorInformationSystemsTag',
  ];

  const appValues = {};
  for (const app of apps) {
    for (const key of appKeys) {
      if (key in appValues == false) {
        appValues[key] = [];
      }
      appValues[key].push(app[key]);
    }
  }
  return [appKeys, appValues];
}

Promise.all([projectPromise, userPromise, appPromise]).then((values) => {
  const projects = values[0];
  const agencies = values[1];
  const apps = values[2];

  const [appKeys, appValues] = applicationUniqueness(apps);
  console.log('Application: unique fields');
  for (const key of appKeys) {
    console.log(key);
    console.log(uniq(appValues[key]));
  }

  // console.log(apps);
  // const ownerAgencyNames = [];
  // for (const app of apps) {
  //   ownerAgencyNames.push(app.businessCriticality);
  // }
  // console.log(uniq(ownerAgencyNames));
});
