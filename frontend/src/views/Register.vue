<template>
    <div class="register">
        <h2>Register</h2>
        <BaseForm @submit="handleSubmit">
            <FormInput
                label="Name"
                type="text"
                v-model="form.name"
                required
            />
            <FormInput
                label="Email"
                type="email"
                v-model="form.email"
                required
            />
            <FormInput
                label="Password"
                type="password"
                v-model="form.password"
                required
            />
            <FormInput
                label="Confirm Password"
                type="password"
                v-model="form.password_confirmation"
                required
            />
            <button type="submit" class="btn">Register</button>
        </BaseForm>
    </div>
</template>

<script>
import BaseForm from '@/components/BaseForm.vue'
import FormInput from '@/components/FormInput.vue'

export default {
    components: {
        BaseForm,
        FormInput
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    methods: {
        async handleSubmit() {
            try {
                await this.$store.dispatch('register', this.form);
                this.$router.push('/dashboard');
            } catch (error) {
                console.error('Registration failed:', error);
            }
        }
    }
}
</script>

<style scoped>
.btn {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style> 