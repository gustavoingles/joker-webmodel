# Atividade Three.js + Sketchfab

Cena 3D interativa na web com Three.js carregando modelo GLTF/GLB do Sketchfab.

## Modelo

- **Nome:** Joker — Persona 5 Strikers
- **Fonte (Sketchfab):** <https://sketchfab.com/3d-models/joker-persona-5-strikets-9ec3f7b50a994023ad6e9d9ddfd95ec1>
- **Arquivo local:** `model/scene.glb`
- **Licença:** verifique a página do Sketchfab (CC Attribution ou equivalente).

> Modelo original veio em FBX + DDS. Convertido para `.glb` para uso com `GLTFLoader`.

## Como executar

Não precisa `npm install` — usa Three.js via CDN. Basta servir os arquivos estáticos:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

Abra `http://localhost:8080` no navegador.

## Controles

- **Arrastar (botão esquerdo):** rotaciona a câmera
- **Scroll:** zoom in/out
- **Arrastar (botão direito) / dois dedos:** pan

## Stack

- `three@0.165.0` via `cdn.jsdelivr.net`
- `WebGLRenderer` + `PerspectiveCamera` + `Scene`
- `AmbientLight` + `DirectionalLight` (+ luz de preenchimento)
- `GLTFLoader` para o modelo
- `OrbitControls` para câmera
- Loop com `requestAnimationFrame` + handler de `resize`

## Estrutura

```
.
├── index.html
├── main.js
├── model/
│   └── scene.glb
└── README.md
```
