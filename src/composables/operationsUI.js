const UI = ref(localStorage.getItem('operations-ui'));
const availableUIs = ['simple', 'vertical', 'pro'];

export function useOperationsUI() {
  function setUI(newUI) {
    if (typeof newUI != 'string') throw Error('UI must be a string');
    UI.value = newUI;
    localStorage.setItem('operations-ui', newUI);
  }

  return {
    setUI,
    UI,
    availableUIs,
  };
}
