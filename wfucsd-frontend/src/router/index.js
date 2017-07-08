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
            path: 'http://172.104.103.251:9000/',
            name: 'wfucsd',
            component: Home
        },
        {
            path: 'http://172.104.103.251:9000/members',
            name: 'members',
            component: Members
        },
        {
            path: 'http://172.104.103.251:9000/lottery',
            name: 'wfucsd lottery',
            component: Lottery
        },
        {
            path: 'http://172.104.103.251:9000/Marketplace',
            name: 'wfucsd marketplace',
            component: Marketplace
        }

    ]
})