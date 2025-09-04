export default function Balloons() {
  const items = new Array(8).fill(0)

  return (
    <div className="balloons">
      {items.map((_, i) => (
        <div key={i} className={`balloon b${(i%4)+1}`} style={{ left: `${(i*12+5)%90}%`, animationDelay: `${i*0.8}s` }}>
          🎈
        </div>
      ))}
    </div>
  )
}
