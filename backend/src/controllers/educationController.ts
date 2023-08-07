import prisma from '../../prisma/client'

export const getAllEducationByUserId = async (req, res) => {
  const userId = req?.auth?.userId

  console.log(req?.auth?.userId)

  try {
    const education = await prisma.education.findMany({ where: { userId: userId } })

    res.json(education)
  } catch (error) {
    console.error('Error fetching education data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createEducation = async (req, res) => {
  const { school, degree, fieldOfStudy, startMonth, startYear, endMonth, endYear, description } = req.body
  const userId = req?.auth?.userId

  try {
    const newEducation = await prisma.education.create({
      data: {
        userId, // Set the userId from the logged-in user
        school,
        degree,
        fieldOfStudy,
        startMonth,
        startYear,
        endMonth,
        endYear,
        description
      }
    })

    res.json(newEducation)
    res.status(200)
  } catch (error) {
    console.error('Error creating education:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteEducation = async (req, res) => {
  const { educationId } = req.params

  const userId = req?.auth?.userId

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

export const updateEducation = async (req, res) => {
  const { educationId } = req.params

  const userId = req?.auth?.userId

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
