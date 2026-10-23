import { describe, expect, it } from 'vitest';
import { readStored, writeStored, type StoragePort } from './storage';

function memoryStorage():StoragePort{
  const entries=new Map<string,string>();
  return {getItem:(key)=>entries.get(key)??null,setItem:(key,value)=>{entries.set(key,value);}};
}
describe('persistência local',()=>{
  it('salva e recupera preferências em JSON',()=>{const storage=memoryStorage();const state={favorites:['brownies'],fontScale:1.12};expect(writeStored(storage,'cqr:state',state)).toBe(true);expect(readStored(storage,'cqr:state',{})).toEqual(state);});
  it('usa o valor inicial quando não há dados salvos',()=>{expect(readStored(memoryStorage(),'cqr:missing',['inicio'])).toEqual(['inicio']);});
  it('recupera com segurança após JSON inválido',()=>{const storage=memoryStorage();storage.setItem('cqr:bad','{');expect(readStored(storage,'cqr:bad',{ready:false})).toEqual({ready:false});});
});
