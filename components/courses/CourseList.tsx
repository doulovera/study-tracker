import { useQuery } from '@tanstack/react-query'
import { ArrowSquareOut } from 'phosphor-react'
import { fetchCourseList as getCourseList } from '../../services/getCoursesList'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export function CourseList () {
  const [coursesDbId] = useLocalStorage('coursesId', '')

  const { data, isFetching } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourseList(coursesDbId, 'all'),
    initialData: { data: [] }
  })

  return (
    <div className="flex flex-col gap-3">
      {
        isFetching
          ? ['', '', ''].map((_, i) => (
            <div key={i} className="flex items-center justify-between h-20 w-full px-4 bg-slate-800 rounded-lg animate-pulse">
            </div>
            ))
          : data.data?.map((course: any) => (
            <div key={course.name} className="flex items-center justify-between h-20 w-full px-4 bg-slate-800 rounded-lg">
              <p className={course.isCompleted ? 'line-through text-gray-400' : ''}>
                {course.name}
                <br /> {/* !! cuidado acá */}
                {course.createdAt}
              </p>
              <a href={course.url} className="text-blue-300" target="_blank" rel="noopener noreferrer">
                <ArrowSquareOut size={18} />
              </a>
            </div>
          ))
      }
    </div>
  )
}
