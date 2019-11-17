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
}

.Ports__Inner__ActualPorts {
  display: flex;
  justify-content: space-between;
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
  font-size: 1rem;
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