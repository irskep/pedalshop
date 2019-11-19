<template>
  <div class="Ports">
    <div class="Ports__Inner">

      <div class="Ports__Inner__ActualPorts">

        <div class="Left">
          <div class="Outside">
            <div class="Socket" v-for="(l, i) in outputLabels" v-bind:key="i"></div>
          </div>
          <div class="Inside">
            <div class="Row" v-for="(l, i) in outputLabels" v-bind:key="i">
              <div class="LeftArrow"></div>
              <div class="PortName">
                &larr; {{ l.split('\\n')[0] }}
                <span class="PortName__Subtitle" v-if="l.split('\\n').length > 1">
                  <br>{{ l.split('\\n')[1] }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="Right">
          <div class="Outside">
            <div class="Socket" v-for="(l, i) in inputLabels" v-bind:key="i"></div>
          </div>
          <div class="Inside">
            <div class="Row" v-for="(l, i) in inputLabels" v-bind:key="i">
              <div class="PortName">
                {{ l.split('\\n')[0] }} &larr;
                <span class="PortName__Subtitle" v-if="l.split('\\n').length > 1">
                  <br>{{ l.split('\\n')[1] }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
  </div>
</template>

<style>
.Ports {
  font-size: 0.7em;
  position: relative;

  --socketWidth: 0.3em;
}

.Ports__Inner__ActualPorts {
  display: flex;
  justify-content: space-between;
}

.Left {
  margin-right: 1em;
}

.Left .Inside {
  padding-left: var(--outsidePadding);
}

.Left .Row {
  position: relative;
  display: flex;
  flex-direction: row;
}

.Right .Inside {
  padding-right: var(--outsidePadding);
}

.Right .Row {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
}

.Left .Outside {
  position: absolute;
  top: -1em;
  right: 100%;
  left: calc(var(--socketWidth) * -1);
  overflow: visible;
}

.Right .Outside {
  position: absolute;
  top: -1em;
  left: 100%;
  /* margin-left: 0.6em; */
  /* padding-left: var(--outsidePadding); */
  width: var(--socketWidth);
  overflow: visible;
}

.Socket {
  z-index: -1;
  width: var(--socketWidth);
  height: 2em;
  background-color: #2f3640;
  margin-bottom: 0.5em;
}

.PortName {
  line-height: 1em;
  margin-bottom: 0.3em;
}

.Left .PortName {
  text-align: right;
}

.PortName__Subtitle {
  font-size: 0.5em;
}

.PortName, .RightArrow, .LeftArrow {
  display: inline;
}

.RightArrow { margin-left: 0.3em; }
.LeftArrow { margin-right: 0.3em; }
</style>

<script>

export default {
  props: [
    'name',
    'brand',
    'inputLabels',
    'outputLabels',
  ],
  setup() {
    return {
    };
  }
}
</script>