<template>
  <div class="CoverPage">
    <div class="GradientBg">
      <div class="InfinitePedals">
        <Gfx
          v-for="i in 40"
          v-bind:key="i"
          v-bind:seed="i"
          name=" "
          brand=" "
          color="white"
        ></Gfx>
      </div>
      <div class="GradientOverlay">
      </div>

    </div>

    <div class="CoverPageContent">
      <h1>
        <span class="first">Steve’s</span>
        <br><span class="second">Pedal</span> <span class="third">Shop</span>
      </h1>

      <h2>
        Feeding Your Endless Hunger for Sonic Perfection
      </h2>

      <h3>
        LITERALLY INFINITE OPTIONS!
      </h3>
    </div>

    <div class="Badge">
      <h4>Thanks for choosing Steve's Pedal Shop!</h4>
      <p>
        Enjoy this complimentary copy of our catalog, packed with the latest imaginary guitar pedals. Check out our web site, <a href="https://steveasleep.com/pedalshop/">steveasleep.com/pedalshop</a>, for infinitely more options.
      </p>
    </div>
  </div>
</template>

<style>
@media screen {
  .CoverPage { display: none; }
}

.CoverPage {
  width: 210mm;
  height: 296mm;
  position: relative;

  padding: 1rem;

  color: white;
  overflow: hidden;
}

.CoverPageContent {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;

  padding: 1rem;
}

.CoverPage .GradientBg {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: linear-gradient(45deg, #6d0019 0%,#8f0222 86%,#a90329 100%);
}

.CoverPage .GradientOverlay {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: linear-gradient(45deg, #6d0019 0%,rgba(143,2,34, 0.0) 86%,rgba(169,3,41, 0.0) 100%);
  content: " ";
}

.CoverPage h1, .CoverPage h2, .CoverPage h3, .CoverPage h4 {
  font-family: "Cooper Hewitt Heavy";
}

.CoverPage h1 {
  font-size: 9rem;
  /* text-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.4); */
  -webkit-filter: drop-shadow(0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.6));
  margin: 0 0 0 1.6cm;
}

.CoverPage h2 {
  font-size: 2.5rem;
  /* text-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.4); */
  -webkit-filter: drop-shadow(0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.6));
  margin: 1rem 0 0 1.6cm;
}

.CoverPage h3 {
  font-size: 2rem;
  /* text-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.4); */
  -webkit-filter: drop-shadow(0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.6));
  margin: 1rem 0 0 1.6cm;
}

.CoverPage h4 {
  font-size: 2rem;
}

.CoverPage h1 .first {
  color: #f77;
}

.CoverPage .InfinitePedals {
  position: absolute;
  top: 40rem;
  left: 0.8cm;
  right: -0.8cm;
  height: 100%;
  transform-origin: top left;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.CoverPage .InfinitePedals > * {
  flex-shrink: 0;
}

.CoverPage .Badge {
  position: absolute;
  left: 1.6cm;
  bottom: 1.6cm;
  --radius: 15rem;
  width: calc(var(--radius) * 2);
  height: calc(var(--radius) * 2);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15rem;
  color: black;
  text-align: center;
  padding: 0.5cm 0.7cm 0 0.7cm;
  transform: rotate(-10deg);
}

.CoverPage .Badge p {
  font-size: 1.5rem;
  line-height: 1.5em;
}

.CoverPage .PortName__Subtitle, .CoverPage .KnobLabel, .CoverPage .Label, .CoverPage .FootSwitchLabel, .CoverPage .SwitchLabel, .CoverPage .PortName {
  visibility: hidden;
}

@media print {
  .CoverPage .Pedal {
    margin-bottom: 1rem !important;
  }
}

</style>

<script>
import Alea from 'alea';
import Gfx from './Gfx';

export default {
  components: {
    Gfx,
  },

  computed: {
    aleaSavedState: () => new Alea('0').exportState(),
  },
}
</script>