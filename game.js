// Configurações do Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamanho de cada tile e do personagem
const tileSize = 32;

// Mapas de tiles
const mapa = [
  [0, 1, 0, 0, 2, 1, 0, 1, 0, 2],
  [0, 0, 1, 2, 0, 0, 1, 2, 0, 0],
  [1, 0, 2, 1, 0, 2, 1, 0, 2, 1],
  [0, 1, 1, 0, 2, 0, 0, 1, 1, 0],
  [2, 0, 0, 1, 0, 2, 1, 0, 1, 2],
];

// Carregamento das imagens dos tiles
const tileImages = {
  0: "img/grass.png",  // Grama
  1: "img/stone.png",  // Pedra
  2: "img/water.png",  // Água
};
const loadedImages = {};

for (const [key, src] of Object.entries(tileImages)) {
  const img = new Image();
  img.src = src;
  loadedImages[key] = img;
}

// Configuração do personagem
const player = {
  x: 0,
  y: 0,
  width: tileSize,
  height: tileSize,
  color: "yellow",
};

// Função para desenhar o mapa
function drawMap() {
  for (let row = 0; row < mapa.length; row++) {
    for (let col = 0; col < mapa[row].length; col++) {
      const tileType = mapa[row][col];
      ctx.drawImage(
        loadedImages[tileType],
        col * tileSize,
        row * tileSize,
        tileSize,
        tileSize
      );
    }
  }
}

// Função para desenhar o jogador
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Função para atualizar a posição do jogador
function movePlayer(direction) {
  const speed = tileSize;

  if (direction === "left" && player.x > 0) player.x -= speed;
  if (direction === "right" && player.x < canvas.width - tileSize) player.x += speed;
  if (direction === "up" && player.y > 0) player.y -= speed;
  if (direction === "down" && player.y < canvas.height - tileSize) player.y += speed;

  renderGame();
}

// Função de renderização do jogo
function renderGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
  drawMap(); // Desenha o mapa
  drawPlayer(); // Desenha o jogador
}

// Controle de movimentos via teclado
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      movePlayer("left");
      break;
    case "ArrowRight":
      movePlayer("right");
      break;
    case "ArrowUp":
      movePlayer("up");
      break;
    case "ArrowDown":
      movePlayer("down");
      break;
  }
});

// Carregar imagens e iniciar o jogo
window.onload = () => {
  renderGame();
};
