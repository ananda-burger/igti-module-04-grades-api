import {} from './config/dotenv.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {connect} from './models/index.js';
import controller from './controllers/gradeController.js'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
)

app.get('/', (req, res) => {
  res.send('API em execucao')
})

app.post('/grade', controller.create)
app.get('/grade', controller.findAll)
app.get('/grade/:id', controller.findOne)
app.put('/grade/:id', controller.update)
app.delete('/grade/:id', controller.remove)
app.delete('/grade', controller.removeAll)

connect().then(() => {
  console.log('Connected to MongoDB.')
})

app.listen(process.env.PORT || 8081, () => {});
