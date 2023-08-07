// controllers/userController.ts
import prisma from '../../prisma/client'

export const getUserById = async (req, res) => {
  const userId = req?.auth?.userId
  try {
    const user = await prisma.user.findUnique({ where: { userId } })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Error fetching user data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createUser = async (req, res) => {
  const { name } = req.body
  const userId = req?.auth?.userId

  try {
    // Check if a user with the same userId already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { userId } })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Create a new user entry in the database
    const newUser = await prisma.user.create({
      data: {
        userId,
        name
      }
    })

    res.json(newUser)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
