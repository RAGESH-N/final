const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs, gridfsBucket;

const connectGridFS = (mongoURI) => {
  const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log('GridFS initialized');
  });
};

const getGridFSBucket = () => {
  if (!gridfsBucket) {
    throw new Error('GridFSBucket is not initialized');
  }
  return gridfsBucket;
};

module.exports = { connectGridFS, getGridFSBucket };