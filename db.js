var mongoose = require('mongoose');

var url = '';
if (process.env.MONGO_URL) {
  url = process.env.MONGO_URL;
} else {
  url = "mongodb://localhost:27017/typingfrombooks";
}

mongoose.connect(url, {
  useMongoClient: true
});
