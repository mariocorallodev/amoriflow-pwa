import { StyleSheet, Dimensions } from 'react-native';

// Otteniamo l'altezza della finestra per gestire layout responsivi
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  // Contenitore usato durante il caricamento del font
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // centra verticalmente
    alignItems: 'center',     // centra orizzontalmente
    backgroundColor: '#fff',  // sfondo bianco
  },

  // Contenitore principale dell'app
  container: {
    flex: 1,
    backgroundColor: '#fff',      // sfondo bianco
    paddingHorizontal: 20,        // padding laterale per non stare a filo bordo
    paddingTop: 40,               // padding dall'alto per separare la frase dal bordo
    paddingBottom: 40,             // padding dal basso per separare logo e condividi'
    justifyContent: 'flex-start', // allinea contenuti dall'alto
  },

  // Contenitore della frase, occupa tutto lo spazio sopra il logo
  fraseContainer: {
    flex: 1,            // prende tutto lo spazio verticale possibile (tranne il footer)
    minHeight: 100,     // altezza minima per non farlo sparire
    width: '100%',      // occupa tutta la larghezza
    marginBottom: 20,   // spazio sotto la frase (sopra il logo)
  },

  // ScrollView per la frase, permette di scorrere se troppo lunga
  fraseScroll: {
    flexGrow: 0,                          // non cresce oltre la maxHeight
    maxHeight: windowHeight * 0.8,        // la frase può occupare fino all'80% dello schermo
  },

  // Stile interno della ScrollView (centra il testo)
  fraseScrollContent: {
    justifyContent: 'center', // centra verticalmente
    alignItems: 'center',     // centra orizzontalmente
    flexGrow: 1,
  },

  // Stile della frase
  frase: {
    fontSize: 20,                 // dimensione testo
    textAlign: 'center',          // testo centrato
    fontFamily: 'Lato_400Regular',// font Lato regular
    color: '#222',                // colore testo quasi nero
    paddingHorizontal: 6,         // padding laterale per non toccare i bordi
    paddingVertical: 16,          // padding verticale (rende più arioso)
    letterSpacing: 0.3,         // spaziatura lettere
  },

  // Footer: contiene logo e pulsante condividi, sempre in basso
  footer: {
    width: '100%',         // occupa tutta la larghezza
    alignItems: 'center',  // centra tutto orizzontalmente
    marginBottom: 24,      // spazio dal bordo basso del telefono
  },

  // Bottone logo (tappabile)
  logoButton: {
    borderRadius: 100, // rotondo
    overflow: 'hidden',
    marginBottom: 12,  // spazio sotto il logo (sopra "condividi")
  },

  // Immagine del logo
  logo: {
    width: 120,   // larghezza logo (modifica qui se vuoi più grande o piccolo)
    height: 120,  // altezza logo
    opacity: 0.92,// leggermente trasparente per effetto soft
  },

  // Stile del pulsante condividi
  shareButton: {
    marginTop: 0,               // niente spazio sopra
    paddingVertical: 6,         // padding verticale (spessore del bottone)
    paddingHorizontal: 24,      // padding orizzontale (larghezza bottone)
    borderRadius: 16,           // angoli arrotondati
  },

  // Testo del pulsante condividi
  shareText: {
    fontFamily: 'Lato_700Bold', // font bold
    fontSize: 12,               // dimensione testo
    color: '#e0584c',           // rosso tipico del logo
    letterSpacing: 1,         // spaziatura lettere
  },
});
