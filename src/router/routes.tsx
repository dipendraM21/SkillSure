/* eslint-disable react-refresh/only-export-components */
import { appRoutes } from '@/lib/utils/routes'
import { Login } from '@/pages/onBoarding/signin/Login'
import { lazy } from 'react'

const LandingPage = lazy(() => import('../pages/landing/LandingPage'))
const Home = lazy(() => import('../pages/Index'))

const Error404 = lazy(() =>
  import('../pages/error/Error404').then((module) => ({
    default: module.Error404,
  })),
)

const routes = [
  {
    path: appRoutes.home,
    element: <LandingPage />,
    layout: 'blank',
  },
  {
    path: appRoutes.dashboard,
    element: <Home />,
    layout: 'default',
  },
  {
    path: appRoutes.login,
    element: <Login />,
    layout: 'blank',
  },
  {
    path: '*',
    element: <Error404 />,
    layout: 'blank',
  },
]

export { routes }
