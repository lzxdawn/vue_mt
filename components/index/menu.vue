<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item,i) in $store.state.home.menu" @mouseenter="enter" :key="i">
        <i :class="item.type"/>{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseleave="detailLeave" @mouseenter="detailEnter">
      <template v-for="(item, i) in curdetail.child">
        <h4>{{item.title}}</h4>
        <span v-for="(v, i) in item.child" :key="v">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind:'',
      menu:[{
        type:'food',
        name:'美食',
        child:[{
          title:'美食',
          child:['代金券','甜点饮品','火锅','自助餐','小吃快餐']
        }]
      },{
        type:'takeout',
        name:'外卖',
        child:[{
          title:'外卖',
          child:['美团外卖']
        }]
      },{
        type:'hotel',
        name:'酒店',
        child:[{
          title:'酒店星级',
          child:['经济型','舒适/三星','高档/四星','豪华/五星']
        }]
      }]
    }
  },
  computed: {
    curdetail() {
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0]
      console.log(this.menu.filter(item.type === this.kind)[0])
    }
  },
  methods: {
    mouseleave() {
      this._timer = setTimeout(_ => {
        this.kind = ''
      }, 150)
    },
    enter(e) {
      this.kind = e.target.querySelector('i').className
    },
    detailLeave() {
      this.kind = ''
    },
    detailEnter() {
      clearTimeout(this._timer)
    }
  }
}
</script>

<style>

</style>