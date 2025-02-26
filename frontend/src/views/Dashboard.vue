<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <div class="user-info" v-if="user">
            <h3>Welcome, {{ user.name }}!</h3>
        </div>
        
        <div class="dashboard-sections">
            <div class="section">
                <h2>Your Clothing Items</h2>
                <router-link to="/clothing-items" class="btn">Manage Clothing</router-link>
            </div>
            
            <div class="section">
                <h2>Categories</h2>
                <router-link to="/categories" class="btn">Manage Categories</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    async created() {
        if (!this.user) {
            await this.$store.dispatch('fetchUser');
        }
    }
}
</script>

<style scoped>
.dashboard {
    padding: 20px;
}

.dashboard-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.section {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 10px;
}
</style> 