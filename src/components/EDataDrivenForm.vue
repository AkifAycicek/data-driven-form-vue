<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  rules: {
    type: Object,
    default: undefined,
  },
  modelValue: {
    type: Form,
    default: undefined,
  },
});

const slots = useSlots();

const emit = defineEmits(['update:modelValue', 'input']);

function gatherInitialFormValues(node, namespace, formValue = reactive({})) {
  toPairs(node).forEach(([key, node]) => {
    const fieldValue = get(node, 'value');
    let fieldPath;

    if (has(node, 'fieldAccessor')) {
      fieldPath = get(node, 'fieldAccessor');
    } else if (namespace) {
      fieldPath = `${namespace}[${key}]`;
    } else {
      fieldPath = key;
    }

    if (!isUndefined(fieldValue)) set(formValue, fieldPath, fieldValue);

    if (!has(node, 'componentType')) {
      return gatherInitialFormValues(node, fieldPath, formValue);
    }
  });
  return formValue;
}

const form =
  props.modelValue ??
  Form.create({
    data: gatherInitialFormValues(props.data),
    rules: props.rules,
  });

function gatherComponentsFromTree(node, namespace) {
  const childs = toPairs(node).map(([key, node]) => {
    let fieldPath;

    if (has(node, 'fieldAccessor')) {
      fieldPath = get(node, 'fieldAccessor');
    } else if (namespace) {
      fieldPath = `${namespace}[${key}]`;
    } else {
      fieldPath = key;
    }
    const slotOverride = get(slots, node.fieldAccessor ?? fieldPath);
    if (slotOverride) {
      return slotOverride({ node });
    }

    if (has(node, 'componentType')) {
      const componentInstance = resolveComponent(get(node, 'componentType'));
      const props = {
        error: !!form?.errors?.first(fieldPath),
        errorMessage: form?.errors?.first(fieldPath) || '',
        ...omit(node, ['componentType', 'value', 'fieldAccessor']),
      };
      const events = {
        'onUpdate:modelValue': (event) => {
          const fieldValue = get(event, 'target.value', get(event, 'target.checked', event));

          if (form) {
            set(form, fieldPath, fieldValue);
            emit('update:modelValue', form);
          }

          emit('input', set({}, fieldPath, fieldValue));
        },
      };

      const modelValue = get(form, fieldPath);
      set(props, 'modelValue', modelValue);

      const component = h(componentInstance, { ...props, ...events });

      return component;
    }
    return gatherComponentsFromTree(node, fieldPath);
  });

  const wrapperComponent = h('div', { class: 'column q-gutter-y-md ' }, childs);
  return wrapperComponent;
}
</script>

<template>
  <QForm>
    <QCard bordered class="q-pa-md">
      <div v-if="$slots.default" class="q-ma-lg">
        <slot name="top" />
      </div>
      <component
        :is="{
          render() {
            return gatherComponentsFromTree(props.data);
          },
        }" />
      <div v-if="$slots.default" class="q-ma-lg">
        <slot />
      </div>
      <div v-if="$slots.default" class="q-ma-lg">
        <slot name="bottom" />
      </div>
    </QCard>
  </QForm>
</template>
