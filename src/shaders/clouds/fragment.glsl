uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;

uniform vec2 iResolution;
uniform float iTime;
uniform vec4 iMouse;

varying vec2 vUv;

#define time iTime * 7.

mat2 mm2(in float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, s, -s, c);
}

mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);

float random(float p) {
    return fract(sin(p)*10000.0);
}

float noise(vec2 p) {
    return random(p.x + p.y*10000.0);
}

// Cloud raymarching
float hash( float n ) {
    return fract(sin(n) * 43758.5453);
}

float noise( in vec3 x ) {
    vec3 p = floor(x);
    vec3 f = fract(x);

    f = f * f * (3.0 - 2.0 * f);

    float n = p.x + p.y * 57.0 + 113.0 * p.z;

    float res = mix(mix(mix(hash(n +   0.0), hash(n +   1.0), f.x),
                        mix(hash(n +  57.0), hash(n +  58.0), f.x), f.y),
                    mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                        mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
    return res;
}

vec4 map( in vec3 p ) {
    float d = 0.2 - p.y;
    vec3 q = p - vec3(1.0,0.1,0.0) * iTime*0.9;

    float f;
    f  = 0.5000*noise( q ); q = q*2.02;
    f += 0.2500*noise( q ); q = q*2.03;
    f += 0.1250*noise( q ); q = q*2.01;
    f += 0.0625*noise( q );

    d += 2.0 * f;
    d = clamp( d, 0.0, 1.0 );

    vec4 res = vec4( d );

    res.xyz = mix( 1.15 * vec3(1.0,0.95,0.8), vec3(0.7,0.7,0.7), res.x );
    return res;
}  

vec3 sundir = vec3(-1.0,0.0,0.0);

vec4 raymarch( in vec3 ro, in vec3 rd ) {
    vec4 sum = vec4(0, 0, 0, 0);

    float t = 0.0;

    for(int i=0; i < 64; i++) {
        if( sum.a > 0.99 ) continue;
        vec3 pos = ro + t * rd;
        vec4 col = map( pos );

        #if 1
        float dif =  clamp((col.w - map(pos+0.3*sundir).w)/0.6, 0.0, 1.0 );
        vec3 lin = vec3(0.65,0.68,0.7)*1.35 + 0.45*vec3(0.7, 0.5, 0.3)*dif;
        col.xyz *= lin;
        #endif    
        
        col.a *= 0.35;
        col.rgb *= col.a;
        sum = sum + col*(1.0 - sum.a);   
        
        #if 0
        t += 0.1;
        #else
        t += max(0.1,0.025*t);
        #endif
    }
    sum.xyz /= (0.001+sum.w);
    return clamp( sum, 0.0, 1.0 );
}

void main() {

    vec2 fragCoord = vUv * iResolution;
    vec2 p = fragCoord.xy / iResolution.xy - 0.5;
    p.x *= iResolution.x/iResolution.y;

    // Ray origin
    vec3 ro = vec3(0, 0, -6.7);
    // Ray direction
    vec3 rd = normalize(vec3(p, 1.3));
    // mouse origin
    vec2 mo = iMouse.xy / iResolution.xy - .5;
    mo = (mo == vec2(-0.5)) ? mo = vec2(-0.1, 0.1) : mo;
    mo.x *= iResolution.x / iResolution.y;
    rd.yz *= mm2(mo.y);

    vec3 col = vec3(0.);

    ro = 9.0 * normalize(vec3(cos(0.75-1.0*mo.x), -0.7+(mo.y+1.0), -sin(0.75-3.0*mo.x)));
    vec3 ta = vec3(0.0, 1.0, 0.0);
    vec3 ww = normalize( ta - ro);
    vec3 uu = normalize(cross( vec3(0.0,1.0,0.0), ww ));
    vec3 vv = normalize(cross(ww,uu));
    rd = normalize( p.x*uu + p.y*vv + 1.5*ww );
    vec4 res = raymarch( ro, rd );
    float sun = clamp( dot(sundir,rd), 0.0, 1.0 );
    col += vec3(0.6,0.71,0.75) - rd.y*0.2*vec3(1.0,0.5,1.0) + 0.15*0.5;
    col += 0.2*vec3(1.0,.6,0.1)*pow( sun, 8.0 );
    col *= 0.95;
    col = mix( col, res.xyz, res.w );
    col += 0.1*vec3(1.0,0.4,0.2)*pow( sun, 3.0 );

    gl_FragColor = mix(vec4(col,1.0), res, res.w);

}
