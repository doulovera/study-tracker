import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IconProps } from 'phosphor-react'

type Props = {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  title: string;
  value: string | React.ReactNode;
  color: `bg-${string}-${number}`;
}

export function InfoCard ({ icon: Icon, title, value, color }: Props) {
  return (
    <article className="flex items-start justify-left gap-2 w-full h-full p-2 bg-slate-900 rounded-xl">
      <div className={`p-3 ${color} rounded-lg`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <h3 className="text-lg font-semibold text-white">{value}</h3>
      </div>
    </article>
  )
}
