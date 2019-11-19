<template>
  <div class="FingerSwitch">
    <div v-if="label.trim() !== '&nbsp;'" class="SwitchLabel">{{ label }}</div>
    <div v-if="label.trim() === '&nbsp;'" class="SwitchLabel">&nbsp;</div>

    <div class="nested-hexagon-wrapper">

      <div class="hexagon-wrapper gray"><div class="hexagon"></div></div>

      <div class="bigcircle">
      <div class="circle">

    </div>
</template>

<style scoped>
@media print {
  .circle, .bigcircle {
    /* box-shadow: none !important; */
    -webkit-print-color-adjust:exact;
    -webkit-filter: opacity(1);
  }
}

.FingerSwitch {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.SwitchLabel {
  font-size: 0.5rem;
}

.nested-hexagon-wrapper {
  position: relative;
  --hexSize: 1.4rem;
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

.bigcircle {
  position: absolute;
  width: 70%;
  height: 70%;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  background-color: #333;
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.33);
}

.circle {
  position: absolute;
  width: 60%;
  height: 60%;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  background-color: #ccc;
  border-radius: 50%;
  z-index: 1;
  transform: translate(-10%, -40%);
  box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.33);
}

.circle::after {
  content: " ";
  position: absolute;
  width: 20%;
  height: 20%;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 50%;
  transform: translate(-40%, -100%);
}

</style>

<script>
export default {
  props: [
    'label',
    'appearance',
  ],

  setup() {
    return {

    };
  },
}
</script>