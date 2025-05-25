// Import base di React e degli hook (useState)
import React, { useState } from 'react';
// Import dei componenti React Native principali
import { View, Text, ActivityIndicator, Image, TouchableOpacity, Share, ScrollView } from 'react-native';
// Import dei font Google tramite Expo (Lato regular e bold)
import { useFonts, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
// Import degli stili personalizzati
import styles from './styles';

// Definizione del componente principale dell'app
export default function App() {
  // Stato che contiene la frase visualizzata
  const [frase, setFrase] = useState('');
  // Stato che indica se l'app sta caricando una frase (true/false)
  const [loading, setLoading] = useState(false);

  // Caricamento asincrono dei font Lato tramite hook di Expo
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  // Mostra una schermata di caricamento finché i font non sono pronti
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12, fontSize: 16 }}>Caricamento font…</Text>
      </View>
    );
  }

  // Funzione che recupera una frase casuale dal backend Supabase
  const getFrase = async () => {
    setLoading(true); // Attiva lo stato di caricamento (spinner)
    try {
      // Effettua una chiamata GET al database Supabase per recuperare le frasi
      const res = await fetch("https://abedcvasueggirfyiami.supabase.co/rest/v1/frasi?select=testo", {
        method: "GET",
        headers: {
          // Chiavi di autenticazione per Supabase (API Key + Bearer)
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZWRjdmFzdWVnZ2lyZnlpYW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMjAxMzgsImV4cCI6MjA2MjY5NjEzOH0.ASO9oWWryS-3665wy_9tf0GsM0dF_u82Pqqdv0IgjSE",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZWRjdmFzdWVnZ2lyZnlpYW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMjAxMzgsImV4cCI6MjA2MjY5NjEzOH0.ASO9oWWryS-3665wy_9tf0GsM0dF_u82Pqqdv0IgjSE",
          "Content-Type": "application/json"
        }
      });
      // Parsing della risposta JSON (array di frasi)
      const data = await res.json();
      // Se riceviamo almeno una frase, ne scegliamo una casuale
      if (data && data.length > 0) {
        const fraseRandom = data[Math.floor(Math.random() * data.length)].testo;
        setFrase(fraseRandom); // Aggiorniamo lo stato con la frase estratta
      } else {
        setFrase("⚠️ Nessuna frase ricevuta."); // Messaggio se non arrivano frasi
      }
    } catch (e) {
      setFrase("Errore nel recupero."); // Messaggio in caso di errore/fetch fallita
    } finally {
      setLoading(false); // Disattiva il loading in ogni caso (successo o errore)
    }
  };

  // Funzione per condividere la frase (native share)
  const shareFrase = async () => {
    if (!frase) return; // Non fare nulla se non c'è una frase
    try {
      // Usa l'API Share di React Native per aprire il menù di condivisione nativo
      await Share.share({
        message: frase,
      });
    } catch (error) {
      alert("Errore nella condivisione."); // Mostra errore in caso di problemi
    }
  };

  // Rendering vero e proprio dell'app
  return (
    <View style={styles.container}>
      {/* Parte alta: frase scrollabile */}
      <View style={styles.fraseContainer}>
        <ScrollView
          style={styles.fraseScroll}
          contentContainerStyle={styles.fraseScrollContent}
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.frase}>
            {/* Mostra spinner se loading, altrimenti la frase o messaggio standard */}
            {loading ? <ActivityIndicator /> : frase || "Premi il logo per iniziare"}
          </Text>
        </ScrollView>
      </View>
      {/* Footer in basso con logo pulsante e tasto condividi */}
      <View style={styles.footer}>
        {/* Logo: premendolo chiama getFrase */}
        <TouchableOpacity onPress={getFrase} style={styles.logoButton} disabled={loading}>
          <Image
            source={require('./assets/logoamoriflow.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* Pulsante condividi appare solo se c'è una frase e non si sta caricando */}
        {frase !== '' && !loading && (
          <TouchableOpacity onPress={shareFrase} style={styles.shareButton} activeOpacity={0.6}>
            <Text style={styles.shareText}>CONDIVIDI</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
