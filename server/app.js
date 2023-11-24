import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
const PORT = process.env.PORT || 3030;
app.use('/api', routes);
async function start() {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log(chalk.green(`MongoDB is working`));
		app.listen(PORT, () => {
			console.log(chalk.green(`Server is running on Port ${PORT}...`));
		});
	} catch (error) {
		console.log(chalk.red(error.message));
		process.exit(1);
	}
}

start();
