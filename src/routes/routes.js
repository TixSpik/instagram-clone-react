import Home from '../pages/Home/Home'
import User from '../pages/User/User'
import Error404 from '../pages/Home/Error404/Error404'
import LayoutBasic from '../layouts/LayoutBasic'

const routes = [
    { 
        path: '/',
        layout: LayoutBasic,
        component: Home,
        exact: true
    },
    {
        path: '/:username',
        layout: LayoutBasic,
        component: User,
        exact: true
    },
    {
        layout: LayoutBasic,
        component: Error404
    }
]

export default routes