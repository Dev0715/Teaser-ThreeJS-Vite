uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;

uniform vec2 iResolution;
uniform float iTime;
uniform vec4 iMouse;

uniform float iSaturation;
uniform float iAnotherSaturation;
uniform float iHowMuchGreen;
uniform float iColorShift;
uniform float iRepeatStripeAt;
uniform float iIntensity;

varying vec2 vUv;


mat2 mm2(in float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, s, -s, c);
}

mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);

void main() {

    vec2 fragCoord = vUv * iResolution;
    vec2 p = fragCoord.xy / iResolution.xy - 0.5;
    p.x *= iResolution.x/iResolution.y;

    vec3 ro = vec3(0, 0, -6.7);
    vec3 rd = normalize(vec3(p, 1.3));
    vec2 mo = iMouse.xy / iResolution.xy - .5;
    mo = (mo == vec2(-0.5)) ? mo = vec2(-0.1, 0.1) : mo;
    mo.x *= iResolution.x / iResolution.y;
    rd.yz *= mm2(mo.y);

    vec3 col = vec3(0.);

    // Explorer ==================================================
    vec4 diffuseExplorer = texture2D(iChannel0, vUv)*0.8;
    gl_FragColor = mix(vec4(col,1.0),  diffuseExplorer,  1. -diffuseExplorer.w);

}