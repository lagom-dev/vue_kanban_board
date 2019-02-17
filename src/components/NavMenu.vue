<template>
    <div class="navMenu">
        <div class="btn-group col-3" role="group" aria-label="Menu bar">
            <router-link to="/board"
            v-bind:class="'btn btn-' + getButtonState('/board')"
            ><i class="fa fa-th"></i> Board</router-link>
            <router-link to="/backlog" v-bind:class="'btn btn-' + getButtonState('/backlog')"><i class="fa fa-list-alt"></i> Backlog</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NavMenu',
        methods: {
            getButtonState(_path) {
                  if(this.$route.path === _path) {
                      return 'success';
                  }
                   return 'secondary';
            }
        }
    };
</script>
