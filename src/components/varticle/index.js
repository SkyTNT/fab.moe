import VArticlePaper from './VArticlePaper'
import VSectionTitle from './VSectionTitle'
import VParagraphTitle from './VParagraphTitle'
import VParagraphTable from './VParagraphTable'
import VParagraphImgs from './VParagraphImgs'
import VParagraph from './VParagraph'

export default {
  install(Vue, options) { //注册相关组件
    Vue.component(VArticlePaper.name, VArticlePaper);
    Vue.component(VSectionTitle.name, VSectionTitle);
    Vue.component(VParagraphTitle.name, VParagraphTitle);
    Vue.component(VParagraphTable.name, VParagraphTable);
    Vue.component(VParagraphImgs.name, VParagraphImgs);
    Vue.component(VParagraph.name, VParagraph);
  }
}
