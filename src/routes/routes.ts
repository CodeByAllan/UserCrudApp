import express, { Router } from 'express';
import userRouter from './users.routes';

const route = Router();
route.use(express.json());
route.use(userRouter);
export default route;
