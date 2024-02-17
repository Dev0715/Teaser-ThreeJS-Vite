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

#define time iTime * 7.

mat2 mm2(in float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, s, -s, c);
}

float hash21(in vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); 
}

float random(float p) {
    return fract(sin(p)*10000.0);
}

float noise(vec2 p) {
    return random(p.x + p.y*10000.0);
}

float stepNoise(vec2 p) {
    return noise(floor(p));
}

vec2 sw(vec2 p) { return vec2( floor(p.x), floor(p.y) ); }
vec2 se(vec2 p) { return vec2( ceil(p.x), floor(p.y) ); }
vec2 nw(vec2 p) { return vec2( floor(p.x), ceil(p.y) ); }
vec2 ne(vec2 p) { return vec2( ceil(p.x), ceil(p.y) ); }

float smoothNoise(vec2 p) {
    vec2 inter = smoothstep(0., 1., fract(p));
    float s = mix(noise(sw(p)), noise(se(p)), inter.x);
    float n = mix(noise(nw(p)), noise(ne(p)), inter.x);
    return mix(s, n, inter.y);
    return noise(nw(p));
}


#define ITR 10
#define FAR 30.
// mat2 mm2(in float a){float c = cos(a), s = sin(a);return mat2(c,s,-s,c);}

float height(in vec2 p) {
    p *= 0.2;
    return sin(p.y)*0.4 + sin(p.x)*0.4;
}

//smooth min (https://iquilezles.org/articles/smin)
float smin( float a, float b) {
    float h = clamp(0.5 + 0.5*(b-a)/0.7, 0.0, 1.0);
    return mix(b, a, h) - 0.7*h*(1.0-h);
}

vec2 nmzHash22(vec2 q) {
    uvec2 p = uvec2(ivec2(q));
    p = p*uvec2(3266489917U, 668265263U) + p.yx;
    p = p*(p.yx^(p >> 15U));
    return vec2(p^(p >> 16U))*(1.0/vec2(0xffffffffU));
}

float map(vec3 p) {
    p.y += height(p.zx)*0.1;
    vec3 bp = p;
    vec2 hs = nmzHash22(floor(p.zx/4.));
    p.zx = mod(p.zx,4.)-2.;
    float d = p.y+0.5;

    return d*1.1;
}

float march(in vec3 ro, in vec3 rd) {
    float precis = 0.002;
    float h = precis * 2.;
    float d = 0.;
    for ( int i=0; i<ITR; i++ ) {
        if( abs(h)<precis || d>FAR ) break;
        d += h;
        float res = map(ro+rd*d);
        h = res;
    }
    return d;
}

float tri(in float x){return abs(fract(x)-.5);}
vec3 tri3(in vec3 p){return vec3( tri(p.z+tri(p.y*1.)), tri(p.z+tri(p.x*1.)), tri(p.y+tri(p.x*1.)));}
mat2 m2 = mat2(0.970,  0.242, -0.242,  0.970);

float triNoise3d(in vec3 p, in float spd) {
    float z=0.5;
    float rz = 0.;
    vec3 bp = p;
    for (float i=0.; i<=3.; i++ ) {
        vec3 dg = tri3(bp*2.);
        p += (dg+time*spd*0.01);

        bp *= 0.01;
        z *= 1.5;
        p *= 1.;
        //p.xz*= m2;
        
        rz+= (tri(p.z+tri(p.x+tri(p.y))))/z;
        bp += 4.;
    }
    return rz;
}

// https://www.shadertoy.com/view/4ts3z2
float fogmap(in vec3 p, in float d) {
    p.x += time * .1;
    p.z += sin(p.x * .5);
    bool overlay = true;   
    return triNoise3d(p * 1./(d + 10.), 0.002) * (1. - smoothstep(0., .7, p.y));
}

vec3 fog(in vec3 col, in vec3 ro, in vec3 rd, in float mt) {
    float d = 1.5;
    for(int i=0; i<7; i++) {
        vec3  pos = ro + rd*d;
        pos.y += 0.1;
        float rz = fogmap(pos, d);
        float grd =  clamp((rz - fogmap(pos + .8 -float(i) * 0.1, d)) *3., 0.1, 1. );
        vec3 col2 = (vec3(0.227,0.231,0.392)*.5 + vec3(0.259,0.329,0.529) * (1.7 - grd)) * 0.5;
        col = mix(col, col2, clamp(rz * smoothstep(d - 0.4, d + 2. + d * .75, mt), 0., 1.) );
        d *= 1.5 + 0.3;
        if (d>mt)break;
    }
    return col;
}

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

    // Colored fog ================================================
    float rz = march(ro, rd);
    col = fog(col, ro, rd, rz);
    //post
    col = pow(col, vec3(0.5));
    col *= 1. - smoothstep(0.1, 2., length(p));
    col *= 0.5;

    gl_FragColor.xyz = col;
    gl_FragColor.w =0.5;
    
}