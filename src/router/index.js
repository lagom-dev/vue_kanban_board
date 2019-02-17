import Vue from 'vue';
import Router from 'vue-router';
import Backlog from '@/components/Backlog';
import Board from '@/components/Board';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/board',
    },
    {
      path: '/backlog',
      component: Backlog,
    },
    {
      path: '/board',
      component: Board,
    },
  ],
});