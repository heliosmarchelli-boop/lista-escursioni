import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Linking,
} from 'react-native';
import { Escursione } from '../types/Escursione';

interface Props {
  visibile: boolean;
  onChiudi: () => void;
  onSalva: (escursione: Omit<Escursione, 'id' | 'completata'>) => void;
}

function dataOdierna(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function NuovaEscursioneModal({ visibile, onChiudi, onSalva }: Props) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState(dataOdierna());
  const [dislivello, setDislivello] = useState('');
  const [fotoUri, setFotoUri] = useState<string | undefined>(undefined);
  const [errore, setErrore] = useState('');
  const [erroreFoto, setErroreFoto] = useState('');
  const [permessoNegatoDefinitivo, setPermessoNegatoDefinitivo] = useState(false);

  function resetForm() {
    setNome('');
    setData(dataOdierna());
    setDislivello('');
    setFotoUri(undefined);
    setErrore('');
    setErroreFoto('');
    setPermessoNegatoDefinitivo(false);
  }

  function handleChiudi() {
    resetForm();
    onChiudi();
  }

  async function handleScegliFoto() {
    setErroreFoto('');
    setPermessoNegatoDefinitivo(false);

    const permesso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permesso.granted) {
      if (permesso.canAskAgain) {
        setErroreFoto("Permesso alla galleria negato. Riprova e concedi l'accesso per allegare una foto.");
      } else {
        setErroreFoto(
          "Permesso alla galleria negato in modo permanente. Abilitalo dalle impostazioni del telefono per allegare una foto."
        );
        setPermessoNegatoDefinitivo(true);
      }
      return;
    }

    const risultato = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (!risultato.canceled && risultato.assets[0]) {
      setFotoUri(risultato.assets[0].uri);
    }
  }

  function handleRimuoviFoto() {
    setFotoUri(undefined);
  }

  function handleSalva() {
    const nomePulito = nome.trim();
    if (!nomePulito) {
      setErrore('Inserisci il nome dell\'escursione');
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      setErrore('Inserisci la data nel formato AAAA-MM-GG');
      return;
    }
    const dislivelloNum = Number(dislivello);
    if (!dislivello || Number.isNaN(dislivelloNum) || dislivelloNum < 0) {
      setErrore('Inserisci un dislivello valido (in metri)');
      return;
    }

    onSalva({ nome: nomePulito, data, dislivello: dislivelloNum, fotoUri });
    resetForm();
  }

  return (
    <Modal visible={visibile} animationType="slide" transparent onRequestClose={handleChiudi}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.contenuto}>
          <Text style={styles.titolo}>Nuova escursione</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Es. Monte Rosa"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Data (AAAA-MM-GG)</Text>
          <TextInput
            style={styles.input}
            value={data}
            onChangeText={setData}
            placeholder="2026-07-26"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Dislivello (metri)</Text>
          <TextInput
            style={styles.input}
            value={dislivello}
            onChangeText={setDislivello}
            placeholder="Es. 850"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Foto</Text>
          {fotoUri ? (
            <View style={styles.anteprimaRiga}>
              <Image source={{ uri: fotoUri }} style={styles.anteprima} />
              <Pressable style={styles.bottoneRimuoviFoto} onPress={handleRimuoviFoto}>
                <Text style={styles.bottoneRimuoviFotoTesto}>Rimuovi foto</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable style={styles.bottoneFoto} onPress={handleScegliFoto}>
              <Text style={styles.bottoneFotoTesto}>Scegli dalla galleria</Text>
            </Pressable>
          )}

          {erroreFoto ? (
            <View>
              <Text style={styles.errore}>{erroreFoto}</Text>
              {permessoNegatoDefinitivo && (
                <Pressable onPress={() => Linking.openSettings()}>
                  <Text style={styles.linkImpostazioni}>Apri le impostazioni</Text>
                </Pressable>
              )}
            </View>
          ) : null}

          {errore ? <Text style={styles.errore}>{errore}</Text> : null}

          <View style={styles.azioni}>
            <Pressable style={[styles.bottone, styles.bottoneAnnulla]} onPress={handleChiudi}>
              <Text style={styles.bottoneAnnullaTesto}>Annulla</Text>
            </Pressable>
            <Pressable style={[styles.bottone, styles.bottoneSalva]} onPress={handleSalva}>
              <Text style={styles.bottoneSalvaTesto}>Salva</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  contenuto: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 36,
  },
  titolo: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1a1a1a',
  },
  bottoneFoto: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  bottoneFotoTesto: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 15,
  },
  anteprimaRiga: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  anteprima: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  bottoneRimuoviFoto: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  bottoneRimuoviFotoTesto: {
    color: '#c62828',
    fontWeight: '600',
    fontSize: 14,
  },
  errore: {
    color: '#c62828',
    marginTop: 12,
    fontSize: 14,
  },
  linkImpostazioni: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 6,
  },
  azioni: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  bottone: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bottoneAnnulla: {
    backgroundColor: '#f0f0f0',
  },
  bottoneAnnullaTesto: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  bottoneSalva: {
    backgroundColor: '#2e7d32',
  },
  bottoneSalvaTesto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
