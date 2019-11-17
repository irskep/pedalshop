<template>
  <div class="Pedal">
    <div v-html="rawStyle"></div>

    <div class="ThreeSectionStompbox">

        <div class="Controls">
          <div class="StraightRowOfKnobs">
            <div class="Knob"></div>
            <div class="Knob"></div>
            <div class="Knob"></div>
            <div class="Knob"></div>
          </div>
        </div>

        <div class="Ports">
          <div class="Ports__Inner">

            <div class="Left">
              <div class="Outside">
                <div class="Socket"></div>
                <div class="Socket"></div>
              </div>
              <div class="Inside">
                <div class="Row">
                  <div class="LeftArrow"></div>
                  <div class="PortName">Output A</div>
                </div>
                <div class="Row">
                  <div class="LeftArrow"></div>
                  <div class="PortName">Output B</div>
                </div>
              </div>
            </div>

            <div class="Right">
              <div class="Outside">
                <div class="Socket"></div>
                <div class="Socket"></div>
              </div>
              <div class="Inside">
                <div class="Row">
                  <div class="RightArrow"></div>
                  <div class="PortName">Output A</div>
                </div>
                <div class="Row">
                  <div class="RightArrow"></div>
                  <div class="PortName">Output B</div>
                </div>
              </div>
            </div>

          </div>

          <div class="Ports__Outer">
            <div class="Name">
              {{ name }}
            </div>
          </div>
        </div>

        <div class="Pusher">
          <div class="Pusher__Inner">
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>

.Pedal {
  display: flex;
}

.ThreeSectionStompbox {
  width: 10rem;
  background-color: var(--bg);
  color: var(--textOnBg);

  border-radius: 0.3rem;
  padding: 0.4rem;
}

.Controls {
  background-color: var(--bg2);
  padding: 0.4rem;
  border-radius: 0.2rem;
  margin-bottom: 0.4rem;
  min-height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.StraightRowOfKnobs {
  height: 2rem;
  display: flex;
  justify-content: space-around;
}

.Knob {
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  content: " ";
  background-color: var(--knob);
}

.Knob::before {
  position: absolute;
  width: 70%;
  height: 70%;
  left: 15%;
  top: 15%;
  background-color: var(--knob2);
  content: " ";
  border-radius: 100%;
  z-index: 2;
}

.Knob::after {
  position: absolute;
  left: 50%;
  width: 1px;
  height: 1rem;
  background-color: var(--knobTick);
  content: " ";
  z-index: 1;
}

.Ports__Inner {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
}

.Ports .Left .Row {
  display: flex;
  flex-direction: row;
}

.Ports .Right .Row {
  display: flex;
  flex-direction: row-reverse;
}

.PortName, .RightArrow, .LeftArrow {
  display: inline;
}

.LeftArrow::after {
  display: inline;
  content: "←"
}

.RightArrow::after {
  display: inline;
  content: "→"
}

.Name {

}

.Pusher {
  height: 6rem;
  background-color: var(--footContact);
  border-radius: 0.3rem;
}
</style>

<script>
export default {
  props: ['getRandom', 'name'],

  setup() {
    return {
      // colors: {
      //   'bg': '#fc5c65',
      //   'textOnBg': '#d1d8e0',
      //   'footContact': '#4b6584',
      //   'knob': '#3867d6',
      //   'knob2': '#a5b1c2',
      //   'knobTick': '#d1d8e0',
      //   'bg2': '#8854d0',
      //   'textOnBg2': '#ffffff',
      // },
      rawStyle: `
        <style>
          .Pedal {
            --bg: #e84118;
            --textOnBg: #ffffff;
            --footContact: #2f3640;
            --knob: #718093;
            --knob2: #a5b1c2;
            --knobTick: #d1d8e0;
            --bg2: #353b48;
            --textOnBg2: #ffffff;
          }
        </style>
      `
    }
  }
}
</script>