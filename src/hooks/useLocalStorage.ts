import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useReflections() {
  const [reflections, setReflections] = useLocalStorage<any[]>('leadership-reflections', []);

  const addReflection = (reflection: any) => {
    const newReflection = {
      ...reflection,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setReflections(prev => [newReflection, ...prev]);
    return newReflection;
  };

  const updateReflection = (id: string, updates: any) => {
    setReflections(prev => 
      prev.map(r => 
        r.id === id 
          ? { ...r, ...updates, updatedAt: new Date().toISOString() }
          : r
      )
    );
  };

  const deleteReflection = (id: string) => {
    setReflections(prev => prev.filter(r => r.id !== id));
  };

  return {
    reflections,
    addReflection,
    updateReflection,
    deleteReflection
  };
}