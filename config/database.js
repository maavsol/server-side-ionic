const mongoose = require('mongoose');

const dbName = 'pizzapp';
const dbUri = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`;
mongoose.Promise = Promise;

mongoose.connect(dbUri, { useMongoClient: true })
  .then(() => {
    console.log(`Connected to the ${dbUri} database!`);
  })
  .catch(error => console.log(error));