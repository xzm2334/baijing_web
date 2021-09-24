<template>
  <el-container class="home">
    <el-header>
      <div>
        <span>百景官网后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>项目信息</span>
            </template>
            <el-menu-item index="/category">项目分类</el-menu-item>
            <el-menu-item index="/project">项目详情</el-menu-item>
            <el-menu-item index="/banner">轮播图</el-menu-item>
          </el-submenu>
          <el-menu-item index="/linkman">
            <i class="el-icon-s-custom"></i>
            <span slot="title">联系人信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="css" scoped>
.home {
  height: 100vh;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>