<template>
    <div class="form-group">
        <label v-if="label">{{ label }}:</label>
        <input
            v-bind="$attrs"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="form-input"
        >
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        label: String,
        modelValue: String
    }
}
</script>

<style scoped>
.form-group {
    margin-bottom: 15px;
}

.form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style> 