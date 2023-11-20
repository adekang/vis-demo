import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home/index.vue'
import HelloD3 from '@/views/HelloD3/index.vue'
import HelloEcharts from '@/views/HelloEcharts/index.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/d3',
        name: 'd3',
        component: HelloD3,
    },
    {
        path: '/echarts',
        name: 'echarts',
        component: HelloEcharts,
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
