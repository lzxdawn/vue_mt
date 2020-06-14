<template>
  <div class="m-geo">
    <i class="el-icon-location"></i>{{$store.state.geo.position.city || $store.state.geo.position}}
    <nuxt-link to="/changeCity" class="changeCity">切换城市</nuxt-link>
    [武汉 上海 广州]
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>