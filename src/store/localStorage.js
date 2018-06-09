export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cabinState');
    if (serializedState) {
      return JSON.parse(serializedState);
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cabinState', serializedState);
  } catch (err) {
    console.log('We received an error while saving the store');
  }
};
