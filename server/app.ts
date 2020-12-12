import express from 'express'
import Course from '../src/models/Course';
import { JSendBase, jsend } from '../src/lib/jsend';
import { CourseCRUD } from '../src/content/types';

const app = express()

app.set("port", process.env.PORT || 4000);
app.use(express.json())


// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

export type ResGenericError = JSendBase<{}, 'error'>

export type PostCoursesSuccess = JSendBase<{ course: Course }, 'success'>

app.post('/courses', async (req, res) => {
  try {
    const course = await Course.createFromRaw(req.body)
  
    jsend<PostCoursesSuccess>(res.status(201), {
      status: 'success',
      data: {
        course
      }
    })
  } catch (err) {
    jsend<ResGenericError>(res, {
      status: 'error',
      message: 'Oops',
      data: JSON.stringify(err)
    })
  }
})

export type GetCoursesSuccess = JSendBase<{ courses: Course[] }, 'success'>

app.get('/courses', async (req, res) => {
  const courses = await Course.find({})
  jsend<GetCoursesSuccess>(res, {
    status: 'success',
    data: {
      courses
    }
  })
})

export default app