import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllCoursesList, getCompletedCoursesList, getUncompletedCoursesList } from '../../services/getCoursesList'

const types = ['uncompleted', 'completed', 'all']

export default async function Test (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { databaseId, type } = req.query

    if (!databaseId) return res.status(400).json({ message: 'Missing databaseId' })

    if (!type) return res.status(400).json({ message: 'Missing type' })
    if (!types.includes(type as string)) return res.status(400).json({ message: 'Invalid type' })

    let response

    if (type === 'uncompleted') response = await getUncompletedCoursesList(databaseId as string)
    if (type === 'completed') response = await getCompletedCoursesList(databaseId as string)
    if (type === 'all') response = await getAllCoursesList(databaseId as string)

    res.status(200).json({ data: response })
  } catch (error: Error | any) {
    if (error.code === 'validation_error') return res.status(400).json({ message: error.message })
    res.status(500).json(error)
  }
}
