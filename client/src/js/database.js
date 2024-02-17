import { openDB } from 'idb';

const OBJECT_STORE_NAME = 'jate';
const DB_NAME = 'jate';
const DB_VERSION = 1;

// Initialize the database
export const initdb = async () =>
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        console.log(`${OBJECT_STORE_NAME} database already exists`);
        return;
      }
      db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      console.log(`${OBJECT_STORE_NAME} database created`);
    },
  });

// Add or update content in the database
export const putDb = async (content) => {
  try {
    console.log('PUT to the database', content);
    const db = await openDB(DB_NAME, DB_VERSION);
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const request = store.put({ content });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  } catch (error) {
    console.error('Error in putDb:', error);
    throw error;
  }
};

// Get all content from the database
export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const db = await openDB(DB_NAME, DB_VERSION);
    const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (error) {
    console.error('Error in getDb:', error);
    throw error;
  }
};

// Call initdb to initialize the database
initdb();
