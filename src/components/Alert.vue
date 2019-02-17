<template>
    <div class="alert" v-bind:class="'alert-' + type" role="alert"  v-show="visible">
        {{ text }}
    </div>
</template>

<script>
    export default {
            name: 'Alert',
            props: ['type', 'visible', 'text'],
           
    }
</script>
