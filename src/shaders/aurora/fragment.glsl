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
uniform float iVerticalOffset;
uniform float iHorizontalOffset;
uniform float iSpeed;
uniform float iRotation;

varying vec2 vUv;

#define time iTime * iSpeed
#define ITR 10
#define FAR 30.
#define M_PI 3.1415926535897932384626433832795
#define TAU 6.2831853071

mat2 mm2(in float a) {
    float c = cos(a), s = sin(a);

    return mat2(c, s, -s, c);
}

mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);

float tri(in float x) {
    return clamp(abs(fract(x) - 0.5), 0.01, 0.49);
}

// vec2 tri2(in vec2 p) {
//   return vec2(tri(p.x) + tri(p.y), tri(p.y + tri(p.x)));
// }

// https://www.reddit.com/r/vfx/comments/1gacg8/how_to_do_aurora_borealis_in_ae/
float triNoise2d(in vec2 p, float spd, bool overlay) {
    float z = 1.8;
    float z2 = 2.5;
    float rz = 0.;
    float rz2 = 0.;

    vec2 bp = p;
    vec2 p1 = p;
    vec2 p2 = p;
    float triRes = 1.;

    if (overlay == false) {
        for (float i = 0.; i < 4.; i++ ) {
        vec2 dg = sin(bp*3.85 + spd*iTime)*.75;
        dg *= mm2(time * spd);
        p1 -= dg/z2;

        bp *= 1.3;
        z2 *= .45;
        z *= .42;
        p1 *= 1.21 + (rz - 1.0) * .02;
            
        rz += tri(p1.x + tri(p1.y)) * z;
        p1 *= -m2*2.;
        }
        
        triRes *= clamp(1./pow(rz * 29., 1.3), 0., .55);

    } else {
        for (float i=0.; i < 4.; i++ ) {
        vec2 dg = sin(bp*3.85 + spd*iTime)*.75;
        dg *= mm2(time * spd);
        p2 -= dg/z2;

        bp *= 1.3;
        z2 *= .45;
        z *= .42;
        p2 *= 1.21 + (rz - 1.0) * .02;
            
        rz2 += tri(p2.x + tri(p2.y)) * z;
        p2 *= -m2*0.5;
        }
        triRes *= clamp(1./pow(rz2 * 89., 1.3), 0., .55);
    }

    return triRes;
}

float hash21(in vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); 
}

vec4 aurora(vec3 ro, vec3 rd, bool overlay) {
    vec4 col = vec4(0);
    vec4 avgCol = vec4(0);

    for (float i = 0.; i < 50.; i++) {
        float of = 0.006 * hash21(gl_FragCoord.xy) * smoothstep(0., 15., i);
        // float pt = ((0.8 + pow(i, 1.4) * .002) - ro.y) / (rd.y * 2. + 0.4);
        // float pt = ((0.8 + pow(i, 1.4) * .002) - ro.y) / (rd.y * 6.0 + iVerticalOffset);
        float pt = ((0.8 + pow(i, 1.4) * .002) - ro.y) / (rd.y * 6.0 + iVerticalOffset);
        pt -= of;
        vec3 bpos = ro + pt * rd;
        vec2 p = bpos.zx * iHorizontalOffset;
        float rzt = triNoise2d(p, 0.05, overlay);
        vec4 col2 = vec4(0, 0, 0, rzt);

        float saturation = iSaturation;
        float anotherSaturation = iAnotherSaturation;
        float howMuchGreen = iHowMuchGreen;
        float colorShift = iColorShift;
        float repeatStripeAt = iRepeatStripeAt;
        float intensity = iIntensity;
        
        if (overlay == true) {
            saturation = 0.8;
            anotherSaturation = 0.;
        }

        col2.rgb = (sin(1. - vec3(howMuchGreen, colorShift, anotherSaturation) + i * repeatStripeAt) * saturation + intensity) * rzt; //1
        avgCol =  mix(avgCol, col2, .5);
        
        col += avgCol * exp2(-i * 0.055 - 2.5) * smoothstep(0., 5. , i);
    }

    col *= clamp(rd.y * 15. + .4, 0., 1.);
    col *= 1.8;
    return col;
}

