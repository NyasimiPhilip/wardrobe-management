<template>
    <div class="clothing-items">
        <h2>Clothing Items</h2>
        
        <!-- Add New Item Form -->
        <BaseForm v-if="showAddForm" @submit="handleSubmit">
            <h3>Add New Item</h3>
            <FormInput
                label="Name"
                type="text"
                v-model="form.name"
                required
            />
            <div class="form-group">
                <label>Description:</label>
                <textarea 
                    v-model="form.description"
                    class="form-textarea"
                ></textarea>
            </div>
            <div class="form-group">
                <label>Category:</label>
                <select 
                    v-model="form.category_id"
                    required
                    class="form-select"
                >
                    <option v-for="category in categories" 
                            :key="category.id" 
                            :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn">Save Item</button>
                <button type="button" @click="showAddForm = false" class="btn btn-secondary">
                    Cancel
                </button>
            </div>
        </BaseForm>
        
        <!-- Items List -->
        <div class="items-list">
            <button v-if="!showAddForm" @click="showAddForm = true" class="btn add-btn">
                Add New Item
            </button>
            
            <div v-for="item in clothingItems" :key="item.id" class="item-card">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                <p>Category: {{ getCategoryName(item.category_id) }}</p>
                <div class="item-actions">
                    <button @click="editItem(item)" class="btn btn-secondary">Edit</button>
                    <button @click="deleteItem(item.id)" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
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
            showAddForm: false,
            form: {
                name: '',
                description: '',
                category_id: null
            }
        }
    },
    computed: {
        clothingItems() {
            return this.$store.state.clothingItems;
        },
        categories() {
            return this.$store.state.categories;
        }
    },
    methods: {
        async handleSubmit() {
            try {
                await this.$store.dispatch('createClothingItem', this.form);
                this.showAddForm = false;
                this.resetForm();
            } catch (error) {
                console.error('Failed to create item:', error);
            }
        },
        async deleteItem(id) {
            if (confirm('Are you sure you want to delete this item?')) {
                try {
                    await this.$store.dispatch('deleteClothingItem', id);
                    await this.$store.dispatch('fetchClothingItems');
                } catch (error) {
                    console.error('Failed to delete item:', error);
                }
            }
        },
        getCategoryName(categoryId) {
            const category = this.categories.find(c => c.id === categoryId);
            return category ? category.name : 'Unknown';
        },
        resetForm() {
            this.form = {
                name: '',
                description: '',
                category_id: null
            };
        }
    },
    async created() {
        await Promise.all([
            this.$store.dispatch('fetchClothingItems'),
            this.$store.dispatch('fetchCategories')
        ]);
    }
}
</script>

<style scoped>
.clothing-items {
    padding: 20px;
}

.add-item-form {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 15px;
}

.item-card {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 4px;
}

.item-actions {
    margin-top: 10px;
}

.delete-btn {
    background-color: #ff4444;
    color: white;
    margin-left: 10px;
}

.add-btn {
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    margin-bottom: 20px;
    cursor: pointer;
}

.form-textarea, .form-select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.form-textarea {
    min-height: 100px;
    resize: vertical;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-danger {
    background-color: #ff4444;
    color: white;
}

.form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}
</style> 