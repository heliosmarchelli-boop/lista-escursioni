import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Escursione } from './src/types/Escursione';
import { caricaEscursioni, salvaEscursioni } from './src/storage/escursioniStorage';
import { salvaFotoPermanente, eliminaFotoPermanente } from './src/storage/fotoStorage';
import EscursioneItem from './src/components/EscursioneItem';
import NuovaEscursioneModal from './src/components/NuovaEscursioneModal';

function generaId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function App() {
  const [escursioni, setEscursioni] = useState<Escursione[]>([]);
  const [caricamento, setCaricamento] = useState(true);
  const [modaleVisibile, setModaleVisibile] = useState(false);

  useEffect(() => {
    caricaEscursioni()
      .then(setEscursioni)
      .finally(() => setCaricamento(false));
  }, []);

  const aggiornaESalva = useCallback((nuove: Escursione[]) => {
    setEscursioni(nuove);
    salvaEscursioni(nuove);
  }, []);

  function handleAggiungi(nuova: Omit<Escursione, 'id' | 'completata'>) {
    const id = generaId();
    const fotoUri = nuova.fotoUri ? salvaFotoPermanente(nuova.fotoUri, id) : undefined;
    const escursione: Escursione = { ...nuova, fotoUri, id, completata: false };
    aggiornaESalva([escursione, ...escursioni]);
    setModaleVisibile(false);
  }

  function handleCompleta(id: string) {
    aggiornaESalva(
      escursioni.map((e) => (e.id === id ? { ...e, completata: true } : e))
    );
  }

  function handleCancella(id: string) {
    const daCancellare = escursioni.find((e) => e.id === id);
    eliminaFotoPermanente(daCancellare?.fotoUri);
    aggiornaESalva(escursioni.filter((e) => e.id !== id));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titolo}>Le mie escursioni</Text>
      </View>

      {caricamento ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#2e7d32" />
        </View>
      ) : escursioni.length === 0 ? (
        <View style={styles.centro}>
          <Text style={styles.vuoto}>Nessuna escursione salvata.</Text>
          <Text style={styles.vuotoSotto}>Tocca + per aggiungerne una.</Text>
        </View>
      ) : (
        <FlatList
          data={escursioni}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <EscursioneItem
              escursione={item}
              onCompleta={handleCompleta}
              onCancella={handleCancella}
            />
          )}
        />
      )}

      <Pressable
        accessibilityLabel="Aggiungi escursione"
        style={styles.fab}
        onPress={() => setModaleVisibile(true)}
      >
        <Text style={styles.fabTesto}>+</Text>
      </Pressable>

      <NuovaEscursioneModal
        visibile={modaleVisibile}
        onChiudi={() => setModaleVisibile(false)}
        onSalva={handleAggiungi}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titolo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  lista: {
    paddingBottom: 100,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vuoto: {
    fontSize: 17,
    fontWeight: '600',
    color: '#444',
  },
  vuotoSotto: {
    marginTop: 6,
    fontSize: 14,
    color: '#888',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2e7d32',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  fabTesto: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 34,
  },
});
