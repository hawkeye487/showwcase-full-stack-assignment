import { Request, Response } from 'express'

class IndexController {
  public static getIndex(req: Request, res: Response): void {
    res.send('Hello, API!')
  }
}

export default IndexController
