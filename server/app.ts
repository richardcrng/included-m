import express from 'express'
import { Optional } from 'utility-types';
import Course from '../src/models/Course';
import { JSendBase, jsend } from '../src/lib/jsend';

const app = express()

app.set("port", process.env.PORT || 4000);
app.use(express.json())


// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

/**
 * An error occurred in processing the request,
 * i.e. an exception was thrown
 */
export type ResGenericError = Optional<JSendBase<{}, 'error'>, 'data'>

/**
 * There was a problem with the data submitted,
 * or some pre-condition of the API call wasn't
 * satisfied
 */
export type ResGenericFail = Optional<JSendBase<{}, 'fail'>, 'data'>

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

export type GetCourseIdSuccess = JSendBase<{ course: Course }, 'success'>

app.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdOrFail(req.params.id)
    jsend<GetCourseIdSuccess>(res, {
      status: 'success',
      data: {
        course
      }
    })
  } catch (err) {
    jsend<ResGenericFail>(res.status(404), {
      status: 'fail',
      message: "Couldn't find a course with that id",
      data: {
        id: req.params.id
      }
    })
  }
})

export default app