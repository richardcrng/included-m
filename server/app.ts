import express from 'express'
import Course from '../src/models/Course';
import { JSendBase, jsend } from '../src/lib/jsend/jsend';

const app = express()

app.set("port", process.env.PORT || 4000);
app.use(express.json())


// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

type PostCoursesSuccess = JSendBase<{
  course: Course
}, 'success'>

app.post('/courses', async (req, res) => {
  const course = await Course.createFromRaw(req.body)
  
  jsend<PostCoursesSuccess>(res, {
    status: 'success',
    data: {
      course
    }
  })
})

app.get('/courses', async (req, res) => {
  const courses = await Course.find({})
  res.json({
    data: {
      courses
    }
  })
})

export default app