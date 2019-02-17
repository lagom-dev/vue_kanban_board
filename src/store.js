import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {LISTS} from './enum.js';
import {ASYNC_DATA_URL,EMPTY_DESC} from './constants.js';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
    state: {
        items: {
            1: [], //to-do
            2: [], // in progress
            3: [], // done
        },
        backlogItems: [],
        nextItem: 1,
        nextBacklogItem: 1,
        asyncItems:[],
        asyncDataLoaded: false,
        alertText: '',
        alertType: '',
        alertVisible: false,
    },
    mutations: {
        addBoardItem(state, item) {
            state.items[1].unshift(Object.assign(item, { id: state.nextItem }));
            state.nextItem += 1;
        },
        addBacklogItem(state, item) {
            state.backlogItems.unshift(Object.assign(item, { id: state.nextBacklogItem }));
            state.nextBacklogItem += 1;
            //console.log('bl item', item);
            
        },
        updateItems(state, { items, id }) {
            state.items[id] = items;
        },
        updateBacklogItems(state, { items, id }) {
            state.backlogItems = items;
        },
        fetchAsyncItems(state) {
            let request = axios.get(ASYNC_DATA_URL);
            console.log(state);
            return request.then((response)  =>  {
                let responseData = response.data;
                let responseDataLength = responseData.length;
                let parsedResponseData = [];
               for (let index = responseDataLength-1; index > 0; index--) {
                   let asyncItem = responseData[index];
                   asyncItem.id = index;
                   if(!asyncItem.desc) {
                    asyncItem.desc = EMPTY_DESC;
                } 
                parsedResponseData.push(asyncItem);
               }
                    state.items[LISTS.TODO] = parsedResponseData;
                    state.asyncDataLoaded = true;
                    state.nextItem = state.items[LISTS.TODO].length + 1;
                //console.log('response', response);
                }, (error)  =>  {
                    state.asyncDataLoaded = true;
                    console.log(error);
                })
        },
        showAlert(state, {text, type}) {
            state.alertText = text;
            state.alertType = type;
            state.alertVisible = true;
            console.log(text, type);

            setTimeout(()=>{
                state.alertVisible = false;
            }, 3000);
        }

    },

});