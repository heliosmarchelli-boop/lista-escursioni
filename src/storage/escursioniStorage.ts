import AsyncStorage from '@react-native-async-storage/async-storage';
import { Escursione } from '../types/Escursione';

const STORAGE_KEY = '@lista_escursioni';

export async function caricaEscursioni(): Promise<Escursione[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function salvaEscursioni(escursioni: Escursione[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(escursioni));
}
