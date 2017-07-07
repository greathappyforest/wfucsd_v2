import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/ch/Home.vue'
import Lottery from '../components/ch/Lottery.vue'
import Marketplace from '../components/ch/Marketplace.vue'
import Members from '../components/ch/Members.vue'

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