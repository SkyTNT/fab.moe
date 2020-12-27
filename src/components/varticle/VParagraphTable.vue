<template lang="html">
  <v-simple-table>
    <tbody >
      <tr v-for="(items,id1) in processedItems" >
        <template v-for="item in items">
          <td><v-subheader>{{item.n}}</v-subheader></td>
          <td>{{item.v}}</td>
        </template>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  name: "VParagraphTable",
  props: {
    items: String
  },
  computed: {
    aitems() { //把字符串转换成列表
      if (!this.items)
        return [];
      let items = this.items.split("||");
      if ((items.length & 1) == 1)
        items.push("");
      let aitems = []
      for (let i = 0; i < items.length / 2; i++) {
        aitems.push({
          n: items[i * 2],
          v: items[i * 2 + 1]
        });
      }
      return aitems;
    },
    processedItems() { //响应式列表

      let pitems = [];
      for (let id in this.aitems) {
        if (this.$vuetify.breakpoint.width > 800) {
          let id2 = Math.floor(id / 2);
          if ((id & 1) == 0)
            pitems[id2] = [];
          pitems[id2].push(this.aitems[id])
        } else {
          pitems[id] = [this.aitems[id]];
        }
      }
      return pitems;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
