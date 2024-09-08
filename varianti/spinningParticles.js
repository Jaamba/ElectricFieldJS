const cariche = [
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0.2),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0.4),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0.6),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0.8),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1.2),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1.4),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1.6),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1.8),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2.2),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2.4),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2.6),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2.8),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 3),
];

// Funzione per disegnare le cariche e il campo elettrico
function animate() {
    dt = deltaTime();  // Calcoliamo il deltaTime (durata di un frame)

    for(let i = 0; i < 16; i++) {
        motoCircolare(cariche[i], 300, 200, 200, 2);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Pulisce il canvas
    disegnaCampo(cariche, 15);  // Disegna il campo elettrico con passo di 50px
    cariche.forEach(carica => carica.draw(ctx));  // Disegna le cariche
    cariche.forEach(carica => carica.update(ctx));  // Disegna le cariche
    requestAnimationFrame(animate);  // Richiama la funzione di animazione
}

// Avvia l'animazione
animate();