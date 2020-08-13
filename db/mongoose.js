const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });

module.exports = mongoose;
