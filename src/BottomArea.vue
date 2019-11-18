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
.NameInMiddle {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 1.2rem;
}
.mRotate {
  transform: rotate(-6deg);
}

.NameAtBottom {
  font-size: 0.7rem;
  text-align: center;
  line-height: 1em;
  margin-top: 0.5em;
}

.NameContainer {
  min-height: 3rem;
}

.NameContainer .Name {
  font-family: var(--name-font);
  font-size: var(--name-font-size);
  display: flex;
  justify-content: var(--name-flex-justify-content);
  flex-direction: var(--name-flex-direction);
}

.NameContainer .Name2 {
  font-size: 0.7rem;
  font-style: italic;
  display: flex;
  justify-content: var(--name2-flex-justify-content);
  flex-direction: var(--name2-flex-direction);
}

/* foot switch */

.Pusher {
  height: 6rem;
  background-color: var(--footContact);
  border-radius: 0.3rem;
}

.FootSwitchSingle {
  min-height: 4rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.FootSwitchRow {
  min-height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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