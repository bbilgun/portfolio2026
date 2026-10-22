import{e as S,h as y,k as b,l as k,G as A,M as d,m as x,c as g,n as O,A as T,V as F}from"./three-Dl3rL8xA.js";import{i as G,l as R,j as E,k as z,m as P,n as _}from"./Game-BEeJxndS.js";const H=`
  uniform vec3 uSun;
  uniform float uTime;
  uniform vec3 uMark;
  uniform float uMarkOn;
  varying vec3 vObj;
  varying vec3 vN;
  varying vec3 vWorld;
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float vnoise(vec3 x) {
    vec3 i = floor(x); vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float a = 0.5, s = 0.0;
    for (int i = 0; i < 4; i++) { s += a * vnoise(p); p *= 2.07; a *= 0.5; }
    return s;
  }
  // Craters from a cellular pattern: dark floors, bright rims.
  float craters(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    float shade = 0.0;
    for (int z = -1; z <= 1; z++) for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec3 o = vec3(float(x), float(y), float(z));
      vec3 c = o + vec3(hash(i + o), hash(i + o + 17.0), hash(i + o + 31.0)) * 0.8 + 0.1;
      float r = 0.12 + 0.22 * hash(i + o + 5.0);
      float d = length(f - c);
      shade += -0.13 * (1.0 - smoothstep(r * 0.55, r * 0.8, d)) + 0.16 * smoothstep(r * 0.7, r * 0.85, d) * (1.0 - smoothstep(r * 0.9, r * 1.1, d));
    }
    return shade;
  }
  void main() {
    vec3 p = normalize(vObj);
    float m = fbm(p * 2.2 + vec3(7.1, 2.3, 4.4));
    float maria = smoothstep(0.5, 0.58, m);
    vec3 col = mix(vec3(0.7, 0.71, 0.76), vec3(0.4, 0.42, 0.5), maria);
    col *= 1.0 + craters(p * 7.0) + craters(p * 17.0) * 0.6;
    vec3 N = normalize(vN);
    float light = smoothstep(-0.08, 0.28, dot(N, normalize(uSun)));
    vec3 outc = col * (0.05 + light * 0.95);
    outc = floor(outc * 9.0 + 0.5) / 9.0;
    float mk = smoothstep(0.99955, 0.9998, dot(p, uMark)) * uMarkOn * (0.4 + 0.6 * step(0.0, sin(uTime * 4.0)));
    outc = mix(outc, vec3(1.0, 0.56, 0.7), mk);
    gl_FragColor = vec4(outc, 1.0);
  }
`;function W(o,{sun:i,home:l={lat:47.92,lon:106.92},places:u=[],face:a=null,segments:e=40,homeSize:c=1}={}){const r={uSun:{value:i.clone().normalize()},uTime:{value:0},uHome:{value:R(l.lat,l.lon)},uHomeSize:{value:c},uPlaces:{value:G(u)}},f=new A,n=new d(new x(o,e,Math.round(e*.7)),new g({vertexShader:z,fragmentShader:E,uniforms:r})),m=new d(new x(o*1.1,32,22),new g({vertexShader:_,fragmentShader:P,uniforms:{uSun:r.uSun},transparent:!0,blending:T,depthWrite:!1,side:O}));return a&&n.quaternion.setFromUnitVectors(r.uHome.value,a.clone().normalize()),f.add(n,m),{group:f,globe:n,uniforms:r,update(s){r.uTime.value+=s},dispose(){[n,m].forEach(s=>{s.geometry.dispose(),s.material.dispose()}),f.removeFromParent()}}}function B(o,{sun:i,mark:l=null,segments:u=36}={}){const a={uSun:{value:i.clone().normalize()},uTime:{value:0},uMark:{value:(l||new F(0,1,0)).clone().normalize()},uMarkOn:{value:l?1:0}},e=new d(new x(o,u,Math.round(u*.7)),new g({vertexShader:z,fragmentShader:H,uniforms:a}));return{group:e,globe:e,uniforms:a,update(c){a.uTime.value+=c},dispose(){e.geometry.dispose(),e.material.dispose(),e.removeFromParent()}}}function C(o,i,{seed:l=3,bright:u=1}={}){let a=l>>>0;const e=()=>{a=a+1831565813|0;let t=Math.imul(a^a>>>15,1|a);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},c=new Float32Array(o*3),r=new Float32Array(o*3),f=[[1,1,1],[.8,.88,1],[1,.92,.8],[1,.8,.85]];for(let t=0;t<o;t++){const h=e()*2-1,M=e()*Math.PI*2,w=Math.sqrt(1-h*h);c.set([Math.cos(M)*w*i,h*i,Math.sin(M)*w*i],t*3);const v=(.35+Math.pow(e(),3)*.65)*u,p=f[e()*f.length|0];r.set([p[0]*v,p[1]*v,p[2]*v],t*3)}const n=new S;n.setAttribute("position",new y(c,3)),n.setAttribute("color",new y(r,3));const m=new b({size:1.5,sizeAttenuation:!1,vertexColors:!0,depthWrite:!1,fog:!1,transparent:!0}),s=new k(n,m);return s.renderOrder=-10,s.frustumCulled=!1,s}export{W as a,B as b,C as m};
