<template>
  <div class="BottomArea">

    <div class="NameContainer">
      <div class="Name">
        <div>{{ name }}</div>
      </div>
      <div class="Name2">
        <div>{{ brand }}</div>
      </div>
    </div>

    <div v-if="footConfig === 'Pusher'" class="Pusher">
      <div class="Pusher__Inner"></div>
    </div>

    <div v-if="footConfig === 'OneSwitch'" class="FootSwitchRowSingle">
      <FootSwitch
        v-bind:appearance="footSwitchStyle"
        v-bind:label="pedalWords.switchLabels[0]"></FootSwitch>
    </div>

    <div v-if="footConfig === 'MultiSwitch'" class="FootSwitchRow">
      <FootSwitch
        v-for="n in numFootSwitches"
        v-bind:key="n"
        v-bind:appearance="footSwitchStyle"
        v-bind:label="pedalWords.switchLabels[n - 1]"></FootSwitch>
    </div>
  </div>

</template>

<style scoped>
</style>

<script>
import FootSwitch from './FootSwitch.vue';
export default {
  props: [
    'name',
    'brand',
    'footConfig',
    'footSwitchStyle',
    'numFootSwitches',
    'pedalWords',
  ],

  components: {
    FootSwitch,
  },

  setup() {
    return {

    };
  },
}
</script>