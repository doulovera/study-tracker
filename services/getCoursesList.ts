import { queryDatabase } from '../utils/notion'

type Course = { properties: any, url: string, created_time: string }

type Types = 'uncompleted' | 'completed' | 'all'

export const fetchCourseList = async (databaseId: string, type: Types) => {
  try {
    const res = await fetch(`/api/courses?databaseId=${databaseId}&type=${type}`)
    const data = await res.json()
    if (!res.ok) throw new Error(data.message)
    return data
  } catch (error: Error | any) {
    throw new Error(error)
  }
}

// TODO
async function getCoursesList ({ databaseId, filter }: any) {
  const response = await queryDatabase({
    databaseId,
    filter,
    sorts: [
      {
        property: 'Is completed',
        direction: 'ascending'
      }
    ]
  })

  const formatedResponse = response.results.map((entry) => {
    const { properties, url, created_time: createdAt } = entry as Course

    return {
      name: properties.Name.title[0].plain_text,
      url,
      createdAt,
      isCompleted: properties['Is completed'].checkbox
    }
  })

  return formatedResponse
}

export async function getUncompletedCoursesList (databaseId: string) {
  return getCoursesList({
    databaseId,
    filter: {
      property: 'Is completed',
      checkbox: {
        equals: false
      }
    }
  })
}

export async function getCompletedCoursesList (databaseId: string) {
  return getCoursesList({
    databaseId,
    filter: {
      property: 'Is completed',
      checkbox: {
        equals: true
      }
    }
  })
}

export async function getAllCoursesList (databaseId: string) {
  return getCoursesList({
    databaseId,
    filter: undefined
  })
}
