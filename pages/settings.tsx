import React from 'react'
import Head from 'next/head'
import { Input } from '../components/shared/input'
import { Button } from '../components/shared/button'
import { useLocalStorage } from '../hooks/useLocalStorage'

type FormInputs = {
  calendarId: { value: string };
  coursesId: { value: string };
}

export default function Settings () {
  const [calendarDbId, setCalendarDbId] = useLocalStorage('calendarId', '')
  const [coursesDbId, setCoursesDbId] = useLocalStorage('coursesId', '')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { calendarId, coursesId } = event.target as typeof event.target & FormInputs

    if (!calendarId.value || !coursesId.value) return alert('Please fill all the fields')

    setCalendarDbId(calendarId.value)
    setCoursesDbId(coursesId.value)
  }

  return (
    <>
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid place-items-center min-h-[80%]">
        <div className="w-4/5 p-4 bg-slate-600 rounded-xl">
          <h3 className="mt-2 mb-6 text-center text-2xl font-bold">
            Settings
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <Input
                label="📅 Calendar Database ID"
                placeholder="Calendar Database ID"
                type="text"
                name="calendarId"
                defaultValue={calendarDbId}
              />
            </div>

            <div className="my-4">
              <Input
                label="👨‍🏫 Courses Database ID"
                placeholder="Courses Database ID"
                type="text"
                name="coursesId"
                defaultValue={coursesDbId}
              />
            </div>
            <Button type='submit'>
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
