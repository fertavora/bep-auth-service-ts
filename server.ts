import dotenv from 'dotenv'; 
import logger from './utils/logger';
import app from './app'; 

dotenv.config();

const port:any = process.env.PORT || process.env.API_PORT;

app.listen(port, () => {
  logger.info(`Express server is started at port ${port}.`);
});
