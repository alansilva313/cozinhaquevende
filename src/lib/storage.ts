export type StoragePort = Pick<Storage,'getItem'|'setItem'>;
export function readStored<T>(storage:StoragePort,key:string,fallback:T):T{
  try{const value=storage.getItem(key);return value===null?fallback:JSON.parse(value) as T;}catch{return fallback;}
}
export function writeStored<T>(storage:StoragePort,key:string,value:T){
  try{storage.setItem(key,JSON.stringify(value));return true;}catch{return false;}
}
