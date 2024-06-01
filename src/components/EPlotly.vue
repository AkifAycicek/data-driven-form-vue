<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  layout: {
    type: Object,
    default: () => ({}),
  },
  config: {
    type: Object,
    default: () => ({
      responsive: true,
    }),
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});
const attrs = useAttrs();
const emit = defineEmits(['plotCreated']);

const plotId = attrs.id ?? uniqueId('plot_');
const plotContainer = ref();

onMounted(async () => {
  await Plotly.newPlot(plotContainer.value, props.data, props.layout, props.config);
  emit('plotCreated', plotContainer.value);

  watch(
    () => props,
    ({ hidden, data, layout }) => {
      Plotly.update(plotContainer.value, data, layout);

      if (!hidden) {
        if (plotContainer.value?.classList?.contains('hidden')) {
          plotContainer.value?.classList?.remove('hidden');
          Plotly.Plots.resize(plotContainer.value);
        }
      } else plotContainer.value?.classList?.add('hidden');
    },
    { deep: true, immediate: true, flush: 'post' },
  );
});
</script>

<template>
  <div :id="plotId" ref="plotContainer" />
</template>
