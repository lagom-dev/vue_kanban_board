<template>
    <div class="card">
        <h5 class="card-header"><span>{{title}}</span> <i v-bind:class="'fas fa-' + icon"></i>
            <a href="#" class="btn btn-link btn-sm" v-on:click="moveItems(BACKWARD)">
                <i class="fas fa-angle-double-left"></i>
            </a>
            <a href="#" class="btn btn-link btn-sm" v-on:click="moveItems(FORWARD)">
                <i class="fas fa-angle-double-right"></i>
            </a>
        </h5>
        <div class="card-body">
            <draggable v-model="draggables" :options="{ group: 'default', handle:'.card-title' }" >
                <div v-for="item in items" :key="item.id" v-if="item.desc" class="itemContainer" >
                    <item :item="item" :items="items" :listId="id"></item>
                </div>
            </draggable>
        </div>
        <div class="card-footer">
            {{itemCount}}
        </div>
    </div>
</template>
<script>
    import Draggable from 'vuedraggable';
    import ListItem from './ListItem';
    import {FORWARD, BACKWARD} from '../constants.js';
    import {LISTS, ALERT_TYPES} from '../enum.js';

    export default {
        name: 'List',
        props: ['items', 'title', 'id', 'icon'],
        data() {
            return {
                FORWARD: FORWARD,
                BACKWARD: BACKWARD,
            }
        },
        components: {
            item: ListItem,
            draggable: Draggable
        },
        computed: {
            itemCount() {
                if (!this.items) return '';
                if (this.items.length === 1) return '1 task';
                return `${this.items.length} tasks`;
            },
            draggables: {
                get() {
                    return this.items;
                },
                set(items) {
                    this.$store.commit('updateItems', {
                        items,
                        id: parseInt(this.id)
                    });
                     this.$store.commit('showAlert', {
                        text: 'Item Moved!',
                        type: ALERT_TYPES.SUCCESS,
                    });
                },
            }
        },
        methods: {
            moveItems: function (_direction) {
                let numberOfLists = Object.keys(this.$store.state.items).length;
                let destLane = (_direction === FORWARD ? (parseInt(this.id) + 1) : (parseInt(this.id) - 1));
                destLane = destLane > numberOfLists ? 1 : destLane;
                destLane = destLane < 1 ? numberOfLists : destLane;
                let destLaneItems = this.$store.state.items[destLane];
                let origLaneItems = this.items;
                this.$store.commit('updateItems', {
                    items: [],
                    id: this.id,
                });
                this.$store.commit('updateItems', {
                    items: destLaneItems.concat(origLaneItems),
                    id: destLane,
                });
                this.$store.commit('showAlert', {
                    text: 'Items Moved!',
                    type: ALERT_TYPES.SUCCESS,
                });
               // console.log(this.items);
            },

        },
        mounted(){
           // console.log(this.items);
        }
    };
</script>
<style>
    .card-body > * {
        min-height: 50px;
    }
</style>