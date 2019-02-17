<template>
    <div class="board">
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-warning text-center " align="center" role="status" v-show="!asyncDataLoaded">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="row">
            <div class="col-4 itemList">
                <list id="1" title="To-Do" :icon="getIcon(1)" v-if="asyncDataLoaded" :items="todoItems"></list>
            </div>
            <div class="col-4 itemList">
                <list id="2" title="In progress" :icon="getIcon(2)" v-if="asyncDataLoaded" :items="inProgressItems"></list>
            </div>
            <div class="col-4 itemList">
                <list id="3" title="Done" :icon="getIcon(3)"  v-if="asyncDataLoaded" :items="doneItems"></list>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import List from './List';
    import ListItem from './ListItem';
    import axios from 'axios';
    import Vue from 'vue';
    import {LISTS, ALERT_TYPES} from '../enum.js';

    export default {
        name: 'Board',
        components: {
            'list': List,
        },
        computed: mapState({
            todoItems: s => s.items[1],
            inProgressItems: s => s.items[2],
            doneItems: s => s.items[3],
            asyncDataLoaded: s => s.asyncDataLoaded,
        }),
         data () {
            return {
                todoIcon: 'smile',
                progressIcon: 'smile',
                doneIcon:  'smile',
            }
        },

        async mounted(){
            if(!this.asyncDataLoaded) {
                await  this.$store.commit('fetchAsyncItems');
                //console.log(this.todoItems);
                /* this.$store.commit('showAlert', {
                    text: 'Board Items Loaded!',
                    type: ALERT_TYPES.SUCCESS,
                });*/
            } 
        },
        methods: {
            getIcon: function (_listName) {
                this.todoIcon = this.todoItems.length ? 'surprise' : 'smile';
                this.progressIcon = this.inProgressItems.length ? 'tired' : 'smile';
                this.progressIcon = this.doneItems.length ? 'smile-wink' : 'smile';

                switch (_listName) {
                    case LISTS.TODO:
                        return this.todoItems.length ? 'surprise' : 'smile';
                    break;
                    case LISTS.IN_PROGRESS:
                        return this.inProgressItems.length ? 'tired' : 'smile';
                    break;
                     case LISTS.DONE:
                        return this.doneItems.length ? 'smile-wink' : 'smile';
                    break;
                    default:
                        return 'smile';
                    break;
                }
            }
        }

    };
</script>
