import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  
  const setStoredValue = (newValue) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
