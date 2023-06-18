<template>
  <button @click="copyCode" class="copy-button">
    {{ copied ? 'Copied!' : 'Copy' }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      copied: false,
    };
  },
  methods: {
    copyCode() {
      const code = this.$parent.$el.querySelector('code').textContent;
      navigator.clipboard.writeText(code)
        .then(() => {
          this.copied = true;
          setTimeout(() => {
            this.copied = false;
          }, 1000);
        })
        .catch((error) => {
          console.error('Failed to copy code:', error);
        });
    },
  },
};
</script>

<style>
.copy-button {
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  transition: background-color 0.3s;
}

.copy-button:hover {
  background-color: #ddd;
}

.copy-button:active {
  background-color: #bbb;
}

.copy-button:focus {
  outline: none;
}

.copy-button.copied {
  background-color: #aaf0aa;
}
</style>
