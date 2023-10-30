import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
import authRouter from './routes/auth-routes.js';
dotenv.config();

mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log('Connected to db');
	})
	.catch((err) => {
		console.log(err);
	});

const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(3000, () => {
	console.log('Server is running on Port 3000');
});
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

app.use('/api/auth', authRouter);
start();
