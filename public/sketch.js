let canvas;
let URL = 'https://catfact.ninja/fact';
let URL2 = 'https://randomuser.me/api/';
let URL3 = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
let URL4 = 'https://api.coindesk.com/v1/bpi/currentprice.json'
let URL5 = 'https://dog.ceo/api/breeds/image/random'
let texto = null;
let image1 = null;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    background(0);
    newCursor();
    textSize(30);
    textWrap(WORD);
    textAlign(CORNER,CENTER);
    text(`Teclas
    
        A: Gatos

        S: Usuario

        D: Población USA

        F: Bitcoin

        G: ¡Perritos!`,100,300,300)

    if(texto != null) {
        textAlign(CORNER,CENTER);
    text(texto, windowWidth/2 - 200, 300, 400);
    }

    if (image1 != null) {
            imageMode(CENTER);
            image(image1, windowWidth/2, windowHeight/2);
    }
    

    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
    fill(255);

    switch (key) {
        case "a":
            image1 = null;
            fetch(URL)
            .then(response => response.json())
            .then(data => {texto=data.fact})

            break;

        case "s":
            image1 = null
            fetch(URL2)
            .then(response => response.json())
            .then(data => {texto= `Nombre: ${data.results[0].name.first} ${data.results[0].name.last}
            Email: ${data.results[0].email}
            Contraseña: ${data.results[0].login.password}`})
            break

        case "d":
            image1 = null
            fetch(URL3)
            .then(response => response.json())
            .then(response2 => {
                let array=response2.data
                return array
                })
            .then(data => {
                let number = parseInt(random(7))
                texto = `Población en los Estados Unidos
            Año: ${data[number].Year}
            Población: ${data[number].Population}`})
            break;
        case "f":
            image1 = null
            let tiempo = null
            fetch(URL4)
            .then(response => response.json())
            .then(response2 => {
                tiempo = response2.time.updated
                let array=response2.bpi
                return array
                })
            .then(data => {
                texto = `¡Precio del Bitcoin!
                
                USD $${data.USD.rate}

                EU $${data.EUR.rate}
                
                Ultima actualización: ${tiempo}`
            })
            break;

        case "g":
            fetch(URL5)
            .then(response => response.json())
            .then(data => {
                texto = null;
                image1 = loadImage(data.message)})

        break;
    
        default:
            break;
    }
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}

// se demora en entregar la información. Por eso hay una promesa
// lenguaje interpretado = la red lee linea por liea
// fetch guarda por parametro una URL
// catFact lo igualamos a lo que nos trae el servidor