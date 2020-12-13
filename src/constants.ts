export const DEFAULT_COURSE_ID = '-MONxQjuDiExMGzxF7Jy'

export const SERVER_URL = process.env.REACT_APP_SERVER_URL
  || (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? 'http://localhost:4000'
    : 'https://included-m.herokuapp.com/'