//-------------------Background and Stars--------------------

vec3 nmzHash33(vec3 q) {
uvec3 p = uvec3(ivec3(q));
p = p * uvec3(374761393U, 1103515245U, 668265263U) + p.zxy + p.yzx;
p = p.yzx * (p.zxy ^ (p >> 3U));

return vec3(p ^ (p >> 16U)) * (1.0 / vec3(0xffffffffU));
}

vec3 stars(in vec3 p) {
vec2 fragCoord = vUv * iResolution;
const float rotation = M_PI /2.;
    
// 2D rotation matrix 
const mat2 R = mat2(cos(rotation), -sin(rotation), -sin(rotation), -cos(rotation));
float resScale = min(iResolution.x, iResolution.y);
vec2 guv = fragCoord / vec2(resScale);
vec2 uv = guv * R;

p.xy = uv;
vec2 fv = fract(vec2(p.x + sin(iTime * .02) * 1.0, p.y + cos(iTime * .02) * 1.0) * .6);
// vec2 fv = fract(vec2(p.x + sin(iTime * .01) * 0.2, p.y + cos(iTime * .01) * 0.2) * .8);
p.xy = fv;

vec3 c = vec3(0.);
float res = iResolution.x * 1.;
// float res = min(iResolution.x, iResolution.y) * 1.;
    
for (float i = 0.; i < 4.; i++) {
    vec3 q = fract(p * (.15 * res)) - 0.5;
    vec3 id = floor(p * (.15 * res));
    vec2 rn = nmzHash33(id).xy;
    float c2 = 1. - smoothstep(0., .6, length(q));
    c2 *= step(rn.x, .0005 + i * i * 0.001);
    // c2 *= step(rn.x, .00025 + i * i * 0.0005);
    c += c2 * (mix(vec3(1.0, 0.49, 0.1), vec3(0.75, 0.9, 1.), rn.y) * 0.1 + 0.9);
    p *= 1.3;
}

return c * c * 0.8;
// return c * c * 1.1;
}

vec3 bg(in vec3 rd) {
float sd = dot(normalize(vec3(-0.5, -0.6, 0.9)), rd) * 0.5 + 0.5;
sd = pow(sd, 5.);
vec3 col = mix(vec3(0.05, 0.1, 0.2), vec3(0.1, 0.05, 0.2), sd);

return col*.63;
}
//-----------------------------------------------------------


float hash( float n ) {
return fract(sin(n)*43758.5453);
}

