import Head from 'next/head'
import { CourseList } from '../components/courses/CourseList'

export default function Courses () {
  return (
    <>
      <Head>
        <title>Courses</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-10">
        <CourseList />
      </div>
    </>
  )
}
