<template>
  <div class="BottomArea">

    <div v-if="footConfig === 'Pusher'">
      <div class="NameContainer">
        <div class="Name">
          <div>{{ name1 }}</div>
        </div>
        <div class="Name2">
          <div>{{ name2 }}</div>
        </div>
      </div>

      <div class="Pusher">
        <div class="Pusher__Inner"></div>
      </div>
    </div>

    <div v-if="footConfig === 'OneSwitch'" class="FootSwitchRowSingle">
      <div class="NameInMiddle" v-bind:class="{mRotate: shouldRotateLogo}">
        <div>{{ name2 }}</div>
      </div>
      <div v-if="nameIsAboveFootSwitches" class="NameAtBottom" v-bind:class="{mRotate: shouldRotateLogo}">
        <div>{{ name1 }}</div>
      </div>

      <div>
        <FootSwitch
          v-bind:appearance="footSwitchStyle"
          v-bind:label="pedalWords.switchLabels[0]"></FootSwitch>
      </div>

      <div v-if="!nameIsAboveFootSwitches" class="NameAtBottom">
        <div>{{ name1 }}</div>
      </div>
    </div>

    <div v-if="footConfig === 'MultiSwitch'">
      <div class="NameInMiddle" v-bind:class="{mRotate: shouldRotateLogo}">
        <div>{{ name2 }}</div>
      </div>
      <div v-if="nameIsAboveFootSwitches" class="NameAtBottom" v-bind:class="{mRotate: shouldRotateLogo}">
        <div>{{ name1 }}</div>
      </div>

      <div class="FootSwitchRow">
        <FootSwitch
          v-for="n in numFootSwitches"
          v-bind:key="n"
          v-bind:appearance="footSwitchStyle"
          v-bind:label="pedalWords.switchLabels[n - 1]"></FootSwitch>
      </div>
      <div v-if="!nameIsAboveFootSwitches" class="NameAtBottom">
        <div>{{ name1 }}</div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.BottomArea {
  padding: 0 var(--outsidePadding) var(--outsidePadding) var(--outsidePadding);
}

.NameInMiddle {
  margin-top: 0.5em;
  text-align: center;
  font-size: 1.2em;
}
.mRotate {
  transform: rotate(-6deg);
}

.NameAtBottom {
  font-size: 0.7em;
  text-align: center;
  line-height: 1em;
  margin-top: 0.5em;
}

.NameContainer {
  min-height: 3em;
}

.NameContainer .Name {
  font-family: var(--name-font);
  font-size: var(--name-font-size);
  display: flex;
  justify-content: var(--name-flex-justify-content);
  flex-direction: var(--name-flex-direction);
}

.NameContainer .Name2 {
  font-size: 0.7em;
  font-style: italic;
  display: flex;
  justify-content: var(--name2-flex-justify-content);
  flex-direction: var(--name2-flex-direction);
  margin-top: 0.3em;
}

/* foot switch */

.Pusher {
  height: 6em;
  background-color: var(--footContact);
  border-radius: 0.3em;
}

.FootSwitchRow {
  min-height: 4em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.FootSwitchRowSingle .FootSwitch {
  margin-top: 1em;
}
</style>

<script>
import FootSwitch from './FootSwitch.vue';
export default {
  components: {
    FootSwitch,
  },

  props: [
    'name1',
    'name2',
    'footConfig',
    'footSwitchStyle',
    'numFootSwitches',
    'pedalWords',
    'shouldRotateLogo',
    'layoutRandomNumber',
  ],

  computed: {
    nameIsAboveFootSwitches: function() {
      return this.$props.layoutRandomNumber > 0.5;
    },
  },

  setup() {
    return {

    };
  },
}
</script>