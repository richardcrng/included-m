import express from 'express'
import cors from 'cors';
import { Optional } from 'utility-types';
import Course, { CourseRaw } from '../src/models/Course';
import { JSendBase, jsend } from '../src/lib/jsend';
import Lesson from '../src/models/Lesson';
import { GetCourseIdSuccess } from '../src/routes/course/CoursePageRoute';
import { GetLessonIdSuccess } from '../src/routes/lesson/LessonPageRoute';
import Topic from '../src/models/Topic';
import { GetTopicIdSuccess } from '../src/routes/topic/TopicPageRoute';

const app = express()

app.set("port", process.env.PORT || 4000);
app.use(express.json())
// @ts-ignore
app.use(cors())

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



app.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdOrFail(req.params.id)
    const courseRaw = await course.toRawDeep(false)
    jsend<GetCourseIdSuccess>(res, {
      status: 'success',
      data: {
        course: courseRaw
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

app.get('/topics/:id', async (req, res) => {
try {
    const topic = await Topic.findByIdOrFail(req.params.id)
    const topicRaw = await topic.toRawDeep()
    jsend<GetTopicIdSuccess>(res, {
      status: 'success',
      data: {
        topic: topicRaw
      }
    })
  } catch (err) {
    jsend<ResGenericFail>(res.status(404), {
      status: 'fail',
      message: "Couldn't find a lesson with that id",
      data: {
        id: req.params.id
      }
    })
  }
})

app.get('/lessons/:id', async (req, res) => {
try {
    const lesson = await Lesson.findByIdOrFail(req.params.id)
    const lessonRaw = await lesson.toRawDeep()
    jsend<GetLessonIdSuccess>(res, {
      status: 'success',
      data: {
        lesson: lessonRaw
      }
    })
  } catch (err) {
    jsend<ResGenericFail>(res.status(404), {
      status: 'fail',
      message: "Couldn't find a lesson with that id",
      data: {
        id: req.params.id
      }
    })
  }
})

export default app