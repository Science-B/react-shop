import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
import routes from './routes/index.js';
dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/api', routes);

async function start() {
	try {
		await mongoose.connect(process.env.MONGO);
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
