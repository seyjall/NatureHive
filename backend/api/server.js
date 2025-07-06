import { app } from '../app.js';
import connectDB from '../src/db/index.js'; 
import mongoose from 'mongoose';
import serverless from 'serverless-http';

const handler = serverless(app);

export default async function(req, res) {
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }
  return handler(req, res);
}
