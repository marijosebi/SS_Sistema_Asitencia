<template>
  <div style="margin-top:100px">
    <h1>AdminSpace HOME</h1>

  </div>
</template>

<script>

export default {
  name: "AdminHome",
  data() {
    return {
    };
  },
  methods: {
    
  },
  created() {
    this.getData();
    // this.getPeriod()
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
  
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

textarea {
  width: 600px;
  height: 200px;
}
</style>
