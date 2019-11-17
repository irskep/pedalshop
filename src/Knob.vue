<template>
  <div class="Knob">
    <div class="Knob__Inner">
    </div>
  </div>
</template>

<style>
.Knob {
  position: relative;

  --knobSize: 1.8rem;

  width: var(--knobSize);
  height: calc(var(--knobSize) * 1.11);
  margin: 0 0.3rem;

  content: " ";
  background-color: black;
  border-radius: 1rem;
  box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.66);
}

.Knob::before {
  position: absolute;

  content: " ";

  width: 1.8rem;
  height: 1.8rem;
  border-radius: 1rem;
  content: " ";
  background-color: var(--knob);
  z-index: 1;
}

.Knob::after {
  position: absolute;
  left: calc(50% - 1px);
  top: 0;
  width: 2px;
  height: 0.5rem;
  background-color: var(--knobTick);
  content: " ";
  z-index: 3;
}

.Knob__Inner {
  position: absolute;
  width: 1.6rem;
  height: 1.6rem;
  left: 0.1rem;
  top: 0.1rem;
  background-color: var(--knob2);
  content: " ";
  border-radius: 100%;
  z-index: 2;
}
</style>

<script>
export default {
  props: [
  ],

  setup() {
    return {

    };
  },
}
</script>