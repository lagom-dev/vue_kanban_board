<template>
  <div id="app">
    <alert :text="alertText" :type="alertType" :visible="alertVisible"></alert>
    <div class="row">
    </div>
    <div class="row">
      <div class="col-12">
        <div class="page-header">
          <h3 class="headerTitle mb-3">Kanban Board <small><em> built with </em></small><a href="https://vuejs.org/" target="_blank"><img title="VueJS" alt="VueJS Logo" class="headerLogo" src="./assets/logo.png" /></a></h3>
          <nav-bar></nav-bar>
        </div>
      </div>
    </div>
    
    <router-view/>
     
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/5.8.3/firebase.js"></script>
<script>

</script>
<script>
  import NavMenu from '@/components/NavMenu';
  import Alert from '@/components/Alert';
  import { mapState } from 'vuex';
  import styles from './app.css'

  export default {
    name: 'app',
    components: {
      'nav-bar': NavMenu,
      'alert': Alert
    },
    computed: mapState({
            alertText: s => s.alertText,
            alertType: s => s.alertType,
            alertVisible: s => s.alertVisible,
        }),
  };
</script>