float noise( in vec3 x ) {
vec3 p = floor(x);
vec3 f = fract(x);
f = f*f*(3.0-2.0*f);
float n = p.x + p.y*57.0 + 113.0*p.z;
return mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
    mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
    mix(mix( hash(n+113.0), hash(n+114.0),f.x),
    mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
}

vec4 map( in vec3 p ) {
float d = 0.2 - p.y;
vec3 q = p - vec3(1.0,0.1,0.0)*iTime;
float f;
f  = 0.5000*noise( q ); q = q*2.02;
f += 0.2500*noise( q ); q = q*2.03;
f += 0.1250*noise( q ); q = q*2.01;
f += 0.0625*noise( q );
d += 3.0 * f;
d = clamp( d, 0.0, 1.0 );
vec4 res = vec4( d );
res.xyz = mix( 1.15*vec3(1.0,0.95,0.8), vec3(0.7,0.7,0.7), res.x );
return res;
}  

float random(float p) {
return fract(sin(p)*10000.0);
}

float noise(vec2 p) {
return random(p.x + p.y*10000.0);
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

float n21 (vec3 uvw) {
return fract(sin(uvw.x*23.35661 + uvw.y*6560.65 + uvw.z*4624.165)*2459.452);
}

float smoothNoise (vec3 uvw) {
float fbl = n21(floor(uvw));
float fbr = n21(vec3(1.0,0.0,0.0)+floor(uvw));
float ful = n21(vec3(0.0,1.0,0.0)+floor(uvw));
float fur = n21(vec3(1.0,1.0,0.0)+floor(uvw));

float bbl = n21(vec3(0.0,0.0,1.0)+floor(uvw));
float bbr = n21(vec3(1.0,0.0,1.0)+floor(uvw));
float bul = n21(vec3(0.0,1.0,1.0)+floor(uvw));
float bur = n21(vec3(1.0,1.0,1.0)+floor(uvw));

uvw = fract(uvw);
vec3 blend = uvw;
blend = (blend*blend*(3.0 -2.0*blend)); // cheap smoothstep

return mix(	mix(mix(fbl, fbr, blend.x), mix(ful, fur, blend.x), blend.y),
        mix(mix(bbl, bbr, blend.x), mix(bul, bur, blend.x), blend.y),
            blend.z);
}

float height(in vec2 p) {
    p *= 0.2;
    return sin(p.y)*0.4 + sin(p.x)*0.4;
}

vec2 nmzHash22(vec2 q) {
uvec2 p = uvec2(ivec2(q));
p = p*uvec2(3266489917U, 668265263U) + p.yx;
p = p*(p.yx^(p >> 15U));
return vec2(p^(p >> 16U))*(1.0/vec2(0xffffffffU));
}

float mapf(vec3 p) {
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
    for ( int i=0; i<ITR; i++ )
    {
    if( abs(h)<precis || d>FAR ) break;
    d += h;
    float res = mapf(ro+rd*d);
    h = res;
    }
return d;
}

vec3 tri3(in vec3 p){return vec3( tri(p.z+tri(p.y*1.)), tri(p.z+tri(p.x*1.)), tri(p.y+tri(p.x*1.)));}
                                
float triNoise3d(in vec3 p, in float spd) {
float z=0.5;
float rz = 0.;
vec3 bp = p;
for (float i=0.; i<=3.; i++ )
{
    vec3 dg = tri3(bp*2.);
    p += (dg+time*spd*0.01);

    bp *= 0.01;
    z *= 1.5;
    p *= 1.;
    
    rz+= (tri(p.z+tri(p.x+tri(p.y))))/z;
    bp += 4.;
}
return rz;
}

// https://www.shadertoy.com/view/4ts3z2
float fogmap(in vec3 p, in float d) {
    p.x += time * .09;
    p.z += sin(p.x * .5);
    
    bool overlay = true;   
    // return triNoise2d(p.xy * 1.2/(d + 10.), 0.02, overlay) * (1. - smoothstep(0., .7, p.y));
    return triNoise3d(p * 1./(d + 10.), 0.002) * (1. - smoothstep(0., .7, p.y));
}

vec3 fog(in vec3 col, in vec3 ro, in vec3 rd, in float mt) {
float d = 1.5;
for(int i=0; i<7; i++) {
    vec3  pos = ro + rd*d;
    pos.y += 0.6;
    float rz = fogmap(pos, d);
    float grd =  clamp((rz - fogmap(pos + .8 -float(i) * 0.1, d)) *3., 0.1, 1. );

    // vec3(0.8,0.5,1.0)*1.0 + vec3(0.2,0.3,0.4)
    vec3 col2 = (vec3(0.259,0.329,0.529)*.5 + vec3(0.8,0.5,1.0) * (1.7 - grd)) * 0.5;
    col = mix(col, col2, clamp(rz * smoothstep(d - 0.4, d + 2. + d * .75, mt), 0., 1.) );
    d *= 1.5 + 0.3;
    if (d>mt)break;
}
return col;
}

//-------------------Rolling Clouds--------------------------

uniform float ibcIntensity;
uniform float ibcEdge;
uniform float ibcScale;
uniform float ibcSpeed;
uniform float ibcLayerSpeedScale;
uniform float ibcDark;
uniform float ibcLight;
uniform float ibcCover;
uniform float ibcAlpha;
uniform float ibcColorScale;
uniform float ibcNormalize;
uniform float ibcCenter;
uniform float ibcWR;
uniform float ibcWF;
uniform float ibcWC;
uniform float ibcWRMultiplier;
uniform float ibcWFMultiplier;
uniform float ibcWCMultiplier;
uniform float ibcAmplitudeMultiplier;
uniform float ifcIntensity;
uniform float ifcEdge;
uniform float ifcScale;
uniform float ifcSpeed;
uniform float ifcLayerSpeedScale;
uniform float ifcDark;
uniform float ifcLight;
uniform float ifcCover;
uniform float ifcAlpha;
uniform float ifcColorScale;
uniform float ifcNormalize;
uniform float ifcCenter;
uniform float ifcWR;
uniform float ifcWF;
uniform float ifcWC;
uniform float ifcWRMultiplier;
uniform float ifcWFMultiplier;
uniform float ifcWCMultiplier;
uniform float ifcAmplitudeMultiplier;

// https://www.shadertoy.com/view/4tdSWr
// const float skytint = 0.5;
const vec3 skycolour = vec3(0., 0., 0.);

const mat2 cloudm = mat2( 1.6,  1.2, -1.2,  1.6 );

vec2 cloudHash( vec2 p ) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float cloudNoise( in vec2 p ) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
    vec2 i = floor(p + (p.x+p.y)*K1);	
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0); //vec2 of = 0.5 + 0.5*vec2(sign(a.x-a.y), sign(a.y-a.x));
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
    vec3 n = h*h*h*h*vec3( dot(a,cloudHash(i+0.0)), dot(b,cloudHash(i+o)), dot(c,cloudHash(i+1.0)));
    return dot(n, vec3(70.0));	
}

