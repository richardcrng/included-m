import { setupTestServer } from "fireactive"
import supertest from "supertest"
import { CourseCRUD } from "../src/content/types"
import Activity from "../src/models/Activity"
import Course from "../src/models/Course"
import Lesson from "../src/models/Lesson"
import Topic from "../src/models/Topic"
import app from "./app"

const { db } = setupTestServer()

describe('/courses', () => {
  describe('POST', () => {
    describe('Flat creation', () => {
      let res: supertest.Response
      const data: CourseCRUD = {
        courseTitle: 'My new course',
        description: 'Example course',
        topics: []
      }

      beforeAll(async () => {
        res = await supertest(app).post('/courses').send(data)
      })

      it('is JSend compliant', () => {
        expect(res.body).toMatchObject({
          status: 'success'
        })
      })

      it('follows HTTP conventions', () => {
        expect(res.status).toBe(201)
      })

      it('return the course data', () => {
        expect(res.body.data.course).toBeDefined()
        expect(res.body.data.course._id).toBeDefined()
      })

      it('has created a course', async () => {
        const matchingCourses = await Course.find({ courseTitle: data.courseTitle })
        expect(matchingCourses).toHaveLength(1)
      })
    })

    describe('Deep creation', () => {
      let res: supertest.Response
      const data: CourseCRUD = {
        courseTitle: 'My new course',
        description: 'Example course',
        topics: [
          {
            topicTitle: 'Some topic',
            description: 'Another description',
            chapters: [
              {
                chapterTitle: 'Meow',
                lessons: []
              },
              {
                chapterTitle: 'Ouch',
                lessons: [
                  {
                    lessonTitle: 'wah',
                    activities: [
                      {
                        activityType: 'read',
                        blocks: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }

      beforeAll(async () => {
        await db.ref().set(null)
        res = await supertest(app).post('/courses').send(data)
      })

      it('is JSend compliant', () => {
        expect(res.body).toMatchObject({
          status: 'success'
        })
      })

      it('follows HTTP conventions', () => {
        expect(res.status).toBe(201)
      })

      it('return the course data', () => {
        expect(res.body.data.course).toBeDefined()
        expect(res.body.data.course._id).toBeDefined()
      })

      it('has created a course', async () => {
        const matchingCourses = await Course.find({ courseTitle: data.courseTitle })
        expect(matchingCourses).toHaveLength(1)
      })

      it('has created topics, lessons, chapters and activities', async () => {
        const matchingTopics = await Topic.find({})
        expect(matchingTopics.length).toBeGreaterThanOrEqual(1)
        const matchingLessons = await Lesson.find({})
        expect(matchingLessons.length).toBeGreaterThanOrEqual(1)
        const matchingActivities = await Activity.find({})
        expect(matchingActivities.length).toBeGreaterThanOrEqual(1)
      })
    })
  })

  describe('GET', () => {
    let res: supertest.Response
    let courses: Course[]

    beforeAll(async () => {
      await db.ref().set(null)
      courses = await Course.createMany({
        courseTitle: 'Bananas',
        description: 'About fruit'
      }, {
        courseTitle: 'Tomato',
        description: 'Also fruit'
      })
      res = await supertest(app).get('/courses')
    })

    it('is JSend compliant', () => {
      expect(res.body).toMatchObject({
        status: 'success'
      })
    })

    it('follows HTTP conventions', () => {
      expect(res.status).toBe(200)
    })

    it('return the course data', () => {
      expect(res.body.data.courses).toBeDefined()
      expect(res.body.data.courses).toHaveLength(2)
    })

    it('has found the relevant courses', async () => {
      expect(res.body.data.courses[0]).toHaveProperty('_id', courses[0].getId())
      expect(res.body.data.courses[1]).toHaveProperty('_id', courses[1].getId())
    })
  })

})

describe('/courses/:id', () => {
  describe('GET', () => {
    describe('valid id', () => {
      let res: supertest.Response
      let course: Course

      beforeAll(async () => {
        await db.ref().set(null)
        const courses = await Course.createMany({
          courseTitle: 'Bananas',
          description: 'About fruit'
        }, {
          courseTitle: 'Tomato',
          description: 'Also fruit'
        })

        course = courses[1]
        res = await supertest(app).get(`/courses/${courses[1].getId()}`)
      })

      it('is JSend compliant', () => {
        expect(res.body).toMatchObject({
          status: 'success'
        })
      })

      it('follows HTTP conventions', () => {
        expect(res.status).toBe(200)
      })

      it('return the course data', () => {
        expect(res.body.data.course).toBeDefined()
        expect(res.body.data.course).toHaveProperty('_id', course.getId())
      })

      it('has found the relevant courses', async () => {
        expect(res.body.data.course).toMatchObject({
          courseTitle: course.courseTitle,
          description: course.description
        })
      })

      describe('invalid id', () => {
        let res: supertest.Response
        let course: Course

        const gibberishId = 'gibberishIdHere'

        beforeAll(async () => {
          await db.ref().set(null)
          const courses = await Course.createMany({
            courseTitle: 'Bananas',
            description: 'About fruit'
          }, {
            courseTitle: 'Tomato',
            description: 'Also fruit'
          })

          course = courses[1]
          res = await supertest(app).get(`/courses/${gibberishId}`)
        })

        it('is JSend compliant', () => {
          expect(res.body).toMatchObject({
            status: 'fail'
          })
        })

        it('follows HTTP conventions', () => {
          expect(res.status).toBe(404)
        })

        it('return the dodgy id', () => {
          expect(res.body.data.id).toBe(gibberishId)
        })
      })
    })
  })
})