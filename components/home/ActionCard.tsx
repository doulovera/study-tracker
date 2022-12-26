import { Card } from '../shared/card'
import { Button } from '../shared/button'
import { Select } from '../shared/select'
import { ArrowSquareOut, SmileyWink } from 'phosphor-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { addStudyDay } from '../../services/addStudyDay'
import React from 'react'
import { fetchCourseList } from '../../services/getCoursesList'
import { useLocalStorage } from '../../hooks/useLocalStorage'

type FormInputs = {
  course: { value: string };
  hours: { value: string };
}

export function ActionCard () {
  const [coursesDbId] = useLocalStorage('coursesId', '')
  const [calendarDbId] = useLocalStorage('calendarId', '')

  const { data, isFetching } = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetchCourseList(coursesDbId, 'uncompleted'),
    initialData: {}
  })

  const currentDate = new Date()

  const formattedDate = new Intl.DateTimeFormat(['es', 'en']).format(currentDate)

  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: addStudyDay
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { course, hours } = event.target as typeof event.target & FormInputs

    mutate({
      course: course.value,
      hours: hours.value,
      databaseId: calendarDbId
    })
  }

  return (
    <div className="max-w-[598px] w-4/5 mt-6">
      <Card title="📝 ¿Has estudiado hoy?">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <h3 className="my-8 text-center text-5xl font-bold font-mono">
            {formattedDate}
          </h3>
          <div>
            {
              isFetching
                ? null
                : (
                <>
                  <Select
                    name="course"
                    label="Curso"
                    options={data.data?.map((course: any) => course.name)}
                  />
                  <Select
                    name="hours"
                    label="Horas"
                    options={['0', '1', '2', '3', '4', '5', '+6']}
                  />
                </>
                  )
            }
          </div>
          <div className="flex flex-col gap-5 mt-6">
            <Button isLoading={isLoading} type="submit">
              <span className="flex justify-center items-center gap-2">
                He estudiado hoy
                <SmileyWink size={20} />
              </span>
            </Button>
            {
              isError && (
                <div className="text-red-500">
                  {(error as Error).message}
                </div>
              )
            }
            <Button outlined>
              <span className="flex justify-center items-center gap-2">
                Ir a Notion
                <ArrowSquareOut size={18} />
              </span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
