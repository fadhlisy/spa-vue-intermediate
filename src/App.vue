<template>
  <div id="app">
    <Kepala/>
    <Konten/>
  </div>
</template>

<script>
import Kepala from './components/Kepala';
import Konten from './components/Konten';

export default {
  name: 'App',
  components: {
    Kepala,
    Konten
  }
}
</script>
