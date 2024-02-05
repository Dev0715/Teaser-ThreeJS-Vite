### Date created

2024-01-25

### Project Title

Aurora audio visualizer

### Description

**Requirements**

This code creates a basic 3D scene with a mesh that can represent the aurora. You need to replace the meshStandardMaterial with a custom shader material or texture that simulates the aurora effect. Three.js shader materials allow for highly customizable and dynamic visual effects, which would be ideal for simulating the fluid, dynamic appearance of the Northern Lights.

Creating a realistic aurora effect is complex and typically requires fragment shaders to dynamically generate the light patterns. For a detailed and realistic effect, you might need to delve into GLSL (OpenGL Shading Language) to write custom vertex and fragment shaders.

Unfortunately, writing a complete shader for aurora borealis is your task for this project, as it's quite complex and involves understanding of 3D graphics programming and shader development. You might find existing Three.js examples or community shaders that you can adapt for your project.

Remember, the key to achieving a realistic aurora effect lies in the shader code and the dynamic updates in the useFrame hook.

**Fixes**

- now the logo animation runs continuously
- I've added procedural generated clouds, but commented them out, because they don't resemble the sample video
- moved some fog and the explorer in different layers, on top of the logo
- tweaked the fog a bit, to resemble the sample
- tweaked the aurora a bit

## Project Setup

Setup [Node.js](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/) with Node version manager (nvm), and [http-server](https://www.npmjs.com/package/http-server).

1. clone the Project - git clone https://github.com/2Advanced/teaserV24
2. `cd teaserV24`
3. install the dependencies - `npm install`
4. run tests if you have - `npm run test`
5. run the dev server - `npm run dev`  
   You will see on the terminal something like this:
   ➜ Local: http://localhost:5173/
   ➜ Network: http://192.168.0.102:5173/
   ➜ press h to show help
   You can open the Network link on any device from your local network, like your mobile, to test the app.
6. run build for production - `npm run build -- --sourcemap hidden` (creates a folder named 'dist' that contains the uglified and bundled code; you can send this to the client)
7. cs dist
8. http-server -p 8034 -o --cors

#### Files

```bash
.
├── App.tsx
├── components
│   ├── audio
│   │   ├── Analizer1.tsx
│   │   └── Analizer2.tsx
│   ├── canvas
│   │   ├── Aurora.tsx
│   │   ├── Explorer.tsx
│   │   ├── Lights.tsx
│   │   ├── Logo.tsx
│   │   └── RollingClouds.tsx
│   ├── Layout.tsx
│   ├── Scene1.tsx
│   ├── Scene2.tsx
│   └── Scene.tsx
├── context
│   ├── ErrorBoundary.tsx
│   ├── PageError.tsx
│   └── theme.tsx
├── lib
│   ├── createAudio.tsx
│   ├── math.tsx
│   └── utils.ts
├── main.tsx
├── shaders
│   ├── audio
│   │   └── fragmentShader.js
│   ├── aurora
│   │   └── fragmentShader.js
│   ├── clouds
│   │   └── fragmentShader.js
│   ├── explorer
│   │   └── fragmentShader.js
│   ├── lights
│   │   └── fragmentShader.js
│   └── vertexShader.js
├── style
│   ├── fontki.css
│   ├── fonts
│   │   └── Ki
│   │       ├── Ki-Bold-Italic.otf
│   │       ├── Ki-Bold.otf
│   │       ├── Ki-ExtraBold-Italic.otf
│   │       ├── Ki-ExtraBold.otf
│   │       ├── Ki-ExtraLight-Italic.otf
│   │       ├── Ki-ExtraLight.otf
│   │       ├── Ki-Italic.otf
│   │       ├── Ki-Light-Italic.otf
│   │       ├── Ki-Light.otf
│   │       ├── Ki-Medium-Italic.otf
│   │       ├── Ki-Medium.otf
│   │       ├── Ki-Regular.otf
│   │       ├── Ki-Thin-Italic.otf
│   │       └── Ki-Thin.otf
│   ├── globals.css
│   └── style.css
└── vite-env.d.ts
```

### Remarks

### TODO

There are still some things that would improve the scene, like:

- use sound data texture for the line animation on top, or maybe use D3.js for the line and bars sound animations
- use a different noise for aurora
- modify the clouds to look like storm clouds, and resemble the assets
- use post-processing with glow for the text animation

### References
