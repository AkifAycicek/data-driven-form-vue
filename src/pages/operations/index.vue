<script setup>
import { useOperationsUI } from '@composables/operationsUI.js';

const formData = {
  inputs: {
    ID0: {
      componentType: 'ETextfield',
      disable: false,
      label: 'Inputs',
      'bg-color': 'orange',
    },
    ID1: {
      componentType: 'EInput',
      fieldAccessor: 'x',
      disable: false,
      label: 'X',
      type: 'number',
      'bg-color': 'white',
    },
    ID2: {
      componentType: 'EInput',
      fieldAccessor: 'y',
      disable: false,
      label: 'Y',
      type: 'number',
      'bg-color': 'white',
    },
    // ID3: {
    //   ID0: {
    //     componentType: 'QField',
    //     label: 'Nothing',
    //   },
    // },
  },
  outputs: {
    ID0: {
      componentType: 'ETextfield',
      disable: false,
      label: 'Results',
      'bg-color': 'green',
    },
    ID1: {
      componentType: 'EInput',
      fieldAccessor: 'addition',
      disable: false,
      readonly: true,
      outlined: true,
      label: 'Addition',
      'bg-color': 'white',
    },
    ID2: {
      componentType: 'EInput',
      fieldAccessor: 'multiplication',
      disable: false,
      readonly: true,
      outlined: true,
      label: 'Multiplication',
      'bg-color': 'white',
    },
    ID3: {
      componentType: 'EButton',
      fieldAccessor: 'graphBtn',
      disable: false,
      type: 'submit',
      label: 'Show Chart',
      label2: 'Hide Chart',
      'bg-color': 'green',
      'bg-color2': 'grey',
    },
  },
};

const router = useRouter();
const operationsUI = useOperationsUI();

if (!operationsUI.availableUIs.includes(operationsUI.UI.value)) {
  router.replace({ name: 'operations-ui-select' });
}

const inputForm = Form.create({
  data: {},
  rules: {
    x: 'numeric|required|min:0|max:100',
    y: 'numeric|required|min:0|max:100',
  },
  // true
});

const outputForm = Form.create({
  data: { addition: null, multiplication: null },
});

const operationStore = useOperationStore();
const { operations } = storeToRefs(operationStore);
let tempOperations = [];

const isPlotHidden = ref(true);
const plotData = reactive([{ x: [], y: [] }]);

const plotLayout = {
  title: 'Line and Scatter Plot',
  xaxis: {
    title: 'Number of operations',
    range: [0, 100],
  },
  yaxis: {
    title: 'Addition operation results',
    range: [0, 100],
  },
};

function* counter() {
  let counter = 1;

  while (true) {
    yield counter++;

    if (counter > 6) {
      counter = 1;
    }
  }
}
const operationCounter = counter();
const clickCount = ref(null);

async function execute() {
  outputForm.reset();

  const { x, y } = fromPairs(
    map(toPairs(inputForm.toObject()), ([key, value]) => [key, parseFloat(value)]),
  );

  if (inputForm.validate() && isNumber(x) && isNumber(y)) {
    clickCount.value = operationCounter.next().value;

    outputForm.merge({
      addition: x + y,
      multiplication: x * y,
    });

    tempOperations.push({
      addition: outputForm.addition,
      multiplication: outputForm.multiplication,
    });
  }

  if (clickCount.value >= 6) {
    operations.value.push(...tempOperations);
    tempOperations = [];

    plotData[0] = {
      x: takeRight(
        operations.value.map((e, i) => i + 1),
        5,
      ),
      y: takeRight(
        operations.value.map(({ addition }) => addition),
        5,
      ),
    };
  }
}
</script>
<template>
  <div class="operations operations__ui" :class="`operations__ui--${operationsUI.UI.value}`">
    <EDataDrivenForm
      class="operations__inputs"
      :data="formData.inputs"
      :model-value="inputForm"
      @input="(value) => inputForm.merge(value)" />
    <EButton class="operations__button self-center" push label="Execute" @click="execute()">
      <QBadge v-if="clickCount > 0" color="orange" floating :label="clickCount" />
      <QLinearProgress
        v-if="clickCount > 0"
        color="orange"
        :value="(clickCount / 60) * 10"
        class="q-mt-md" />
    </EButton>
    <EDataDrivenForm
      class="operations__outputs"
      :data="formData.outputs"
      :model-value="outputForm"
      @submit.prevent="isPlotHidden = !isPlotHidden">
      <template #graphBtn="{ node }">
        <EButton
          v-bind="node"
          :label="!isPlotHidden ? node.label2 : node.label"
          :color="!isPlotHidden ? node['bg-color2'] : node['bg-color']" />
      </template>
    </EDataDrivenForm>
    <EPlotly
      class="operations__graph"
      :data="plotData"
      :layout="plotLayout"
      :hidden="isPlotHidden" />
  </div>
</template>
<style lang="scss" scoped>
.operations {
  &__graph {
    grid-area: graph;
    min-height: 40vh;
  }
}
</style>
