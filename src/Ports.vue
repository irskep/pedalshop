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

      <div class="Ports__Inner__Name">
        <div class="Name">
          <div>{{ name }}</div>
        </div>
        <div class="Name2">
          <div>{{ brand }}</div>
        </div>
      </div>
  </div>
</template>

<style>
.Ports {
  font-size: 0.7rem;
  position: relative;

  --socketWidth: 0.3rem;
}

.Ports__Inner__ActualPorts {
  display: flex;
  justify-content: space-between;
}

.Left .Row {
  position: relative;
  display: flex;
  flex-direction: row;
}

.Right .Row {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
}

.Left .Outside {
  position: absolute;
  top: -1rem;
  right: calc(100% + 0.4rem);
  margin-right: var(--socketWidth);
  width: 0;
  overflow: visible;
}

.Right .Outside {
  position: absolute;
  top: -1rem;
  left: 100%;
  margin-left: var(--outsidePadding);
  width: 0;
  overflow: visible;
}

.Left .Socket {
  margin-left: calc(var(--socketWidth) * -1);
}

.Socket {
  width: var(--socketWidth);
  height: 2rem;
  background-color: #2f3640;
  margin-bottom: 0.5rem;
}

.PortName {
  line-height: 1em;
  margin-bottom: 0.3rem;
}

.Left .PortName {
  text-align: right;
}

.PortName__Subtitle {
  font-size: 0.5rem;
}

.PortName, .RightArrow, .LeftArrow {
  display: inline;
}

.RightArrow { margin-left: 0.3rem; }
.LeftArrow { margin-right: 0.3rem; }

.Ports__Inner__Name {
  min-height: 3rem;
}

.Ports__Inner__Name .Name {
  font-family: var(--name-font);
  font-size: var(--name-font-size);
  display: flex;
  justify-content: var(--name-flex-justify-content);
  flex-direction: var(--name-flex-direction);
}

.Ports__Inner__Name .Name2 {
  display: flex;
  justify-content: var(--name2-flex-justify-content);
  flex-direction: var(--name2-flex-direction);
}
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