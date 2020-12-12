import express from 'express'
import Course from '../src/models/Course';

const app = express()

app.set("port", process.env.PORT || 4000);
app.use(express.json())
// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/courses', async (req, res) => {
  const courses = await Course.find({})
  res.json({
    data: {
      courses
    }
  })
})

export default app