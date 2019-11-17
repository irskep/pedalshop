<template>
  <div class="Ports">
    <div class="Ports__Inner">

      <div class="Ports__Inner__ActualPorts">

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
              <div class="PortName">Input A</div>
            </div>
            <div class="Row">
              <div class="RightArrow"></div>
              <div class="PortName">Input B</div>
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

<style scoped>
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
  right: calc(100% + var(--outsidePadding) + var(--socketWidth));
  width: 0;
  overflow: visible;
}

.Right .Outside {
  position: absolute;
  top: -1rem;
  left: calc(100% + var(--outsidePadding));
  width: 0;
  overflow: visible;
}

.Left .Socket {
  margin-left: calc(-var(--socketWidth));
}

.Socket {
  width: var(--socketWidth);
  height: 2rem;
  background-color: #2f3640;
  margin-bottom: 0.5rem;
}

.PortName, .RightArrow, .LeftArrow {
  display: inline;
}

.RightArrow { margin-left: 0.3rem; }
.LeftArrow { margin-right: 0.3rem; }

.LeftArrow::after {
  display: inline;
  content: "←";
}

.RightArrow::after {
  display: inline;
  content: "←";
  /* content: "→"; */
}

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
  ],
  setup() {
    return {
    };
  }
}
</script>