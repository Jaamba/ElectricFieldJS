const cariche = [
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0.19),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0.39),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0.59),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0.78),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 0.98),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1.18),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1.37),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1.57),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1.77),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 1.96),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2.16),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2.36),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2.55),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2.75),
    new CaricaElettrica(430, 50, 0, 0, 1, 1, false, 2.94),
];

// Funzione per disegnare le cariche e il campo elettrico
function animate() {
    dt = deltaTime();  // Calcoliamo il deltaTime (durata di un frame)

    for(let i = 0; i < 16; i++) {
        motoCircolare(cariche[i], 500, 230, 200, 2);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Pulisce il canvas
    disegnaCampo(cariche, 15);  // Disegna il campo elettrico con passo di 50px
    cariche.forEach(carica => carica.draw(ctx));  // Disegna le cariche
    cariche.forEach(carica => carica.update(ctx));  // Disegna le cariche
    requestAnimationFrame(animate);  // Richiama la funzione di animazione
}

// Avvia l'animazione
animate();