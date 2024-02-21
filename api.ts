import express from 'express';
import { register, login, healthcheck } from './routers';

const api:express.Router = express.Router();

api.use(register.default);
api.use(login.default);
api.use(healthcheck.default);

export default api;