float cloudfbm(vec2 n, float amplitudeMultiplier) {
    float total = 0.0, amplitude = 0.1;
    for (int i = 0; i < 7; i++) {
        total += cloudNoise(n) * amplitude;
        n = cloudm * n;
        amplitude *= amplitudeMultiplier;
    }
    return total;
}

vec3 clouds(vec3 p,
            float scale,
            float speed,
            float layerSpeedScale,
            float dark,
            float light,
            float cover,
            float alpha,
            float colourScale,
            float weightR,
            float weightF,
            float weightC,
            float weightRMultiplier,
            float weightFMultiplier,
            float weightCMultiplier,
            float amplitudeMultiplier
            ) {
    vec2 fragCoord = vUv * iResolution;
    // vec2 p = fragCoord.xy / iResolution.xy;
    // vec2 uv = p.xy*vec2(iResolution.x/iResolution.y,1.0);   
    vec2 uv = p.xy;   
    float cloudtime = iTime * speed;
    float cloudq = cloudfbm(uv * scale, amplitudeMultiplier); 
    // float cloudq = 0.0;

    // noise
    float cloudr = 0.0; // ridged noise shape
    float cloudf = 0.0; // noise shape
    float cloudc = 0.0; // noise colour
    float time_c = iTime * speed * layerSpeedScale;
    uv *= scale;
    vec2 uv_c = uv;
    uv_c *= scale * colourScale;
    uv -= cloudq - cloudtime;
    uv_c -= cloudq - cloudtime;
    float weight_r = weightR;
    float weight_f = weightF;
    float weight_c = weightC;
    for (int i=0; i<8; i++){
        cloudr += abs(weight_r * cloudNoise(uv));
        cloudf += weight_f * cloudNoise(uv);
        cloudc += weight_c * cloudNoise(uv_c);
        uv = cloudm*uv + cloudtime;
        uv_c = cloudm*uv_c + time_c;
        weight_r *= weightRMultiplier;
        weight_f *= weightFMultiplier;
        weight_c *= weightCMultiplier;
    }

    cloudf *= cloudr + cloudf;
    vec3 cloudcolour = vec3(1.1, 1.1, 0.9) * clamp((dark + light*cloudc), 0.0, 1.0);
    cloudf = cover + alpha*cloudf*cloudr;
    // vec3 result = mix(skycolour, clamp(iCloudsTint * skycolour + cloudcolour, 0.0, 1.0), clamp(cloudf + cloudc, 0.0, 1.0));
    vec3 result = mix(skycolour, clamp(cloudcolour, 0.0, 1.0), clamp(cloudf + cloudc, 0.0, 1.0));

    return result;
}

