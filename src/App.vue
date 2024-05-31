<script setup>
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
    //   ID0: {},
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
      disable: false,
      type: 'submit',
      label: 'Show Chart',
      label2: 'Hide Chart',
      'bg-color': 'green',
      'bg-color2': 'grey',
    },
  },
};

const inputForm = Form.create({
  data: {},
});

const outputForm = Form.create({
  data: {},
});

function execute() {
  const [x, y] = map(values(inputForm.toObject()), (e) => parseFloat(e));

  if (isNumber(x) && isNumber(y))
    outputForm.merge({
      addition: x + y,
      multiplication: x * y,
    });

  console.log(inputForm.toObject());
  console.log(outputForm.toObject());
}
</script>

<template>
  <div class="row q-gutter-lg justify-center">
    <div class="col-sm-4 col-auto">
      <div class="column q-gutter-lg">
        <EDataDrivenForm
          :data="formData.inputs"
          :model-value="inputForm"
          @input="(value) => inputForm.merge(value)" />
        <EButton label="Execute" @click="execute" />
      </div>
    </div>
    <div class="col-sm-4 col-auto">
      <div class="column q-gutter-lg">
        <EDataDrivenForm
          :data="formData.outputs"
          :model-value="outputForm"
          @submit.prevent="execute" />
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
