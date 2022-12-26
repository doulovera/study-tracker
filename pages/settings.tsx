import Head from 'next/head'
import { Card } from '../components/shared/card'
import { Input } from '../components/shared/input'
import { Button } from '../components/shared/button'
import { useLocalStorage } from '../hooks/useLocalStorage'
import React from 'react'

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
        <title>Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-[900px] w-4/5 mt-10 mx-auto">
        <Card title="Settings">
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
        </Card>
      </div>
    </>
  )
}
