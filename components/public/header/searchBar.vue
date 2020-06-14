<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="https://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" 
          placeholder="搜索商家和地点" 
          @input="searchInput"
          @focus="searchFocus"
          @blur="searchBlur"/>
          <button class="el-button el-button-primary"><i class="el-icon-search"></i></button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,i) in $store.state.home.hotPlace.slice(0,4)" :key="i">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item,i) in searchList" :key="i">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#"  v-for="(item, i) in $store.state.home.hotPlace.slice(0,5)" :key="i">
            <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
          </a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund"><p class="txt">随时退</p></i></li>
          <li><i class="single"><p class="txt">不满意</p></i></li>
          <li><i class="overdue"><p class="txt">过期退</p></i></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      isFocus: false,
      search: '',
      hotPlace: [],
      searchList: []
    }
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.search
    },
    isSearchList() {
      return this.isFocus && this.search
    }
  },
  methods: {
    searchFocus() {
      this.isFocus = true
    },
    searchBlur() {
      setTimeout(_ => {
        this.isFocus = false
      },100)
    },
    searchInput: _.debounce(async function() {
      let city = this.$store.state.geo.position.city.replace('市', '')
      this.searchList = []
      const {status, data: {top}} = await this.$axios.get('/search/top',{
        params: {
          input: this.search,
          city: '武汉'
        }
      })
      if (top) {
        this.searchList = top.slice(0, 10)
      }
    },300)
  }
}
</script>

<style>

</style>