import Vue from 'vue'
import NsButton from '@/components/neos/NsButton.vue'

const components = { NsButton }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
