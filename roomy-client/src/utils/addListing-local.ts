export const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return {
      ...JSON.parse(serializedState),
      step: 0,
    };
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error(err);
  }
};

export const removeState = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
};
