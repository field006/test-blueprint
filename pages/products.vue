<template>
  <div>
    <!-- Move the button above the table -->
    <h1 style="height: 1px;">Products List</h1>
    <div class="action-buttons">
      <v-btn color="primary" dark @click="createProduct">Create Product</v-btn>
    </div>
    <v-data-table 
      :headers="headers" 
      :items="products"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editProduct(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteProduct(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- Dialog for creating and editing products -->
    <v-dialog v-model="showDialog" max-width="500" persistent>
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>
        <v-card-text>
          <v-form ref="formRef" @submit.prevent="submitForm" v-model="valid">
            <v-text-field v-model="form.name" :rules="[v => !!v && v.length >= 5 || 'Name must be at least 5 characters']" label="Name"></v-text-field>
            <v-text-field v-model="form.description" :rules="[v => !!v || 'Description cannot be empty']" label="Description"></v-text-field>
            <div class="dialog-buttons">
              <v-btn type="submit" color="primary">{{ submitButtonText }}</v-btn>
              <v-btn color="error" @click="cancelForm">Cancel</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  layout: 'default',
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      products: [],
      showDialog: false,
      form: {
        name: '',
        description: ''
      },
      valid: true,
      editingProduct: null,
      dialogTitle: '',
      submitButtonText: ''
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await this.$axios.get('/products');
        if (response.data && Array.isArray(response.data)) {
          this.products = response.data;
        } else {
          console.error('Invalid response format. Response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    editProduct(product) {
      this.editingProduct = product;
      this.form.name = product.name;
      this.form.description = product.description;
      this.dialogTitle = 'Edit Product';
      this.submitButtonText = 'Update';
      this.showDialog = true;
    },
    deleteProduct(productId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            this.$axios.delete(`/products/${productId}`);
            this.products = this.products.filter(product => product.id !== productId);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            });
          } catch (error) {
            console.error('Error deleting product:', error);
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete the product.',
              icon: 'error'
            });
          }
        }
      });
    },



    async createProduct() {
      this.form.name = '';
      this.form.description = '';
      this.dialogTitle = 'Create New Product';
      this.submitButtonText = 'Create';
      this.showDialog = true;
    },
    async submitForm() {
      const isValid = await this.$refs.formRef.validate();
      if (!isValid) return;

      if (!this.form.name || !this.form.description) {
        // Show an error message if needed
        return;
      }

      try {
        if (this.editingProduct) {
          await this.$axios.put(`/products/${this.editingProduct.id}`, this.form);
        } else {
          await this.$axios.post('/products', this.form);
        }
        
        // Show success message
        Swal.fire({
          //position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        });

        // Close the dialog after successful action
        this.showDialog = false;
        // Refresh the product list
        await this.fetchProducts();
        // Clear the form
        this.form.name = '';
        this.form.description = '';
        // Reset editingProduct
        this.editingProduct = null;
      } catch (error) {
        console.error('Error:', error);
        // Show an error message if needed
      }
    },

    cancelForm() {
      this.$refs.formRef.reset();
      this.showDialog = false;
      this.form.name = '';
      this.form.description = '';
      this.editingProduct = null;
    }
  }
};
</script>
<style>
/* Add any custom styles here */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px; /* Add some margin to separate button from table */
}
.dialog-buttons {
  display: flex;
  justify-content: space-between;
}

  .mt-16 {
    padding: 20px; /* Adjust the padding value as needed */
  }

</style>