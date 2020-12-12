import { setupTestServer } from "fireactive"
import supertest from "supertest"
import { CourseCRUD } from "../src/content/types"
import Course from "../src/models/Course"
import app from "./app"

setupTestServer()

describe('/courses', () => {
  describe('POST /courses', () => {
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
})