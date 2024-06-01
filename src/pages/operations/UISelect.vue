<script setup>
import { useOperationsUI } from '@composables/operationsUI.js';

const operationsUi = useOperationsUI();
const router = useRouter();

function chooseUI(UI) {
  operationsUi.setUI(UI);
  router?.push({ name: 'operations' });
}
</script>

<template>
  <div class="container q-mx-auto">
    <h3>Choose a UI</h3>
    <div class="row justify-between align-center">
      <div v-for="UI in operationsUi.availableUIs" :key="UI" class="row col-12 col-sm-5">
        <div
          :class="{
            ['bg-light-green-3']: operationsUi.UI.value == UI,
            [`operations__ui--${UI}`]: UI,
          }"
          class="col-12 self-strech operations__ui cursor-pointer"
          @click="() => chooseUI(UI)">
          <QBadge floating rounded :class="{ ['rotate-45']: UI == 'pro' }">
            <span class="q-pa-sm q-ma-none text-capitalize">{{ UI }}</span>
          </QBadge>
          <span class="operations__inputs bg-amber-14" v-text="'inputs'" />
          <span class="operations__outputs bg-deep-purple-4" v-text="'outputs'" />
          <span class="operations__button bg-indigo-4" v-text="'button'" />
          <span class="operations__graph bg-red-4" v-text="'graph'" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  & > .row {
    gap: 1rem;
  }

  .operations {
    &__ui {
      position: relative;
      padding: 1rem;
      border-radius: 1rem;

      &:hover {
        background-color: $light-green-2;
      }
    }

    &__inputs,
    &__outputs,
    &__button,
    &__graph {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-transform: capitalize;
      border-radius: 1rem;
    }
  }
}
</style>
