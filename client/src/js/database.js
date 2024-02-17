import { openDB } from 'idb';

const OBJECT_STORE_NAME = 'jate';
const DB_NAME = 'jate';
const DB_VERSION = 1;

export const initdb = async () =>
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log(`${OBJECT_STORE_NAME} database created`);
      }
    },
  });

export const putDb = async (content, timestamp = Date.now()) => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const request = store.put({ id: timestamp, content });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  } catch (error) {
    console.error('Error in putDb:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (error) {
    console.error('Error in getDb:', error);
  }
};

initdb();
