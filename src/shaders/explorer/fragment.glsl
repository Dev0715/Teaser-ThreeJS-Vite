uniform sampler2D iChannel0;

varying vec2 vUv;

void main() {

    // Explorer ==================================================
    vec4 diffuseExplorer = texture2D(iChannel0, vUv) * 0.8;
    gl_FragColor = mix(vec4(0.0, 0.0, 0.0, 1.0), diffuseExplorer, 1. - diffuseExplorer.w);

}