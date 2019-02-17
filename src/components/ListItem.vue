<template>
    <div class="card listItem">
     <button-group-dropdown :items="lists" :changeCallback="changeListCallback" :listEnum="listEnum"></button-group-dropdown>
        <div class="card-block">
            
            <h5 class="card-title">
                <div class="text-muted content-justify-center text-center"><i class="far fa-hand-rock"></i></div>
                <span class="text-muted">#{{item.id}}</span>
                {{item.desc}}
            </h5>
            <a href="#" class="btn btn-info btn-sm" v-on:click="moveToBackLog()">
                    <i class="fa fa-share-square"></i> Move to Backlog
            </a>
            <a href="#" class="btn btn-info btn-sm" v-on:click="deleteItem()">
                <i class="fas fa-trash-alt"></i>
            </a>
           
       </div>
    </div>
</template>

<script>
    import {LISTS, ALERT_TYPES, LIST_IDS} from '../enum.js';
    import { mapState } from 'vuex';
    import ButtonGroupDropdown from '@/components/ButtonGroupDropdown';
    
    export default {
        name: 'TaskLaneItem',
        props: ['item', 'items', 'listId'],
        computed: mapState({
            lists: s => s.items,
        }),
        components: {
            'button-group-dropdown': ButtonGroupDropdown,
        },
       data () {
            return {
                listEnum: LIST_IDS
            }
        },
        methods: {
            moveToBackLog: function() {
                    let itemToBacklog = this.item;
                    let leftItems = this.items.filter(function(value, index, arr) {
                        return value.id != itemToBacklog.id;
                    });
                   
                    this.$store.commit('updateItems', {
                        items: leftItems,
                        id: this.listId,
                    });

                    let  backlogItems = this.$store.state.backlogItems;
                    backlogItems.push(itemToBacklog)
                    this.$store.commit('updateBacklogItems', {
                        items: backlogItems,
                    });

                    this.$store.commit('showAlert', {
                    text: 'Item Moved to Backlog!',
                    type: ALERT_TYPES.SUCCESS,
                });
            },
            deleteItem: function() {
                let itemToRemove = this.item;
                let leftItems = this.items.filter(function(value, index, arr) {
                    return value.id != itemToRemove.id;
                });
                this.$store.commit('updateItems', {
                    items: leftItems,
                    id: this.listId,
                });
                this.$store.commit('showAlert', {
                    text: 'Item Deleted!',
                    type: ALERT_TYPES.SUCCESS,
                });
            },
            changeListCallback: function(_destListId){
                if(_destListId !== this.listId) {
                    let itemToMove = this.item;
                    let leftItems = this.items.filter(function(value, index, arr) {
                        return value.id != itemToMove.id;
                    });
                    
                    this.$store.commit('updateItems', {
                        items: leftItems,
                        id: this.listId,
                    });
                    //console.log('leftItems',leftItems);
                    let destListItems = this.$store.state.items[_destListId];
                    destListItems.push(itemToMove)
                    this.$store.commit('updateItems', {
                        items: destListItems,
                        id: _destListId,
                    });

                    this.$store.commit('showAlert', {
                        text: 'Item Moved!',
                        type: ALERT_TYPES.SUCCESS,
                    });
                } else {
                     this.$store.commit('showAlert', {
                        text: 'Item already in this list!',
                        type: ALERT_TYPES.SUCCESS,
                    });
                }
            }
           
        },
    };
</script>

