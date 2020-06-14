<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <tab-bar/>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-bar/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tabBar from './topbar'
import searchBar from './searchBar'
export default {
  components: {
    tabBar,
    searchBar
  }
}
</script>

<style lang="scss">
 @import "@/assets/css/public/header/index.scss";
</style>