<template>
    <div class="backlog-view">
        <new-backlog-item></new-backlog-item>

        <div class="card" v-for="item in items" :key="item.id">
            <div class="card-block">
                <h5 class="card-title"><span class="text-muted">#{{item.id}}</span>
                    {{item.desc}}</h5>
            
                <a href="#" class="btn btn-info btn-sm" v-on:click="moveToBoard(item)">
                    <i class="fa fa-share-square"></i> Move to Board
                </a> 
                <a href="#" class="btn btn-info btn-sm" v-on:click="deleteItem(item)">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import AddItemForm from './AddItemForm';
    import {LISTS, ALERT_TYPES} from '../enum.js';

    export default {
        name: 'Backlog',
        components: {
            'new-backlog-item': AddItemForm,
        },
        computed: mapState({
            items: s => [...s.backlogItems]
        }),
        methods: {
           moveToBoard: function(_item){
                let itemToBoard = _item;
                    let leftItems = this.items.filter(function(value, index, arr) {
                        return value.id != itemToBoard.id;
                    });
                this.$store.commit('addBoardItem', 
                    itemToBoard
                );

                this.$store.commit('updateBacklogItems', {
                    items: leftItems,
                });

                this.$store.commit('showAlert', {
                    text: 'Item moved to Board!',
                    type: ALERT_TYPES.SUCCESS,
                });
           },
           deleteItem: function(_item) {
                let itemToRemove = _item;
                let leftItems = this.items.filter(function(value, index, arr) {
                    return value.id != itemToRemove.id;
                });
                this.$store.commit('updateBacklogItems', {
                    items: leftItems,
                });
                 this.$store.commit('showAlert', {
                    text: 'Item Deleted!',
                    type: ALERT_TYPES.SUCCESS,
                });
            },
        },
         mounted(){
                this.$store.commit('showAlert', {
                    text: 'Type in a description and press ENTER',
                    type: ALERT_TYPES.INFO,
                });
            }

    };
    
</script>