<template>
  <div class="FootSwitch">
    <div v-if="label.trim() !== '&nbsp;'" class="FootSwitchLabel">{{ label }}</div>
    <div v-if="label.trim() === '&nbsp;'" class="FootSwitchLabel">&nbsp;</div>

    <div class="nested-hexagon-wrapper">

      <div class="hexagon-wrapper gray"><div class="hexagon"></div></div>

      <div class="circle">

    </div>
</template>

<style scoped>
.FootSwitch {
  display: flex;
  align-items: center;
  flex-direction: column;
  --knobSize: 1.8rem;
}

.FootSwitchLabel {
  font-size: 0.5rem;
}

.nested-hexagon-wrapper {
  position: relative;
  --hexSize: 2rem;
  width: var(--hexSize);
  height: var(--hexSize);
}

.hexagon-wrapper {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  text-align: center;
}

.hexagon-wrapper.gray {
  width: var(--hexSize);
  height: var(--hexSize);
}
.hexagon-wrapper.gray .hexagon {
  background-color: #888;
}

.hexagon {
  height: 100%;
  width: calc(100% * 0.57735);
  display: inline-block;
}

.hexagon:before {
  position: absolute;
  top: 0;
  right: calc((100% / 2) - ((100% * 0.57735) / 2));
  background-color: inherit;
  height: inherit;
  width: inherit;
  content: '';
  transform: rotateZ(60deg);
}

.hexagon:after {
  position: absolute;
  top: 0;
  right: calc((100% / 2) - ((100% * 0.57735) / 2));
  background-color: inherit;
  height: inherit;
  width: inherit;
  content: '';
  transform: rotateZ(-60deg);
}

.circle {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  background-color: #ccc;
  border-radius: 50%;
  z-index: 1;
}
</style>

<script>
export default {
  props: [
    'label',
  ],

  setup() {
    return {

    };
  },
}
</script>