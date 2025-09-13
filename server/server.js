import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db/connection.js';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors({
  origin: ['https://tarotegnima-3uxx2g766-aimnguson105-gmailcoms-projects.vercel.app','http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});