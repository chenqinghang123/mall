<template>
  <div class="home banxin">
    <!-- 精品推荐 -->
    <section class="recommand">
      <h3>精品推荐</h3>
      <div>
        <ul>
          <GoodListItemView v-for="item in recommads" :key="item.id" :data="item" />
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { getRecommondApi } from '@/api'
import GoodListItemView from './components/GoodListItem.vue'
export default {
  name: 'HomeView',
  components: {
    GoodListItemView
  },
  data() {
    return {
      recommads: []
    }
  },
  created() {
    this.getRecommand();
  },
  methods: {
    getRecommand() {
      getRecommondApi().then(res => {
        if (res.code === 0) {
          this.recommads = res.data.data.records
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.home {

  background-color: rgb(245, 245, 245);

  .recommand {
    ul {
      display: flex;
      justify-content: space-between;
      
    }
  }
}
</style>