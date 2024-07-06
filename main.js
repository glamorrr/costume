const CLOTHING_IMAGES = [
  './images/female-clothing/Corset v2 Long Sleeves.png',
  './images/female-clothing/Green bikini.png',
  './images/female-clothing/Green Bodice Long Sleeves.png',
  './images/female-clothing/Green Bodice Mid Sleeves.png',
  './images/female-clothing/Green Bodice.png',
  './images/female-clothing/Green Corset Long Sleeves.png',
  './images/female-clothing/Green Corset v2 Long Sleeves.png',
  './images/female-clothing/Long dress blue.png',
  './images/female-clothing/Long dress green.png',
  './images/female-clothing/Long dress orange.png',
  './images/female-clothing/Long dress purple.png',
  './images/female-clothing/Long dress red.png',
  './images/female-clothing/Orange bikini.png',
  './images/female-clothing/Orange Bodice Long Sleeves.png',
  './images/female-clothing/Orange Bodice Mid Sleeves.png',
  './images/female-clothing/Orange Bodice.png',
  './images/female-clothing/Orange Corset Long Sleeves.png',
  './images/female-clothing/Orange Corset v2 Long Sleeves.png',
  './images/female-clothing/Pink Thigh-High Boots.png',
  './images/female-clothing/Purple bikini.png',
  './images/female-clothing/Purple Bodice Long Sleeves.png',
  './images/female-clothing/Purple Bodice Mid Sleeves.png',
  './images/female-clothing/Purple Bodice.png',
  './images/female-clothing/Purple Corset Long Sleeves.png',
  './images/female-clothing/Purple Corset v2 Long Sleeves.png',
  './images/female-clothing/Red bikini.png',
  './images/female-clothing/Red Bodice Long Sleeves.png',
  './images/female-clothing/Red Bodice Mid Sleeves.png',
  './images/female-clothing/Red Bodice.png',
  './images/female-clothing/Red Thigh-High Boots.png',
  './images/female-clothing/Short Skirt.png',
  './images/female-clothing/Black Thigh-High Boots.png',
  './images/female-clothing/Blue bikini.png',
  './images/female-clothing/Blue Bodice Long Sleeves.png',
  './images/female-clothing/Blue Bodice Mid Sleeves.png',
  './images/female-clothing/Blue Bodice.png',
  './images/female-clothing/Blue Corset Long Sleeves.png',
  './images/female-clothing/Blue Corset v2 Long Sleeves.png',
  './images/female-clothing/Blue dress.png',
  './images/female-clothing/Brown Thigh-High Boots.png',
  './images/female-clothing/Corset Long Sleeves.png',
];

const HAIR_IMAGES = [
  './images/female-hair/Female Hair17.png',
  './images/female-hair/Female Hair18.png',
  './images/female-hair/Female Hair19.png',
  './images/female-hair/Female Hair20.png',
  './images/female-hair/Female Hair21.png',
  './images/female-hair/Female Hair22.png',
  './images/female-hair/Female Hair23.png',
  './images/female-hair/Female Hair24.png',
  './images/female-hair/Female Hair25.png',
  './images/female-hair/Female Hair26.png',
  './images/female-hair/Female Hair27.png',
  './images/female-hair/Female Hair28.png',
  './images/female-hair/Female Hair29.png',
  './images/female-hair/Female Hair30.png',
  './images/female-hair/Female Hair31.png',
  './images/female-hair/Female Hair32.png',
  './images/female-hair/Female Hair33.png',
  './images/female-hair/Female Hair34.png',
  './images/female-hair/Female Hair35.png',
  './images/female-hair/Female Hair6.png',
  './images/female-hair/Female Hair7.png',
  './images/female-hair/Female Hair8.png',
  './images/female-hair/Female Hair9.png',
  './images/female-hair/Female Hair10.png',
  './images/female-hair/Female Hair11.png',
  './images/female-hair/Female Hair12.png',
  './images/female-hair/Female Hair13.png',
  './images/female-hair/Female Hair14.png',
  './images/female-hair/Female Hair15.png',
  './images/female-hair/Female Hair16.png',
];

