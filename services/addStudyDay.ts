type StudyDay = {
  course: string,
  hours: string | number,
  databaseId: string
}

export async function addStudyDay ({ databaseId, course, hours }: StudyDay) {
  try {
    const response = await fetch('/api/study', {
      method: 'POST',
      body: JSON.stringify({ course, hours, databaseId })
    })

    const data = await response.json()

    if (!response.ok) throw new Error(data.message)

    return data
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error.message)
  }
}
