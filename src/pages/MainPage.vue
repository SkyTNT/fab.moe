<template lang="html">
  <v-container>
    <v-row>
      <v-col class="col-12 my-2 mb-md-12">
        <v-card>
          <v-carousel v-model="carouselId" hide-delimiters cycle interval="6000" height="10rem">
            <v-carousel-item v-for="(banner,i) in banners" :key="i">
              <effect-view :bg="banner.img">
                <div class="d-flex justify-center align-center" style="width:100%;height:100%">
                  <div class="text-h2">{{banner.word}}</div>
                </div>
              </effect-view>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <div class="text-h5">功能菜单</div>
      </v-col>
      <v-col class="col-sm-6 col-lg-4 col-12" style="display: table-cell;">
        <v-card  @click="openLink('https://fs.fab.moe/')" v-ripple>
          <v-card-title>私有云</v-card-title>
        </v-card>
      </v-col>
      <v-col class="col-sm-6 col-lg-4 col-12" style="display: table-cell;">
        <v-card  @click="openLink('https://blog.fab.moe/')" v-ripple>
          <v-card-title>个人博客</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EffectView from '@/components/EffectView'

export default {
  name: 'MainPage',
  components: {
    EffectView
  },
  methods:{
    openLink(url){
      window.open(url);//不能直接写@click里
    }
  },
  data() {
    return {
      carouselId: 0,
      banners: [//横幅
        {
          img: "/static/img/bg/bg3.jpg",
          word: "fabulous"
        }
      ]
    };
  }
}
</script>

<style lang="css" scoped>

</style>
