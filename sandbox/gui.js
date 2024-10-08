// Variabili per la GUI
let caricaSelezionata = 0;
let massaSelezionata = 0;
let piazzaCaricaAttivo = false;

// Riferimenti agli elementi della GUI
const sliderCarica = document.getElementById('carica');
const sliderMassa = document.getElementById('massa');
const caricaValue = document.getElementById('caricaValue');
const massaValue = document.getElementById('massaValue');
const bottonePiazzaCarica = document.getElementById('piazzaCarica');

// Aggiorna il valore mostrato accanto allo slider quando viene cambiato
sliderCarica.addEventListener('input', () => {
    caricaSelezionata = parseInt(sliderCarica.value);
    caricaValue.textContent = caricaSelezionata;
});
sliderMassa.addEventListener('input', () => {
    massaSelezionata = parseInt(sliderMassa.value);
    massaValue.textContent = massaSelezionata;
});

// Quando viene premuto il bottone, attiva il piazzamento della carica
bottonePiazzaCarica.addEventListener('click', () => {
    piazzaCaricaAttivo = true;
    console.log('Modalità di piazzamento carica attiva.');
});

// Gestione dell'evento di clic sul canvas per piazzare una carica
canvas.addEventListener('click', (event) => {
    if (piazzaCaricaAttivo) {
        // Calcoliamo le coordinate del clic rispetto al canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left - cameraX) / zoom;
        const mouseY = (event.clientY - rect.top - cameraY) / zoom;

        // Crea una nuova carica e aggiungila all'array
        const nuovaCarica = new CaricaElettrica(mouseX, mouseY, 0, 0, caricaSelezionata, massaSelezionata, true, 0);
        cariche.push(nuovaCarica);

        // Disattiva la modalità di piazzamento
        piazzaCaricaAttivo = false;
        console.log('Carica piazzata in:', mouseX, mouseY);
    }
});