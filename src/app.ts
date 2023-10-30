import express from 'express';
import route from './routes/routes';
const app = express();
const port = process.env.PORT || 3000;
app.use(route);
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
