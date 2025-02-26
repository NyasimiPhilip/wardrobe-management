<template>
    <form @submit.prevent="$emit('submit')" class="base-form">
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: 'BaseForm'
}
</script>

<style scoped>
.base-form {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}
</style> 