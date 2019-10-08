<template>
  <div style="padding:30px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

       <el-form-item label="内容">
        <el-input v-model="form.content" rows="5" type="textarea" style="resize:none;"></el-input>
      </el-form-item>

       <el-form-item label="栏目">
        <!-- 栏目的数据来自于后台 -->
        <el-checkbox-group v-model="form.categories">
          <!-- allCate所有的栏目 -->
          <el-checkbox 
          v-for="(item, index) in allCate"
          :key="index"
          v-if="item.id !== 999"
          :label="item.id" 
          name="type">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>



    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "", //标题
        content: "", //内容
        categories: [], //
        cover: [],
        type: 1
      },
        // 栏目的列表
      allCate: [],
    };
  },
   mounted(){
    // 请求栏目的数据
    this.$axios({
      url: "/category"
    }).then(res => {
      const {data} = res.data;

      this.allCate = data;
    })
  }
};
</script>

<style>
</style>