function setup()
{
synth = window.speechSynthesis
canvas = createCanvas(400, 400)
canvas.center()
background('#fff')
canvas.mouseReleased(classifyCanvas)
}

function preload()
{
 classifier = ml5.imageClassifier('DoodleNet')
}

function draw()
{ 
    strokeWeight(10)
    stroke(0)

    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResults)
}

function gotResults(error, results)
{
    if(error) {
        console.error(error)
    }

    else {
        console.log(results)

        var nome = results[0].label
        var precisao = results[0].confidence
        nome = nome.replace('_', ' ')
        console.log(nome)
        document.getElementById('nomeDesenho').innerHTML = nome
        precisao = precisao * 100
        precisao = Math.round(precisao)
        document.getElementById('precisaoDesenho').innerHTML = precisao + '%'
        var falar = new SpeechSynthesisUtterance(nome)
        synth.speak(falar)
    }
}


 function limparCanvas()
{
    background('white')
}
