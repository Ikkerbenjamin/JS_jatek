const jatekTer = document.querySelector("#jatekTer");
const ctx = jatekTer.getContext("2d");
const pontszamSzoveg = document.querySelector("#pontszamSzoveg");
const ujrainditGomb = document.querySelector("#ujrainditGomb");
const inditGomb = document.querySelector("#inditGomb");
const jatekSzelesseg = jatekTer.width;
const jatekMagassag = jatekTer.height;
const tablaHatter = "forestgreen";
const uto1Szine = "lightblue";
const uto2Szine = "red";
const utoSzegely = "black";
const labdaSzine = "white";
const labdaSzegelySzine = "black";
const labdaSugar = 12.5;
const utoSebesseg = 50;
const maxPontszam = 10;
let idozito;
let labdaSebesseg;
let labdaX = jatekSzelesseg / 2;
let labdaY = jatekMagassag / 2;
let labdaXIrany = 0;
let labdaYIrany = 0;
let jatekos1Pont = 0;
let jatekos2Pont = 0;
let uto1 = {
  szelesseg: 25,
  magassag: 100,
  x: 0,
  y: 0,
};
let uto2 = {
  szelesseg: 25,
  magassag: 100,
  x: jatekSzelesseg - 25,
  y: jatekMagassag - 100,
};

inditGomb.addEventListener("click", jatekInditasa);
ujrainditGomb.addEventListener("click", jatekUjrainditasa);
window.addEventListener("keydown", iranyValtoztatasa);

function jatekInditasa() {
  inditGomb.disabled = true; 
  labdaLetrehozasa();
  kovetkezoKor();
}

function kovetkezoKor() {
  idozito = setTimeout(() => {
    tablaTorlese();
    utokRajzolasa();
    labdaMozgatasa();
    labdaRajzolasa(labdaX, labdaY);
    utkozesEllenorzes();
    if (!gyoztesVan()) {
      kovetkezoKor(); 
    }
  }, 10);
}

function tablaTorlese() {
  ctx.fillStyle = tablaHatter;
  ctx.fillRect(0, 0, jatekSzelesseg, jatekMagassag);
}

function utokRajzolasa() {
  ctx.strokeStyle = utoSzegely;

  ctx.fillStyle = uto1Szine;
  ctx.fillRect(uto1.x, uto1.y, uto1.szelesseg, uto1.magassag);
  ctx.strokeRect(uto1.x, uto1.y, uto1.szelesseg, uto1.magassag);

  ctx.fillStyle = uto2Szine;
  ctx.fillRect(uto2.x, uto2.y, uto2.szelesseg, uto2.magassag);
  ctx.strokeRect(uto2.x, uto2.y, uto2.szelesseg, uto2.magassag);
}

function labdaLetrehozasa() {
  labdaSebesseg = 1;
  labdaXIrany = Math.random() < 0.5 ? 1 : -1;
  labdaYIrany = Math.random() < 0.5 ? Math.random() : -Math.random();
  labdaX = jatekSzelesseg / 2;
  labdaY = jatekMagassag / 2;
  labdaRajzolasa(labdaX, labdaY);
}

function labdaMozgatasa() {
  labdaX += labdaSebesseg * labdaXIrany;
  labdaY += labdaSebesseg * labdaYIrany;
}

function labdaRajzolasa(x, y) {
  ctx.fillStyle = labdaSzine;
  ctx.strokeStyle = labdaSzegelySzine;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, labdaSugar, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

function utkozesEllenorzes() {
  if (labdaY <= 0 + labdaSugar || labdaY >= jatekMagassag - labdaSugar) {
    labdaYIrany *= -1;
  }
  if (labdaX <= 0) {
    jatekos2Pont++;
    pontszamFrissitese();
    labdaLetrehozasa();
  }
  if (labdaX >= jatekSzelesseg) {
    jatekos1Pont++;
    pontszamFrissitese();
    labdaLetrehozasa();
  }
  if (
    labdaX <= uto1.x + uto1.szelesseg + labdaSugar &&
    labdaY > uto1.y &&
    labdaY < uto1.y + uto1.magassag
  ) {
    labdaXIrany *= -1;
    labdaSebesseg += 0.5;
  }
  if (
    labdaX >= uto2.x - labdaSugar &&
    labdaY > uto2.y &&
    labdaY < uto2.y + uto2.magassag
  ) {
    labdaXIrany *= -1;
    labdaSebesseg += 0.5;
  }
}

function iranyValtoztatasa(event) {
  const leutottGomb = event.keyCode;
  const uto1Fel = 87;
  const uto1Le = 83;
  const uto2Fel = 38;
  const uto2Le = 40;

  switch (leutottGomb) {
    case uto1Fel:
      if (uto1.y > 0) {
        uto1.y -= utoSebesseg;
      }
      break;
    case uto1Le:
      if (uto1.y < jatekMagassag - uto1.magassag) {
        uto1.y += utoSebesseg;
      }
      break;
    case uto2Fel:
      if (uto2.y > 0) {
        uto2.y -= utoSebesseg;
      }
      break;
    case uto2Le:
      if (uto2.y < jatekMagassag - uto2.magassag) {
        uto2.y += utoSebesseg;
      }
      break;
  }
}

function pontszamFrissitese() {
  pontszamSzoveg.textContent = `${jatekos1Pont} : ${jatekos2Pont}`;
}

function gyoztesVan() {
  if (jatekos1Pont >= maxPontszam) {
    pontszamSzoveg.textContent = "A kék játékos nyert!";
    clearTimeout(idozito);
    return true;
  }
  if (jatekos2Pont >= maxPontszam) {
    pontszamSzoveg.textContent = "A piros játékos nyert nyert!";
    clearTimeout(idozito);
    return true;
  }
  return false;
}

function jatekUjrainditasa() {
  jatekos1Pont = 0;
  jatekos2Pont = 0;
  uto1.y = 0;
  uto2.y = jatekMagassag - uto2.magassag;
  pontszamFrissitese();
  clearTimeout(idozito);
  inditGomb.disabled = false;
}
