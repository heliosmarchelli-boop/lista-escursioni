import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Escursione } from '../types/Escursione';

interface Props {
  escursione: Escursione;
  onCompleta: (id: string) => void;
  onCancella: (id: string) => void;
}

function formattaData(data: string): string {
  const d = new Date(data);
  if (Number.isNaN(d.getTime())) return data;
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function EscursioneItem({ escursione, onCompleta, onCancella }: Props) {
  return (
    <View style={[styles.card, escursione.completata && styles.cardCompletata]}>
      <View style={styles.info}>
        <Text style={[styles.nome, escursione.completata && styles.testoCompletato]}>
          {escursione.nome}
        </Text>
        <Text style={styles.dettagli}>
          {formattaData(escursione.data)} · {escursione.dislivello} m dislivello
        </Text>
        {escursione.completata && <Text style={styles.badge}>Completata</Text>}
      </View>
      <View style={styles.azioni}>
        {!escursione.completata && (
          <Pressable
            accessibilityLabel="Segna come completata"
            style={[styles.bottone, styles.bottoneCompleta]}
            onPress={() => onCompleta(escursione.id)}
          >
            <Text style={styles.bottoneTesto}>✓</Text>
          </Pressable>
        )}
        <Pressable
          accessibilityLabel="Cancella escursione"
          style={[styles.bottone, styles.bottoneCancella]}
          onPress={() => onCancella(escursione.id)}
        >
          <Text style={styles.bottoneTesto}>✕</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardCompletata: {
    backgroundColor: '#f0f6f0',
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  testoCompletato: {
    textDecorationLine: 'line-through',
    color: '#7a7a7a',
  },
  dettagli: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  badge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
    backgroundColor: '#e0f2e1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  azioni: {
    flexDirection: 'row',
    gap: 8,
  },
  bottone: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  bottoneCompleta: {
    backgroundColor: '#2e7d32',
  },
  bottoneCancella: {
    backgroundColor: '#c62828',
  },
  bottoneTesto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