const characterState = {
  clothing: null,
  hair: null,
};

class FemaleClothing {
  constructor(clothing) {
    this.image = new Image();
    this.image.src = clothing;
  }
}

class FemaleHair {
  constructor(hair) {
    this.image = new Image();
    this.image.src = hair;
  }
}

class Female {
  constructor({ canvas, clothing, hair }) {
    this.canvas = {
      width: canvas.width,
      height: canvas.height,
    };
    this.image = new Image();
    this.image.src = './images/Female Skin2.png';
    this.scale = 4;
    this.spriteWidth = 80;
    this.spriteHeight = 64;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height / 2 - this.height / 2;
    this.minFrame = 0;
    this.maxFrame = 4;
    this.frame = 0;

    this.clothing = clothing && new FemaleClothing(clothing);
    this.hair = hair && new FemaleHair(hair);

    this.animate = {};
    this.animate.idle = this._idleAnimate.bind(this);
  }

  _idleAnimate(context) {
    this._idleDraw(context);
    this._idleUpdate();
  }

  _idleDraw(context) {
    context.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (this.clothing) {
      context.drawImage(
        this.clothing.image,
        this.frame * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    if (this.hair) {
      context.drawImage(
        this.hair.image,
        this.frame * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  _idleUpdate() {
    if (this.frame < this.maxFrame) {
      this.frame++;
    } else {
      this.frame = this.minFrame;
    }
  }

  _isSpritesLoaded(imgElements) {
    return imgElements.every((img) => img.complete && img.naturalWidth !== 0);
  }
}

var canvas = document.querySelector('canvas');
canvas.width = 300;
canvas.height = 300;
var context = canvas.getContext('2d');

let female = new Female({
  canvas,
  ...characterState,
});

function ui() {
  CLOTHING_IMAGES.forEach((src) => {
    const chooserEl = document.createElement('button');
    chooserEl.className = 'group';
    chooserEl.innerHTML = `
      <div class="relative w-32 overflow-hidden border p-2 rounded group-active:scale-[.9] transition-all group-hover:bg-pink-50 group-hover:border-pink-200">
        <img src="${src} ">
      </div>
      <p class="mt-1 max-w-[200px] text-left line-clamp-1 group-hover:text-pink-600">${
        src.split('/').pop().split('.')[0]
      }</p>
    `;

    chooserEl.addEventListener('click', () => {
      characterState.clothing = src;
      female = new Female({
        canvas,
        ...characterState,
      });
      document.querySelector('.clothing').textContent = src.split('/').pop().split('.')[0];
    });

    document.querySelector('.chooser-clothing').append(chooserEl);
  });

  HAIR_IMAGES.forEach((src) => {
    const chooserEl = document.createElement('button');
    chooserEl.className = 'group';
    chooserEl.innerHTML = `
      <div class="relative w-32 overflow-hidden border p-2 rounded group-active:scale-[.9] transition-all group-hover:bg-pink-50 group-hover:border-pink-200">
        <img src="${src}">
      </div>
      <p class="mt-1 max-w-[200px] text-left line-clamp-1 group-hover:text-pink-600">${
        src.split('/').pop().split('.')[0]
      }</p>
    `;

    chooserEl.addEventListener('click', () => {
      characterState.hair = src;
      female = new Female({
        canvas,
        ...characterState,
      });
      document.querySelector('.hair').textContent = src.split('/').pop().split('.')[0];
    });

    document.querySelector('.chooser-hair').append(chooserEl);
  });
}

ui();

let lastFrameTime = 0;
const fps = 10; // Desired frames per second
const interval = 1000 / fps;

function animate(currentTime) {
  let id;
  cancelAnimationFrame(id);

  const deltaTime = currentTime - lastFrameTime;

  if (deltaTime >= interval) {
    lastFrameTime = currentTime - (deltaTime % interval);

    context.clearRect(0, 0, canvas.width, canvas.height);

    female.animate.idle(context);
  }

  id = requestAnimationFrame(animate);
}

animate();
