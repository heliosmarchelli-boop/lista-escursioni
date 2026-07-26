import { Directory, File, Paths } from 'expo-file-system';

const NOME_CARTELLA_FOTO = 'foto-escursioni';

function cartellaFoto(): Directory {
  const cartella = new Directory(Paths.document, NOME_CARTELLA_FOTO);
  if (!cartella.exists) {
    cartella.create({ intermediates: true });
  }
  return cartella;
}

export function salvaFotoPermanente(uriTemporaneo: string, idEscursione: string): string {
  const estensione = uriTemporaneo.split('.').pop()?.split(/[?#]/)[0] || 'jpg';
  const destinazione = new File(cartellaFoto(), `${idEscursione}.${estensione}`);
  if (destinazione.exists) {
    destinazione.delete();
  }
  new File(uriTemporaneo).copy(destinazione);
  return destinazione.uri;
}

export function eliminaFotoPermanente(uri?: string): void {
  if (!uri) return;
  try {
    const file = new File(uri);
    if (file.exists) {
      file.delete();
    }
  } catch {
    // Il file potrebbe non essere più raggiungibile: non è un errore bloccante.
  }
}
