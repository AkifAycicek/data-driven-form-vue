<template>
  <QField standout color="black" v-bind="attrs">
    <div class="self-center full-width">
      <slot v-if="$slots.label" name="label" />
      <slot v-else-if="label">{{ label }}</slot>
      <slot v-else-if="$slots.default" />
    </div>
  </QField>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});
const $attrs = useAttrs();
const label = get($attrs, 'label', undefined);
const attrs = omit($attrs, ['label']);
</script>
