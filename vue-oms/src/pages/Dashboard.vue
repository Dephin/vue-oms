<template>
  <el-container>
    <el-container>
      <el-aside style="width: 190px;">
        <el-menu class="g-side" router>
          <el-row style="margin-top:30px;">
            <el-col>
              <div class="munu-logo">MENU</div>
            </el-col>
          </el-row>
          <template v-for="(route, index) in menus">
            <template v-if="route.children && dealChildren(route.children).length">
              <el-submenu :key="index" :index="route.name" class="menu-title">
                <template slot="title">
                  <div class="menu-title-cloumn"
                       :class="[{ 'choosed-cloumn' : (breadcrumbs[1] && breadcrumbs[1].name === route.name) }]">
                    <i
                      :class="[{ 'color-4a9bf8' : (breadcrumbs[1] && breadcrumbs[1].name === route.name) }, route.meta.iconName]"></i>
                    <span :class="{ 'color-4a9bf8' : (breadcrumbs[1] && breadcrumbs[1].name === route.name) }">{{route.meta.title||"无名字"}}</span>
                  </div>
                </template>
                <el-menu-item v-for="(cRoute, cIndex) in dealChildren(route.children)" :key="cIndex"
                              :index="cRoute.path" :route="cRoute" class="children-menu">
                  <div class="child-menu-title"><i class="chooed-diamond"
                                                   v-if="breadcrumbs[2] && breadcrumbs[2].name === cRoute.name"></i><span
                    :class="{ 'color-303133' : (breadcrumbs[2] && breadcrumbs[2].name === cRoute.name)  }">{{cRoute.meta.title||"无名字"}}</span>
                  </div>
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :route="route" :index="route.name" class="menu-title dashborad-menu">
                <template slot="title">
                  <div class="menu-title-cloumn" :class="{ 'choosed-cloumn' : activeMenu.name === route.name }">
                    <i :class="[{ 'color-4a9bf8' : activeMenu.name === route.name }, route.meta.iconName]"></i>
                    <span
                      :class="{ 'color-4a9bf8' : activeMenu.name === route.name }">{{route.meta.title||"无名字"}}</span>
                  </div>
                </template>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <template>
          <div style="margin-top: 63px;">
            <router-view></router-view>
          </div>
        </template>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Dashboard",
    data() {
      return {
        user: {name: "aa"},
        menus: [],

      };
    },
    computed: {
      activeMenu: function () {
        return this.$route;
      },
      breadcrumbs: function () {
        return (this.$route && this.$route.matched) || []
      }
    },
    methods: {
      dealChildren: function (children) {
        let childrenMenu = [];
        for (let i in children) {
          if (children[i].meta && !children[i].meta.notRenderMenu) {
            childrenMenu.push(children[i])
          }
        }
        return childrenMenu;
      },
      isChoosed: function (menu) {
        return false;
      }
    },
    created: function () {
      let menus = this.$store.state.common.menuData;
      if (menus) {
        this.menus = menus;
      }
    }
  }
</script>

<style scoped lang="less">
  .g-body {
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
    padding: 110px 20px 0 270px;
  }

  .g-side {
    position: fixed;
    z-index: 90;
    top: 60px;
    left: 0;
    box-sizing: border-box;
    width: 230px;
    height: 100%;
    border-right: 1px solid #dedede;
    overflow-y: auto;
  }

  .dashborad-menu {
    height: 42px;
    line-height: 42px;
  }

  .children-menu {
    background-color: #f2f5fd;
  }

  .munu-logo {
    padding-left: 25px;
    color: rgb(222, 222, 222);
    padding-bottom: 5px;
  }


  .menu-title {
    padding: 0 !important;
    color: #90929a;

    /deep/ .el-submenu__title {
      padding: 0 !important;
      height: 42px;
      line-height: 42px;
      color: #90929a;
    }

    .menu-title-cloumn {
      padding-left: 25px;
      height: 42px;
      line-height: 42px;

      i {
        margin-right: 8px;
      }
    }

    .choosed-cloumn {
      border-left: 3px solid #4a9bf8;
      padding-left: 22px;
    }

    .children-menu {
      padding: 0px 20px !important;
      height: 42px;
      line-height: 42px;
      color: #90929a;

      .child-menu-title {
        position: relative;
        padding-left: 52px;
        border-top: 1px solid #e1e6ec;
      }

      &:first-child {
        .child-menu-title {
          border-top: 0 none;
        }
      }
    }

    .color-303133 {
      color: #303133;
    }

    .chooed-diamond {
      position: absolute;
      top: 19px;
      left: 41px;
      height: 5px;
      width: 5px;
      display: inline-block;
      background-color: #4a9bf8;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
    }
  }
</style>
