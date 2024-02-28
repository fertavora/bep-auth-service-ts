import express from 'express';
import { register, login, healthcheck, data } from './routers';

const api:express.Router = express.Router();

api.use(register.default);
api.use(login.default);
api.use(healthcheck.default);
api.use(data.default);

export default api;