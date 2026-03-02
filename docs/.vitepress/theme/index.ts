import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ComponentInHeader from '../../components/ComponentInHeader.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-after': () => h(ComponentInHeader),
    })
  },
}
