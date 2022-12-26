import { CircleNotch } from 'phosphor-react'

type Props = {
  className: string,
  iconSize: number,
}

export default function Loader ({ className, iconSize }: Props) {
  return (
    <div className={`${className} grid place-items-center`}>
      <CircleNotch size={iconSize} className="animate-spin" />
    </div>
  )
}
