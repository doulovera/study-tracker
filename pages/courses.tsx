import Head from 'next/head'
import { CourseList } from '../components/courses/CourseList'

export default function Courses () {
  return (
    <>
      <Head>
        <title>Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid place-items-center min-h-[80%]">
        <div className="w-full p-4 bg-slate-600 rounded-xl">
          <h3 className="mt-2 mb-6 text-center text-2xl font-bold">
            Courses
          </h3>
          <CourseList />
        </div>
      </div>
    </>
  )
}
