<template>
  <div style="padding:30px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="内容" v-if="form.type === 1">
        <VueEditor :config="config" ref="vueEditor" />
      </el-form-item>

      <el-form-item label="视频" v-if="form.type === 2">
        <el-upload
          :action="`${$axios.defaults.baseURL}/upload`"
          name="file"
          :headers="{
             Authorization: token
          }"
          :on-success="handleVideoSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
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
            name="type"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="封面">
        <!-- action：上传图片的链接
        list-type: 声明当前是上传多张图片
        on-success： 图片上传成功的函数
        on-remove: 移除图片函数-->
        <el-upload
          :action="`${$axios.defaults.baseURL}/upload`"
          name="file"
          :headers="{
             Authorization: token
          }"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        title: "", //标题
        content: "", //内容
        categories: [],
        cover: [],
        type: 1
      },
      // 栏目的列表
      allCate: [],
      token: JSON.parse(localStorage.getItem(`user`) || `{}`).token,

      config: {
        // 上传图片的配置
        uploadImage: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "file",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") || `{}`)
              .token
          },
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data.data.url);
          }
        },

        // 上传视频
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          }
        }
      }
    };
  },
  mounted() {
    // 请求栏目的数据
    this.$axios({
      url: "/category"
    }).then(res => {
      const { data } = res.data;

      this.allCate = data;
    });
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      const { categories } = this.form;
      this.form.categories = [];

      // 给栏目把数字转换成接口需要的对象
      categories.forEach(v => {
        this.form.categories.push({
          id: v
        });
      });

      this.$axios({
        url: "/post",
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user") || `{}`).token
        },
        data: this.form
      }).then(res => {
        console.log(123);
        const { message } = res.data;

        this.$message.success(message);
      });

      if (this.form.type === 1) {
        this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      }
    },

    handleSuccess(res, file) {
      this.form.cover.push({
        id: res.data.id
      });
    },
    //上传视频成功
    handleVideoSuccess(res) {
      // 把视频连接保存到content
      this.form.content = this.$axios.defaults.baseURL + res.data.url;
    },
    // 移除图片时候触发的函数
    handleRemove(file, fileList) {
      const id = file.response.data.id;
      const arr = [];

      this.form.cover.forEach(v => {
        // 从cover中删除掉已经移除的图片
        if (v.id !== id) {
          arr.push(v);
        }
      });

      this.form.cover = arr;
    }
  }
};
</script>

<style>
</style>