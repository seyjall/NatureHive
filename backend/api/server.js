import { app } from '../app.js';
import connectDB from '../src/db/index.js'; 
import mongoose from 'mongoose';
import serverless from 'serverless-http';

let cachedServer;

export default async function handler(req, res) {
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }

  if (!cachedServer) {
    cachedServer = serverless(app);
  }

  return cachedServer(req, res);
}