//-----------------------------------------------------------

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
    vec3 brd = rd;
    float fade = smoothstep(0., 0.01, abs(brd.y)) * 0.1 + 0.9;

    col = bg(rd) * fade;
    bool overlay = false;

    // Stars ================================================
    if (rd.y > -0.05) {
        col += stars(rd);
    }

    // Background ================================================
    vec4 diffuseBackground = texture2D(iChannel0, vec2(vUv.x, vUv.y * 1.2));
    col += diffuseBackground.xyz * 1.5;

    // Aurora ======================================================
    if (rd.y > -0.1) {
        vec4 aur = smoothstep(0., 1.9, aurora(ro, rd, overlay)) * fade;
        col = col * (1. - aur.a) + aur.rgb;
        // glowing stripes
        overlay = true;
        vec4 aur2 = smoothstep(0., 1.9, aurora(ro, rd, overlay)) * fade;
        col = col * (1. - aur2.a) + aur2.rgb * 0.5;
    }

    // Clouds ====================================================
    // vec4 diffuseClouds = texture2D(iChannel1, vec2(vUv.x, vUv.y * 1.2));
    // col += diffuseClouds.xyz * 0.7 ;

    // New Clouds =================================================

    vec3 cloudsLayer = vec3(0.0);
    vec3 cloudsrd = normalize(vec3(p, ibcNormalize));
    if (cloudsrd.y > ibcEdge) {
        float edgeFade = clamp(pow(1.0 - (cloudsrd.y - ibcCenter), 20.0), 0.0, 1.0); 
        edgeFade *= clamp((cloudsrd.y - ibcEdge) * 20.0, 0.0, 1.0);
        vec3 clouds = clouds(cloudsrd,
                            ibcScale,
                            ibcSpeed,
                            ibcLayerSpeedScale,
                            ibcDark,
                            ibcLight,
                            ibcCover,
                            ibcAlpha,
                            ibcColorScale,
                            ibcWR,
                            ibcWF,
                            ibcWC,
                            ibcWRMultiplier,
                            ibcWFMultiplier,
                            ibcWCMultiplier,
                            ibcAmplitudeMultiplier
                            ).xyz;
        clouds *= edgeFade;
        // col += clouds * ibcIntensity;
        cloudsLayer += clouds * ibcIntensity;
    }

    // vec3 fcloudsrd = normalize(vec3(p, ifcNormalize));
    // if (fcloudsrd.y > ifcEdge) {
    //     float edgeFade = clamp(pow(1.0 - (fcloudsrd.y - ifcCenter), 20.0), 0.0, 1.0); 
    //     edgeFade *= clamp((fcloudsrd.y - ifcEdge) * 20.0, 0.0, 1.0);
    //     vec3 clouds = clouds(fcloudsrd,
    //                         ifcScale,
    //                         ifcSpeed,
    //                         ifcLayerSpeedScale,
    //                         ifcDark,
    //                         ifcLight,
    //                         ifcCover,
    //                         ifcAlpha,
    //                         ifcColorScale,
    //                         ifcWR,
    //                         ifcWF,
    //                         ifcWC,
    //                         ifcWRMultiplier,
    //                         ifcWFMultiplier,
    //                         ifcWCMultiplier,
    //                         ifcAmplitudeMultiplier
    //                         ).xyz;
    //     clouds *= edgeFade;
    //     // col += clouds * ifcIntensity;
    //     cloudsLayer += clouds * ifcIntensity;
    // }

    cloudsLayer = 0.0 + 0.6 * (cloudsLayer - 0.0) / (1.0 - 0.0);
    col += cloudsLayer;

    // Colored fog ================================================
    float rz = march(ro, rd);
    col = fog(col, ro, rd, rz);
    // post
    col = pow(col, vec3(1.1));
    col *= 1. - smoothstep(0.1, 2., length(p));

    gl_FragColor.xyz = col;
    gl_FragColor.w =1.;
    
}

