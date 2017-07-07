import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Lottery from '../components/Lottery.vue'
import Marketplace from '../components/Marketplace.vue'
import Members from '../components/Members.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'wfucsd',
            component: Home
        },
        {
            path: '/members',
            name: 'members',
            component: Members
        },
        {
            path: '/lottery',
            name: 'wfucsd lottery',
            component: Lottery
        },
        {
            path: '/Marketplace',
            name: 'wfucsd marketplace',
            component: Marketplace
        }

    ]
})