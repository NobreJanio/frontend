<template>
  <div class="contact-container">
    <h2>Contato</h2>
    <form @submit.prevent="submitForm">
      <label for="name">Nome:</label>
      <input type="text" v-model="form.name" required />
      
      <label for="email">Email:</label>
      <input type="email" v-model="form.email" required />
      
      <label for="message">Mensagem:</label>
      <textarea v-model="form.message" required></textarea>
      
      <button type="submit" class="submit-btn">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    submitForm() {
      alert(`Mensagem enviada por ${this.form.name}`);
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },
  },
};
</script>

<style scoped>
.contact-container {
  max-width: 500px;
  margin: 50px auto;
  background-color: #f4f4f4;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input, textarea {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: none;
  height: 100px;
}

.submit-btn {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>