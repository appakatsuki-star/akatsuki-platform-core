export default function AuthBackground() {
  return <div className="reference-background" aria-hidden="true"><div className="reference-glow"/><div className="cloud-shadow cloud-shadow--left"><i/><i/><i/></div><div className="cloud-shadow cloud-shadow--right"><i/><i/><i/></div><div className="reference-particles">{Array.from({length:12},(_,index)=><i key={index}/>)}</div><div className="reference-fragments">{Array.from({length:9},(_,index)=><i key={index}/>)}</div></div>;
}
