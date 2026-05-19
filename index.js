import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { checkSchema } from 'express-validator';
import configureDB from './config/db.js';
import usersCtrl from './app/controllers/users-cltr.js';
import { userRegisterSchema, userLoginSchema } from './app/validations/user-validation-schema.js';
import authenticate from './app/middlewares/authentication.js';


const app = express();
const port = 3500;
app.use(express.json());
configureDB();
app.get('/', (req, res) => {
  res.json({
    message: 'Home page',
  });
});

app.post('/register', checkSchema(userRegisterSchema), usersCtrl.register);   
app.post('/login', checkSchema(userLoginSchema), usersCtrl.login);
app.get('/profile', authenticate, usersCtrl.profile);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});