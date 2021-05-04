<template>
  <div class="home">
    <span @click="showTip">{{ title }}</span>
    <img :src="pic" alt="">
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      title: "主页面",
      pic: require("../images/1.jpg")
    }
  },
  methods: {
    showTip(){
      console.log("123")
    }
  }
}
</script>

<style lang="less" scoped>
@default-color: brown;
img{
  width: 100px;
  height: 100px;
}

.home{
  color: @default-color;
}

.bg{
  width: 200px;
  height: 200px;
  background: url("../images/1.jpg");
  background-size: cover;
}
</style>