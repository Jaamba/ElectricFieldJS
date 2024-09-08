// Creare un array di cariche elettriche
const cariche = [
    new CaricaElettrica(500, 250, 0, 0, 1, 1, true, 0),
];

// Funzione per disegnare le cariche e il campo elettrico
function animate() {
    dt = deltaTime();  // Calcoliamo il deltaTime (durata di un frame)

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Pulisce il canvas
    disegnaCampo(cariche, 15);  // Disegna il campo elettrico con passo di 50px
    cariche.forEach(carica => carica.draw(ctx));  // Disegna le cariche
    cariche.forEach(carica => carica.update(ctx));  // Disegna le cariche
    requestAnimationFrame(animate);  // Richiama la funzione di animazione
}

// Avvia l'animazione
animate();
