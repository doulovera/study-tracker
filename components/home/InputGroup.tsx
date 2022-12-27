import { useQuery } from '@tanstack/react-query'
import { fetchCourseList } from '../../services/getCoursesList'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Select } from '../shared/select'

export function InputGroup () {
  const [coursesDbId] = useLocalStorage('coursesId', '')

  const { data, isFetching } = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetchCourseList(coursesDbId, 'uncompleted'),
    initialData: { data: [] }
  })

  const selectors = [
    {
      name: 'course',
      label: 'Curso',
      options: data.data?.map((course: any) => course.name)
    },
    {
      name: 'hours',
      label: 'Horas',
      options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }
  ]

  return (
    <div className={`flex gap-2 flex-col sm:flex-row ${isFetching ? 'opacity-40' : ''}`}>
      {
        selectors.map((selector, index) => (
          <div key={index} className={`${index === 0 ? 'flex-1' : ''}`}>
            <Select {...selector} />
          </div>
        ))
      }
    </div>
  )
}
