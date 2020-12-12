import { Response } from "express";

export const jsend = <B extends JSendBase = JSendBase>(
  res: Response,
  body: B
) => {
  return res.json(body)
}

export const jsendData = <D = any, S extends JSendStatus = JSendStatus>(
  res: Response,
  status: S,
  data: D,
  message?: string
) => {
  return res.json({
    status,
    data,
    message
  })
}

export type JSendStatus = 'success' | 'error' | 'fail'

export interface JSendBase<D = any, S extends JSendStatus = JSendStatus> {
  status: S,
  message?: string,
  data: D
}

export default jsend