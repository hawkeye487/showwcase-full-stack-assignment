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

export const deleteEducation = async (req: Request, res: Response) => {
  const { educationId } = req.params

  // * need to change it ! This is a hard coded value
  const userId = 'user_2TblwQTF8yTLK3tGeKqCRcEpCg2'
  // const userId = req.userId; // Retrieve the userId from the request object

  try {
    // Check if the education row belongs to the user before deleting
    const education = await prisma.education.findFirst({ where: { id: Number(educationId), userId } })

    if (!education) {
      return res.status(404).json({ error: 'Education not found' })
    }

    // Delete the education row
    await prisma.education.delete({ where: { id: Number(educationId) } })

    return res.json({ message: 'Education deleted successfully' })
  } catch (error) {
    console.error('Error deleting education:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateEducation = async (req: Request, res: Response) => {
  const { educationId } = req.params

  // * need to change it ! This is a hard coded value
  const userId = 'user_2TblwQTF8yTLK3tGeKqCRcEpCg2'
  // const userId = req.userId; // Retrieve the userId from the request object

  try {
    // Check if the education row belongs to the user before updating
    const education = await prisma.education.findFirst({ where: { id: Number(educationId), userId } })

    if (!education) {
      return res.status(404).json({ error: 'Education not found' })
    }

    // Update the education row
    const updatedEducation = await prisma.education.update({
      where: { id: Number(educationId) },
      data: req.body // Update with the request body
    })

    return res.json(updatedEducation)
  } catch (error) {
    console.error('Error updating education:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
