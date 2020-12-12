import { setupTestServer } from "fireactive"
import supertest from "supertest"
import { CourseCRUD } from "../src/content/types"
import Course from "../src/models/Course"
import app from "./app"

setupTestServer()

describe('/courses', () => {
  describe('POST', () => {
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

  describe('GET', () => {
    let res: supertest.Response
    let courses: Course[]

    beforeAll(async () => {
      await Course.delete({})
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