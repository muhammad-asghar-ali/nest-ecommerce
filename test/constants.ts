import 'dotenv/config';

export const app = `http://localhost:${process.env.PORT}`;
export const database = process.env.MONGO_URI;
