'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Line, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

const nodeData = [
  { name: 'Inbox', p: [-2.6, 1.35, 0.4] as [number,number,number] },
  { name: 'Calendar', p: [2.5, 1.1, -0.2] as [number,number,number] },
  { name: 'Research', p: [-2.2, -1.35, -0.7] as [number,number,number] },
  { name: 'Sales', p: [2.4, -1.45, 0.45] as [number,number,number] },
  { name: 'Files', p: [0.1, 2.35, -0.9] as [number,number,number] },
]

function Core() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.09
    ref.current.rotation.y += delta * 0.14
    ref.current.position.y = Math.sin(state.clock.elapsedTime * .55) * .08
  })
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.18, 3]} />
        <MeshTransmissionMaterial thickness={0.75} roughness={0.09} transmission={1} ior={1.2} chromaticAberration={0.04} backside />
      </mesh>
      <mesh scale={0.68}>
        <icosahedronGeometry args={[1.18, 2]} />
        <meshStandardMaterial color="#f3ff7c" emissive="#c7ff4a" emissiveIntensity={1.8} metalness={0.1} roughness={0.24}/>
      </mesh>
      <Html center distanceFactor={7} transform position={[0,-.02,1.3]}>
        <div className="core-tag">PRIVATE<br/>AI WORKER</div>
      </Html>
    </group>
  )
}

function AgentNode({name,p}:{name:string,p:[number,number,number]}){
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * .22
    ref.current.rotation.x = state.clock.elapsedTime * .12
  })
  return <Float speed={1.6} rotationIntensity={.25} floatIntensity={.42}>
    <group position={p}>
      <mesh ref={ref}>
        <octahedronGeometry args={[.34,0]}/>
        <meshStandardMaterial color="#f9f7ef" emissive="#99ffe6" emissiveIntensity={.34} metalness={.7} roughness={.15}/>
      </mesh>
      <Html center position={[0,-.58,0]} distanceFactor={9} transform>
        <div className="node-label">{name}</div>
      </Html>
    </group>
  </Float>
}

function Network(){
  const lines = useMemo(() => nodeData.map(n => [[0,0,0],n.p] as [[number,number,number],[number,number,number]]),[])
  return <>
    {lines.map((pts,i)=><Line key={i} points={pts} color="#c7ff4a" transparent opacity={.24} lineWidth={.5}/>) }
    {nodeData.map(n=><AgentNode key={n.name} {...n}/>) }
  </>
}

export default function AgentScene(){
  return <div className="scene-wrap" aria-hidden="true">
    <Canvas camera={{position:[0,0,7.4],fov:42}} dpr={[1,1.75]}>
      <ambientLight intensity={.9}/>
      <directionalLight position={[4,5,6]} intensity={2.8}/>
      <pointLight position={[-4,-2,3]} intensity={14} distance={9} color="#a9ffdb"/>
      <Core/><Network/>
      <Sparkles count={80} scale={[8,6,4]} size={1.8} speed={.26} opacity={.45}/>
    </Canvas>
  </div>
}
