import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

const loadData = match => match
const Routers = [
    {path: '/home', exact: true, component: Home, loadData: loadData},
    {path: '/login', exact: true, component: Login, loadData: loadData},
    {path: '/register', exact: true, component: Register, loadData: loadData}
]

export default Routers