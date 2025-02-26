<template>
    <div class="login">
        <h2>Login</h2>
        <BaseForm @submit="handleSubmit">
            <FormInput
                label="Email"
                type="email"
                v-model="email"
                required
            />
            <FormInput
                label="Password"
                type="password"
                v-model="password"
                required
            />
            <button type="submit" class="btn">Login</button>
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
            email: '',
            password: ''
        }
    },
    methods: {
        async handleSubmit() {
            try {
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                });
                this.$router.push('/dashboard');
            } catch (error) {
                console.error('Login failed:', error);
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