<template>
    <div class="categories">
        <h2>Categories</h2>
        
        <!-- Add/Edit Category Form -->
        <BaseForm v-if="showForm" @submit="handleSubmit">
            <h3>{{ editingCategory ? 'Edit' : 'Add' }} Category</h3>
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
            <div class="form-actions">
                <button type="submit" class="btn">
                    {{ editingCategory ? 'Update' : 'Save' }}
                </button>
                <button type="button" @click="cancelForm" class="btn btn-secondary">
                    Cancel
                </button>
            </div>
        </BaseForm>
        
        <!-- Categories List -->
        <div class="categories-list">
            <button v-if="!showForm" @click="showAddForm" class="btn add-btn">
                Add New Category
            </button>
            
            <div v-for="category in categories" :key="category.id" class="category-card">
                <div class="category-content">
                    <h3>{{ category.name }}</h3>
                    <p>{{ category.description }}</p>
                </div>
                <div class="category-actions">
                    <button @click="editCategory(category)" class="btn btn-secondary">
                        Edit
                    </button>
                    <button @click="deleteCategory(category.id)" class="btn btn-danger">
                        Delete
                    </button>
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
            showForm: false,
            editingCategory: null,
            form: {
                name: '',
                description: ''
            }
        }
    },
    computed: {
        categories() {
            return this.$store.state.categories;
        }
    },
    methods: {
        async handleSubmit() {
            try {
                if (this.editingCategory) {
                    await this.$store.dispatch('updateCategory', {
                        id: this.editingCategory.id,
                        ...this.form
                    });
                } else {
                    await this.$store.dispatch('createCategory', this.form);
                }
                this.cancelForm();
                await this.$store.dispatch('fetchCategories');
            } catch (error) {
                console.error('Failed to save category:', error);
            }
        },
        showAddForm() {
            this.editingCategory = null;
            this.form = { name: '', description: '' };
            this.showForm = true;
        },
        editCategory(category) {
            this.editingCategory = category;
            this.form = { ...category };
            this.showForm = true;
        },
        async deleteCategory(id) {
            if (confirm('Are you sure you want to delete this category?')) {
                try {
                    await this.$store.dispatch('deleteCategory', id);
                    await this.$store.dispatch('fetchCategories');
                } catch (error) {
                    console.error('Failed to delete category:', error);
                }
            }
        },
        cancelForm() {
            this.showForm = false;
            this.editingCategory = null;
            this.form = { name: '', description: '' };
        }
    },
    async created() {
        await this.$store.dispatch('fetchCategories');
    }
}
</script>

<style scoped>
.categories {
    padding: 20px;
}

.category-form {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 15px;
}

.category-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 4px;
}

.category-actions {
    display: flex;
    gap: 10px;
}

.delete-btn {
    background-color: #ff4444;
    color: white;
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

.form-textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
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