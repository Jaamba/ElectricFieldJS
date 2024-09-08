// Creare un array di cariche elettriche
const cariche = [
    new CaricaElettrica(500, 250, 0, 0, 10, 9999999, true, 0),
    new CaricaElettrica(300, 250, 0, 0.38, -1, 1, true, 0),
    new CaricaElettrica(1000, 250, 0, -0.24, -1, 1, true, 0),
    new CaricaElettrica(-500, 250, 0, 0.17, -1, 1, true, 0)
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

/*
A 200m di distanza la forza centripeta è di 7,2*19^-5
La forza elettrica è e/200^2 => e = 2,88

A 200m F = 0,00072
A 500m F = 0,00012
A 1000m F = 0,000029
*/
