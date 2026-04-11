import IconMenuDashboard from '@/assets/Icon/Menu/IconMenuDashboard'
import { FC } from 'react'
import { IconProps } from '@/types/icon.types'

type MenuSubItem = {
  label: string
  path: string
  target?: string
  subItems?: MenuSubItem[]
}

export const MENU_DATA: {
  label?: string
  items: {
    id: string
    label: string
    icon: FC<IconProps>
    path?: string
    subItems?: MenuSubItem[]
  }[]
}[] = [
  {
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: IconMenuDashboard as FC<IconProps>,
        path: '/',
      },
    ],
  },
]
