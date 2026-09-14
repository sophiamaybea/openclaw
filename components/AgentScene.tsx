'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Line, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

const nodeData = [
  { name: 'INBOX', p: [-2.75, 1.35, .2] as [number,number,number] },
  { name: 'CALENDAR', p: [2.65, 1.15, -.35] as [number,number,number] },
  { name: 'RESEARCH', p: [-2.35, -1.5, -.55] as [number,number,number] },
  { name: 'SALES', p: [2.55, -1.45, .38] as [number,number,number] },
  { name: 'MEMORY', p: [.15, 2.48, -1] as [number,number,number] },
]

function Core(){
  const shell=useRef<THREE.Mesh>(null!)
  const wire=useRef<THREE.Mesh>(null!)
  const rings=useRef<THREE.Group>(null!)
  useFrame((state,delta)=>{
    shell.current.rotation.x+=delta*.08
    shell.current.rotation.y+=delta*.14
    wire.current.rotation.x-=delta*.11
    wire.current.rotation.z+=delta*.08
    rings.current.rotation.z=Math.sin(state.clock.elapsedTime*.22)*.18
    const px=state.pointer.x,py=state.pointer.y
    shell.current.position.x=THREE.MathUtils.lerp(shell.current.position.x,px*.13,.045)
    shell.current.position.y=THREE.MathUtils.lerp(shell.current.position.y,py*.1,.045)
  })
  return <group>
    <group ref={rings}>
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.8,.012,12,180]}/><meshBasicMaterial color="#d8ff55" transparent opacity={.45}/></mesh>
      <mesh rotation={[1.05,.35,.4]}><torusGeometry args={[2.15,.006,8,180]}/><meshBasicMaterial color="#9bffe1" transparent opacity={.2}/></mesh>
      <mesh rotation={[-.55,.7,.2]}><torusGeometry args={[2.5,.004,8,180]}/><meshBasicMaterial color="#ffffff" transparent opacity={.12}/></mesh>
    </group>
    <mesh ref={shell}>
      <icosahedronGeometry args={[1.18,5]}/>
      <MeshTransmissionMaterial thickness={1.05} roughness={.04} transmission={1} ior={1.18} chromaticAberration={.09} anisotropicBlur={.08} backside samples={6}/>
    </mesh>
    <mesh ref={wire} scale={.94}><icosahedronGeometry args={[1.18,2]}/><meshBasicMaterial color="#d8ff55" wireframe transparent opacity={.5}/></mesh>
    <mesh scale={.62}><icosahedronGeometry args={[1.18,3]}/><meshStandardMaterial color="#eaff8d" emissive="#bbff43" emissiveIntensity={2.8} roughness={.2}/></mesh>
    <Html center position={[0,-.04,1.4]} distanceFactor={7.5} transform><div className="core-tag"><b>PRIVATE</b><br/>AI WORKER</div></Html>
  </group>
}

function AgentNode({name,p,index}:{name:string,p:[number,number,number],index:number}){
  const ref=useRef<THREE.Mesh>(null!)
  useFrame((state)=>{
    ref.current.rotation.y=state.clock.elapsedTime*(.16+index*.012)
    ref.current.rotation.x=state.clock.elapsedTime*.1
  })
  return <Float speed={1.15+index*.08} rotationIntensity={.22} floatIntensity={.34}>
    <group position={p}>
      <mesh ref={ref}><octahedronGeometry args={[.3,0]}/><meshStandardMaterial color="#f8f6ee" emissive={index%2?'#d8ff55':'#9bffe1'} emissiveIntensity={.6} metalness={.84} roughness={.12}/></mesh>
      <mesh scale={1.9}><sphereGeometry args={[.3,16,16]}/><meshBasicMaterial color={index%2?'#d8ff55':'#9bffe1'} transparent opacity={.045}/></mesh>
      <Html center position={[0,-.56,0]} distanceFactor={9} transform><div className="node-label"><span>0{index+1}</span>{name}</div></Html>
    </group>
  </Float>
}

function Network(){
  const lines=useMemo(()=>nodeData.map(n=>[[0,0,0],n.p] as [[number,number,number],[number,number,number]]),[])
  return <>{lines.map((pts,i)=><Line key={i} points={pts} color={i%2?'#d8ff55':'#9bffe1'} transparent opacity={.25} lineWidth={.6}/>) }{nodeData.map((n,i)=><AgentNode key={n.name} {...n} index={i}/>)}</>
}

function Rig(){
  const ref=useRef<THREE.Group>(null!)
  useFrame((state)=>{
    ref.current.rotation.y=THREE.MathUtils.lerp(ref.current.rotation.y,state.pointer.x*.11,.025)
    ref.current.rotation.x=THREE.MathUtils.lerp(ref.current.rotation.x,-state.pointer.y*.07,.025)
  })
  return <group ref={ref}><Core/><Network/></group>
}

export default function AgentScene(){
  return <div className="scene-wrap" aria-hidden="true">
    <Canvas camera={{position:[0,0,7.2],fov:41}} dpr={[1,1.65]} gl={{antialias:true,alpha:true}}>
      <ambientLight intensity={.72}/>
      <directionalLight position={[4,5,6]} intensity={3}/>
      <pointLight position={[-4,-2,3]} intensity={18} distance={10} color="#9bffe1"/>
      <pointLight position={[3,2,2]} intensity={11} distance={8} color="#d8ff55"/>
      <Rig/>
      <Sparkles count={110} scale={[8,6,4]} size={1.45} speed={.22} opacity={.42} color="#ffffff"/>
    </Canvas>
  </div>
}
