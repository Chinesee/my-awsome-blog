import Vue from 'vue'
import NsBackTop from '~/components/neos/NsBackTop.vue'
import NsButton from '~/components/neos/NsButton.vue'

const components = { NsBackTop, NsButton }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, NsBackTop)
  Vue.component(name, component)
})
