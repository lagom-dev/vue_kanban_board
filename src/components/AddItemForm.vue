<template>
    <div class="add-item col-12 p-0 mt-3">
        <form action="#" method="post" v-on:submit.prevent="submitForm">
            <input type="text" autofocus v-model="desc" placeholder="Start typing..." class="mb-3">
        </form>
    </div>
</template>
<script>
    export default {
        name: 'AddItemForm',
        data() {
            return {
                desc: '',
            };
        },
        methods: {
            submitForm() {
                if (this.desc) {
                    this.$store.commit('addBacklogItem', {
                        desc: this.desc,
                    });
                    this.desc = '';
                } else {
                    this.$store.commit('showAlert', {
                        text: 'Please, fill item description!',
                    });
                }
            }, 
        },
    };
</script>
