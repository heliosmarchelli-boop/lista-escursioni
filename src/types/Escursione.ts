export interface Escursione {
  id: string;
  nome: string;
  data: string; // ISO date string (YYYY-MM-DD)
  dislivello: number; // metri
  completata: boolean;
}
