
# 2Advanced Teaser v.24 Landing Site

## Update History

Initial Project Creation & Commit: 2024-01-25

- Committed initial fileset.
- Included our complete .gitignore.
- Removed some unused project files.
- Tested on local system (not yet Docker Containered).

Last Major Update: 2024-02-05

- Several code updates and organization to the fragment and vertex shaders.
- Logo animation was activated to runs continuously for testing FPS, some additional interaction code to follow.
- I've added procedurally generated clouds, but have commented them out as they still don't match the video.
- Moved some fog effects and the explorer onto different layers, stacked above logo layer.
- Tweaked the fog settings a bit, to more closely resemble the source file.
- Tweaked the aurora a bit, to more closely resemble the source file.
- Added Creative Commons v4.0 Non Commercial License - Share Alike for eventual release of the repo to general public.

### TODO

There are still some things that have to happen to improve the overall experience:

- Incorporate a pre-loader animation logo scene to make the experience more fluid.
- Mouse interaction with the spinning logo and debris field need to be added.
- Detailed testing of browser resizing, UI rescaling and overall performance.
- Find a similar set of clouds (simmilar to source video) and work on their generation to match.
- Incorporate a pseudo sound data texture for the line animation on top that matches the loop (OR) actually incorporate code using something like [D3.js](https://www.D3js.org/) or [PixiJS](https://pixijs.com/) for the line and bar sound animations.
- Find a different sound effect for the Auroras
- Use post-processing with glow for the text animation
- Work in the Discord Channel link and messaging "Join us on Discord"
- Attach .JS to 2Advanced Cloud Mongo Account (Mailchimp is ridiculous)
- Prepare AWS Instances for Autoscale and CDN at time of launch, then pair back
- Attach Pixel Tracking for Google Analytics
- Work in our Social Icons (Twitter, Facebook, LinkedIn, Instagram, Discord, Github)
- Messaging 2Advanced V.24 (or V.2024 Coming ?When?)
- Add any Easter Eggs, these can also be released after the fact.  For example, once the Ruffle Archive is up we can tweet something out with a puzzle or something to unlock stuff. May even have the old "Kung Fu" flash game that we used way back in the V5-V6 timeframe.

## Project Title

2Advanced v.24 Teaser

## Description

### Basic Requirements

This code base was derived from a Video Trailer and attempts to recreate the entire looping video using WebGL, GLSL and Javascript to create the effects on the fly and entirely without the aid of After Effects or any other pre-rendered components (such as frame-based animation sequences on a timeline). As such, the Aurora Borealis scene was derived entirely from scratch drawing upon some ideas found in popular places such as Shadertoy. The biggest problem here, is that the angles, colors, intensity and lighting had to mimic the source reference movie and therefore presented the greatest amount of trouble.

Moreover, when building a custom shader, you have to find/replace the basic **meshStandardMaterial** with a custom shader material or texture that aids in the simulation of the aurora effect. Three.js shader materials allow for highly customizable and dynamic visual effects, which in the end were a crucial component to simulate the fluid and dynamic appearance of the Northern Lights.

Creating a realistic aurora effect is complex and typically requires fragment shaders to dynamically generate the light patterns. For added detailed and realistic effects, we had to delve deeper into GLSL (OpenGL Shading Language) to write our own custom vertex and fragment shaders.

All in all, the key to achieving a realistic aurora effect lies in the shader code and the dynamic updates in the useFrame hook. Luckily, this is the type of task that offers very little if any help from ChatGPT and other popular AI tools!

## Project Setup, Installation and Dev Environment

Setup [Node.js](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/) with Node version manager (nvm) or better yet on Mac systems, it Node.js should be installed through the aid of [Homebrew](https://brew.sh/), and [http-server](https://www.npmjs.com/package/http-server).

1. First clone the Project to local system `git clone https://github.com/2Advanced/teaserV24`
2. Then change working directory to `cd teaserV24`
3. Next install the dependencies - `npm install`
4. Run any tests if you have them - `npm run test`
5. Launch the dev environment for a local test with - `npm run dev`
   You will see on the terminal something like this:
   ➜ Local: `http://localhost:5173/`
   ➜ Network: `http://192.168.0.102:5173/`
   ➜ press h to show help
6. At this point, you can launch the link on any device from your local network and local mobile & tablet devices, to test the app and it's functionality.

## Pseudo-Staging and Production Environment

1. To run a build for production start with the command `npm run build -- --sourcemap hidden`
   (This creates a folder named 'dist' that contains the bundled code; that you can essentially install on the server for testing between a server and clientsend this to the client)
2. Then change to the production directory with `cd dist`
3. Lauch the App with `http-server -p 8034 -o --cors`

## File Structure

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

### Credits, License, Copyrights, Trademarks and Disclaimers

``` bash
Copyright © `<2024>` `<2Advanced Studios, LLC>`
Copyright (c) 2024 2Advanced Studios, LLC (hereafter "2Advanced")
All rights reserved.

Developed by:     2Advanced Studios, LLC and its Contributors
                  https://www.2advanced.com/
                  https://www.github.com/2Advanced
```

Permission is hereby granted, free of charge, to any person obtaining a copy of this software, GitHub repo, source code, compiled binary code, supporting files and associated documentation files (the "Software"), to deal with the Software without restriction, including without any limitation (other than those hereforth expressed and by the included licenses), the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

1. Any Redistributions of source code must retain the above copyright notice and attributions to 2advanced and its Contributors, this list of conditions and the following disclaimers and associated named licenses.
2. Any Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimers in the documentation and/or other materials provided with the distribution.
3. Neither the legal name(s) of 2Advanced, nor the names of any Contributors may be used to endorse or promote products derived from the Software without specific prior written permission which may be obtained only in writing by our legal department [legal@2advanced.com](mailto:legal@2advanced.com)
4. No Redistributions and/or derviative works whatsoever shall contain any of the registered Copyrights and/or Trademarks (either Registered or Pending) that are the sole property of 2Advanced (such as it's logo) and similarly any content pertaining to the Copyrights and/or Trademarks of any other companies therein found in the Software (such as those belonging to Github, Discord, Facebook, LinkedIn, Twitter, Instagram or any other legal holders) remain the property of their respective owners and are not governed by nor the subject of any claim or license being granted;
   **AND**
5. Its is understood and agreed that 2Advanced and its Contributors are wholy responsible for this creation, maintenance, and ongoing governing claims associated with the Software thus expressly claims that the Software is provided "AS IS", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and/or noninfringement. In no event shall 2Advanced, its Contributors or any copyright or trademark holder be liable for any claim, damages or other liabiity, whether in action of contract, tort or otherwise, arising from, out of or in connection with the Software or the use or any other dealings with the Software.

Any and all Copyrights and Trademarks (both Registered and Pending) applicable to content hereunder remain the sole and exclusive property of 2Advanced Studios, LLC. As such the open-source shared nature of these files along with any logos and/or intellectual property that we have included cannot be used for any other commercial or public display. It is further understood and agreed that you will replace such content in the event that you choose to use this project.

Finally, take note that there are two licenses further clarifying the governance of the content matter included herein with the Software: 1. The Creative Commons Share Alike 4.0 license as specified in the included files [LICENSE-CC.md](./LICENSE-CC.md) which is intended to apply specifically to any textual or graphical contentw other than 2Advanced proprietary logos and/or registered trademarks as stated above **AND** 2. The sourcecode and all related files (either textual or binary) which are governed under the MIT License (to the extent that the conditions above are also met) and are further specified in the included file [LICENSE.md](./LICENSE.md).
