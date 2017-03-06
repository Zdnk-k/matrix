var symbolSize = 16;
var fadeInterval = 1.25;
var streams = [];

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
  textFont('Consolas');
}

function draw() {
  background(0, 125);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x
  this.y = y
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(2,25));
  this.first = first;
  this.opacity = opacity;

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set to katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      } else {
        // set to numeric
        this.value = round(random(0, 9));
      }
    }
  }

  this.rain = function(){
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
}

function Stream(x, y) {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(5, 22);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i=0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol()
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
      opacity -= (255 / this.totalSymbols) / fadeInterval;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }

}
