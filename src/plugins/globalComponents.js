import * as AllQuasarComponents from 'quasar';
import { defineAsyncComponent } from 'vue';

const componentFiles = import.meta.glob('@components/**/*.vue');

export function setupComponents(app) {
  for (const path in componentFiles) {
    const componentName = path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '');
    app.component(
      componentName,
      defineAsyncComponent(() => componentFiles[path]()),
    );
  }

  for (const componentName in AllQuasarComponents) {
    const component = AllQuasarComponents[componentName];
    if (component && component.name?.startsWith('Q')) {
      app.component(component.name, component);
    }
  }
}
