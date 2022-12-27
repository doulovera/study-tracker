import React from 'react'
import { ArrowSquareOut, SmileyWink } from 'phosphor-react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '../shared/button'
import { InputGroup } from './InputGroup'
import { addStudyDay } from '../../services/addStudyDay'
import { useLocalStorage } from '../../hooks/useLocalStorage'

type FormInputs = {
  course: { value: string };
  hours: { value: string };
}

export function ActionCard () {
  const [calendarDbId] = useLocalStorage('calendarId', '')

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
    <div className="w-full">
      <h3 className="my-8 text-center text-5xl font-bold font-mono">
        {formattedDate}
      </h3>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="p-4 bg-slate-600 rounded-xl">
          <InputGroup />
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
            <div className="text-center">
              <a href="https://doulovera.com/" className="inline-block text-gray-200 underline hover:no-underline" target="_blank" rel="noreferrer">
                <span className="flex justify-center items-center gap-1">
                  Ir a Notion
                  <ArrowSquareOut size={18} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
