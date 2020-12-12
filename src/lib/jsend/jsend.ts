import { Response } from "express";

export const jsend = <D = any, S extends JSendStatus = JSendStatus>(res: Response, body: JSendBase<D, S>) => {
  return res.json(body)
}

export type JSendStatus = 'success' | 'error' | 'fail'

export interface JSendBase<D, S extends JSendStatus = JSendStatus> {
  status: S,
  message?: string,
  data: D
}

export default jsend