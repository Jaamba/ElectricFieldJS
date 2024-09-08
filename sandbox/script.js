// Variabili per la telecamera e il fattore di zoom
let cameraX = 0;  // Spostamento della telecamera lungo l'asse x
let cameraY = 0;  // Spostamento della telecamera lungo l'asse y
let zoom = 1;     // Fattore di zoom (1 = senza zoom, >1 = ingrandito, <1 = rimpicciolito)

// Funzione per gestire il movimento della telecamera con le frecce direzionali
function gestisciMovimento(event) {
    const velocita = 20;  // Velocità di spostamento

    switch (event.key) {
        case 'ArrowUp':
            cameraY += velocita;  // Sposta la telecamera verso l'alto
            break;
        case 'ArrowDown':
            cameraY -= velocita;  // Sposta la telecamera verso il basso
            break;
        case 'ArrowLeft':
            cameraX += velocita;  // Sposta la telecamera verso sinistra
            break;
        case 'ArrowRight':
            cameraX -= velocita;  // Sposta la telecamera verso destra
            break;
        case '+':  // Zoom in
            zoom *= 1.1;  // Aumenta il fattore di zoom
            break;
        case '-':  // Zoom out
            zoom /= 1.1;  // Riduci il fattore di zoom
            break;
    }
}

let lastFrameTime = 0;  // Variabile per memorizzare il tempo del frame precedente
let dt = 0;

// Funzione per calcolare il deltaTime
function deltaTime() {
    const currentTime = performance.now();  // Otteniamo il tempo corrente (in millisecondi)
    const delta = (currentTime - lastFrameTime) / 1000;  // Calcoliamo il tempo trascorso in secondi
    lastFrameTime = currentTime;  // Aggiorniamo lastFrameTime con il tempo corrente
    return delta;
}

// Aggiungere un listener per gli eventi di pressione dei tasti
window.addEventListener('keydown', gestisciMovimento);

// Classe CaricaElettrica rimane la stessa
class CaricaElettrica {
    constructor(x, y, vx, vy, carica, massa, moves, angoloIniziale) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.carica = carica;
        this.radius = 10;
        this.moves = moves;
        
        if(massa > 0) {
            this.massa = massa;
        }
        else this.massa = 0.01;

        this.velFactor = 1500;
        this.posFactor = 500;
        this.angolo = angoloIniziale;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x*zoom + cameraX, this.y*zoom + cameraY, this.radius*zoom, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.vx*this.posFactor*dt;
        this.y += this.vy*this.posFactor*dt;

        // Per ogni carica, calcola il vettore forza
        if(this.moves) {
            

            let vettoreTotaleX = 0;
            let vettoreTotaleY = 0;
            cariche.forEach(carica => {
                const dx = this.x - carica.x;
                const dy = this.y - carica.y;
                const distanza = Math.sqrt(dx * dx + dy * dy);  // Distanza euclidea

                if (distanza > 0) {  // Evita di dividere per 0
                    const forza = this.carica*carica.carica / (distanza * distanza);  // Modulo della forza

                    // Somma il contributo della carica al vettore totale
                    vettoreTotaleX += forza * (dx / distanza);  // Componente x
                    vettoreTotaleY += forza * (dy / distanza);  // Componente y
                }
            });

            this.vx += vettoreTotaleX*this.velFactor*dt/this.massa;
            this.vy += vettoreTotaleY*this.velFactor*dt/this.massa;
        }

        
    }
}

// Funzione per mappare l'intensità su un colore RGB (dal blu al rosso)
function intensitaToColore(intensita) {
    // Normalizziamo l'intensità a un valore compreso tra 0 e 1 (puoi aggiustare in base ai tuoi valori)
    const intensitaNorm = Math.min(Math.pow(intensita, 1/4) / 0.2, 1);  // Supponiamo che 0.01 sia il massimo
    // Colore blu -> rosso: variazione dal blu (#0000FF) al rosso (#FF0000)
    const r = Math.floor(Math.pow(2.71, -2*(intensitaNorm - 1)*(intensitaNorm - 1))*255);    // Valore del rosso aumenta con l'intensità
    const g = Math.floor(Math.pow(2.71, -10*(intensitaNorm - 0.4)*(intensitaNorm - 0.4))*255);                                  
    const b = Math.floor(Math.pow(2.71, -10*(intensitaNorm)*(intensitaNorm))*255);  // Valore del blu diminuisce con l'intensità

    return `rgb(${r}, ${g}, ${b})`;  // Restituisce il colore come stringa RGB
}

// Funzione per disegnare frecce (vettori) su un canvas
function drawArrow(ctx, fromX, fromY, toX, toY, colore) {
    const headLength = 5;  // Lunghezza della testa della freccia
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    // Disegna la linea principale della freccia
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = colore;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Disegna le teste della freccia
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(toX, toY);
    ctx.closePath();
    ctx.fillStyle = colore;
    ctx.fill();
}

// Funzione che calcola e disegna il vettore risultante per ogni punto
function disegnaCampo(cariche, passo) {
    // Scorri tutti i punti del canvas
    for (let x = 0; x < canvas.width; x += passo) {
        for (let y = 0; y < canvas.height; y += passo) {
            let vettoreTotaleX = 0;
            let vettoreTotaleY = 0;

            // Convertiamo le coordinate dal sistema di vista (camera + zoom) al sistema globale
            let xMondo = (x - cameraX) / zoom;
            let yMondo = (y - cameraY) / zoom;

            // Per ogni carica, calcola il vettore forza su (x, y)
            cariche.forEach(carica => {
                const dx = xMondo - carica.x;  // Distanza lungo l'asse x
                const dy = yMondo - carica.y;  // Distanza lungo l'asse y
                const distanza = Math.sqrt(dx * dx + dy * dy);  // Distanza euclidea

                if (distanza > 0) {  // Evita di dividere per 0
                    const forza = carica.carica / (distanza * distanza);  // Modulo della forza

                    // Somma il contributo della carica al vettore totale
                    vettoreTotaleX += forza * (dx / distanza);  // Componente x
                    vettoreTotaleY += forza * (dy / distanza);  // Componente y
                }
            });
            
            const vettoreTotaleNormX = vettoreTotaleX / Math.sqrt(vettoreTotaleX*vettoreTotaleX + vettoreTotaleY*vettoreTotaleY);
            const vettoreTotaleNormY = vettoreTotaleY / Math.sqrt(vettoreTotaleX*vettoreTotaleX + vettoreTotaleY*vettoreTotaleY);

            // Disegna il vettore risultante come una freccia
            const fineX = x + vettoreTotaleNormX * 20;  // Moltiplica per scalar per visibilità
            const fineY = y + vettoreTotaleNormY * 20;
            drawArrow(ctx, x, y, fineX, fineY, intensitaToColore(Math.sqrt(vettoreTotaleX*vettoreTotaleX + vettoreTotaleY*vettoreTotaleY)));
        }
    }
}

//Mette la carica in moto circolare uniforme intorno ad un centro
function motoCircolare(carica, centroX, centroY, raggio, velocita) {
    if(raggio > 0) {
        carica.angolo += dt;

        carica.x = centroX + raggio*Math.cos(carica.angolo*velocita);
        carica.y = centroY + raggio*Math.sin(carica.angolo*velocita);

        //sistema l'angolo
        if(carica.angolo > 2*Math.PI/velocita) {
            carica.angolo = carica.angolo - 2*Math.PI/velocita;
        }

    }
}

// Setup del canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

