import { readStored, writeStored } from './storage';

export type LocalAccessProfile = {
  username: string;
  salt: string;
  passwordHash: string;
  createdAt: string;
};

const PROFILE_KEY = 'cqr:access-profile';
const SESSION_KEY = 'cqr:access-session';

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(username: string, password: string, salt: string) {
  const normalizedUsername = username.trim().toLocaleLowerCase('pt-BR');
  const data = new TextEncoder().encode(`${salt}:${normalizedUsername}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return bytesToHex(new Uint8Array(digest));
}

export function loadLocalAccessProfile() {
  return readStored<LocalAccessProfile | null>(localStorage, PROFILE_KEY, null);
}

export function hasLocalAccessSession() {
  return readStored<boolean>(localStorage, SESSION_KEY, false);
}

export async function createLocalAccess(username: string, password: string) {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const salt = bytesToHex(saltBytes);
  const profile: LocalAccessProfile = {
    username: username.trim(),
    salt,
    passwordHash: await hashPassword(username, password, salt),
    createdAt: new Date().toISOString(),
  };
  const saved = writeStored(localStorage, PROFILE_KEY, profile);
  if (!saved) throw new Error('Não foi possível salvar neste navegador. Confira o espaço disponível para dados do site.');
  writeStored(localStorage, SESSION_KEY, true);
  return profile;
}

export async function checkLocalAccess(username: string, password: string, profile: LocalAccessProfile) {
  const candidate = await hashPassword(username, password, profile.salt);
  return username.trim().toLocaleLowerCase('pt-BR') === profile.username.trim().toLocaleLowerCase('pt-BR')
    && candidate === profile.passwordHash;
}

export function setLocalAccessSession(active: boolean) {
  writeStored(localStorage, SESSION_KEY, active);
}
