import { openDB } from 'idb';

let dbPromise;
if (typeof window !== 'undefined') {
  dbPromise = openDB('propertyDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('properties')) {
        db.createObjectStore('properties', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'username' });
      }
    },
  });
}

export const getProperties = async () => {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return db.getAll('properties');
};

export const getPropertyById = async (id) => {
  if (!dbPromise) return null;
  const db = await dbPromise;
  return db.get('properties', id);
};
// Assuming each property is stored with a unique ID and properties are stored as an array of objects in localStorage
export const deleteProperty = async (id) => {
  const db = await openDB('propertyDB', 1);
  const tx = db.transaction('properties', 'readwrite');
  await tx.store.delete(id);
  await tx.done;
  return db.getAll('properties');
}


// In db.js
export const saveProperties = async (properties) => {
  const db = await dbPromise;
  const tx = db.transaction('properties', 'readwrite');
  properties.forEach(async (property) => {
    await tx.store.put(property);
  });
  await tx.done;
};
