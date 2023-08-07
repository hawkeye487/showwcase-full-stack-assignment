// controllers/educationController.ts
import { Request, Response } from 'express'
import prisma from '../../prisma/client'

export const getAllEducationByUserId = async (req: Request, res: Response) => {
  // * need to change it ! This is a hard coded value
  const userId = 'user_2TblwQTF8yTLK3tGeKqCRcEpCg2' // Retrieve the userId from the request object

  try {
    const education = await prisma.education.findMany({ where: { userId } })

    res.json(education)
  } catch (error) {
    console.error('Error fetching education data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createEducation = async (req: Request, res: Response) => {
  const { school, degree, fieldOfStudy, startDate, endDate, description } = req.body

  // * need to change it ! This is a hard coded value
  const userId = 'user_2TblwQTF8yTLK3tGeKqCRcEpCg2'
  // const userId = req.userId; // Retrieve the userId from the request object

  try {
    const newEducation = await prisma.education.create({
      data: {
        userId, // Set the userId from the logged-in user
        school,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        description
      }
    })

    res.json(newEducation)
  } catch (error) {
    console.error('Error creating education:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
