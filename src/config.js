import Index from './pages/index'
import Catalog from './pages/catalog'
import Product from './pages/product'
import Basket from './pages/basket'
import User from './pages/user'

const config = {
    routers: [
        { path: '/', component: Index },
        { path: '/catalog', component: Catalog },
        { path: '/product/:id', component: Product },
        { path: '/basket', component: Basket },
        { path: '/user', component: User },
    ]
}

export default config