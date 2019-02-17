<template>
    <div class="btn-group">
        <button v-on:click="toggleMenu()" type="button" id="dropdownMenuButton" class="btn btn-info btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" v-show="open">
            <a class="dropdown-item" href="#" :key="key" v-for="(value, key) in items"  v-on:click="onItemSelect(key)">
              <i class="fas fa-share-square"></i> {{ listEnum[key] }} <div class="dropdown-divider"></div> 
            </a>
        </div>
    </div>
</template>

<script>
    export default {
            name: 'ButtonGroupDropdown',
            props: ['items', 'changeCallback', 'menuVisible', 'listEnum'],
            data () { 
                return { open: this.menuVisible, }
            },
            methods: {
                toggleMenu : function(){
                    this.open = !this.open;
                },
                onItemSelect: function(_key){
                    this.open = false;
                    this.changeCallback(_key);
                }
            }
    }
</script>



