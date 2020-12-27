<template>
<v-app>
  <v-app-bar color="primary" dark flat app>
    <v-btn icon v-if="$route.path!='/'" @click="$router.go(-1)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{$route.meta.title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" app right temporary>
    <v-list>
      <v-subheader>设置</v-subheader>
      <v-list-item ripple>
        <v-list-item-action>
          <v-checkbox v-model="bgmToggle"></v-checkbox>
        </v-list-item-action>
        <v-list-item-title>
          BGM开关
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-subheader>其他</v-subheader>
      <v-list-item @click="$router.push('/about')" ripple>
        <v-list-item-title>
          关于
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <v-sheet color="grey lighten-4" height="100%" width="100%">
      <audio ref="bgm" src="/static/audio/bgm1.mp3"></audio>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.path">
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="$route.path">
      </router-view>
    </v-sheet>
  </v-main>
</v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    bgmToggle: { //bgm开关
      get() {
        return this.$store.state.bgm.on; //当在其他地方bgm状态改变时，也能够改变开关状态
      },
      set(val) {
        if (val)
          this.$store.commit("bgmOn");
        else
          this.$store.commit("bgmOff");
      }
    }
  },

  mounted() {
    this.$store.commit("setBgm", this.$refs.bgm); //挂载bgm控件
  }
}
</script>
