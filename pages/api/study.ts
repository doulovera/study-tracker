import type { NextApiRequest, NextApiResponse } from 'next'
import { createEntry } from '../../utils/notion'

export default async function Test (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { course, hours, databaseId } = JSON.parse(req.body) || {}

    if (req.method !== 'POST') return res.status(400).json({ message: 'Invalid method' })

    if (!databaseId || !course || !hours) return res.status(400).json({ message: 'Missing databaseId, course or hours' })

    const response = await createEntry({
      databaseId,
      title: course as string,
      hours: hours as string
    })

    res.status(200).json({ data: response })
  } catch (error: Error | any) {
    if (error.code === 'validation_error') return res.status(400).json({ message: error.message })
    res.status(500).json(error)
  }
}
