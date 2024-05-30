<script setup>
const input1 = ref('');
</script>

<template>
  <div class="row q-gutter-lg justify-center">
    <div class="col-sm-4 col">
      <div class="column q-gutter-lg">
        <q-form>
          <q-card bordered class="q-pa-lg">
            <div class="column q-gutter-lg">
              <e-textfield :disable="false" bg-color="orange" label="Imports" />

              <e-input v-model="input1" type="number" label="Outlined" />

              <e-input v-model="input1" type="number" label="Outlined" />
            </div>
          </q-card>
        </q-form>
        <e-button label="Execute" />
      </div>
    </div>
    <div class="col-sm-4 col">
      <div class="column q-gutter-lg">
        <q-form>
          <q-card bordered class="q-pa-lg">
            <div class="column q-gutter-lg">
              <e-textfield :disable="false" bg-color="orange" label="Outputs" />

              <e-input v-model="input1" readonly label="Outlined" />

              <e-input v-model="input1" readonly label="Outlined" />

              <e-button label="Show Chart" />
            </div>
          </q-card>
        </q-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  padding: 1rem;
}
</style>
