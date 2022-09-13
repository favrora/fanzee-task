import Home from './App'

export default [
  {
    path: "/",
    redirect: '/collections/spectacles-women'
  },
  {
    path: '/collections/spectacles-women',
    component: Home
  },
  {
    path: '/collections/spectacles-men',
    component: Home
  },
  {
    path: '/collections/sunglasses-women',
    component: Home
  },
  {
    path: '/collections/sunglasses-men',
    component: Home
  }
]

