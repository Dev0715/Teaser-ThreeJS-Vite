uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;

uniform float iFrequency;

uniform vec2 iResolution;
uniform float iTime;
uniform vec4 iMouse;

varying vec2 vUv;

vec3 CYAN = vec3(0.243, 0.808, 0.898);

// https://www.shadertoy.com/view/lsf3WH
// replace this by something better
float Math_Random(vec2 p) {
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
}

float noise(vec2 coords) {
    vec2 texSize = vec2(1.0);
    vec2 pc = coords * texSize;
    vec2 base = floor(pc);

    float s1 = Math_Random((base + vec2(0.0, 0.0)) / texSize);
    float s2 = Math_Random((base + vec2(1.0, 0.0)) / texSize);
    float s3 = Math_Random((base + vec2(0.0, 1.0)) / texSize);
    float s4 = Math_Random((base + vec2(1.0, 1.0)) / texSize);

    vec2 f = smoothstep(0.0, 1.0, fract(pc));

    float px1 = mix(s1, s2, f.x);
    float px2 = mix(s3, s4, f.x);
    float result = mix(px1, px2, f.y);
    return result;
}

float sdfLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);

    return length(pa - ba * h);
}

float evaluateFunction(float x) {
    float y = 0.0;

    float amplitude = 128.0;
    float frequency = 1.0 / 64.0;

    y += noise(vec2(x) * frequency) * amplitude;
    y += noise(vec2(x) * frequency * 2.0) * amplitude * 0.5;
    y += noise(vec2(x) * frequency * 4.0) * amplitude * 0.25;

    return y;
}

float plotFunction(vec2 p, float px, float curTime) {
    float result = 100000.0;

    for(float i = -2.0; i < 2.0; i += 1.0) {
        vec2 c1 = p + vec2(px * i, 0.0);
        vec2 c2 = p + vec2(px * (i + 1.0), 0.0);

        vec2 a = vec2(c1.x, evaluateFunction(c1.x + curTime));
        vec2 b = vec2(c2.x, evaluateFunction(c2.x + curTime));
        result = min(result, sdfLine(p, a, b));
    }

    return result;
}

void main() {

    vec2 pixelCoords = (vUv - 0.5) / 2. * iResolution;

    vec3 colour = vec3(0.0);

    // Draw graph of our function
    float distToFunction = plotFunction(pixelCoords, 2.0, iTime * 96.0);
    vec3 lineColour = CYAN * mix(1.0, 0.25, smoothstep(0.0, 3.0, iFrequency * 0.01));
    float lineBorder = smoothstep(4.0, 6.0, distToFunction);

    colour = mix(lineColour, colour, lineBorder);
    gl_FragColor.xyz = colour;
    gl_FragColor.w = 1.;

}