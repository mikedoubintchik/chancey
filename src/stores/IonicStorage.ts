import { Storage, Drivers } from '@ionic/storage';

let storage: any;

export const createIonicStore = (name = '__mydb') => {
  storage = new Storage({
    name,
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
  });

  storage.create();
};

export const set = (key: string, val: any) => {
  storage.set(key, val);
};

export const get = async (key: string) => {
  const val = await storage.get(key);
  return val;
};

export const remove = async (key: string) => {
  await storage.remove(key);
};

export const clear = async () => {
  await storage.clear();
};

export const setObject = async (key: string, id: string, val: any) => {
  const all = await storage.get(key);
  const objIndex = await all.findIndex((a: any) => parseInt(a.id) === parseInt(id));
  console.log('🚀 ~ file: ionicStorage.ts ~ line 37 ~ setObject ~ objIndex', objIndex);

  all[objIndex] = val;
  set(key, all);
};

export const removeObject = async (key: string, id: string) => {
  const all = await storage.get(key);
  const objIndex = await all.findIndex((a: any) => parseInt(a.id) === parseInt(id));

  all.splice(objIndex, 1);
  set(key, all);
};

export const getObject = async (key: string, id: string) => {
  const all = await storage.get(key);
  const obj = await all.filter((a: any) => parseInt(a.id) === parseInt(id))[0];
  return obj;
};
