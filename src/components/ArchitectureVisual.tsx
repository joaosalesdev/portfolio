const nodes = [
  { name: 'Client', category: 'application', className: 'node-client' },
  { name: 'API Gateway', category: 'AWS', className: 'node-api-gateway' },
  { name: 'Lambda', category: 'function', className: 'node-lambda' },
  { name: 'SQS', category: 'queue', className: 'node-sqs' },
  { name: 'External API', category: 'integration', className: 'node-external-api' },
]

export function ArchitectureVisual() {
  return (
    <div
      className="architecture-visual"
      role="img"
      aria-label="Cloud architecture connecting Client, API, Queue, Function and Database"
    >
      <div className="architecture-grid" aria-hidden="true" />
      <svg className="architecture-lines" viewBox="0 0 520 390" aria-hidden="true">
        <path d="M104 191H192M280 191H336M380 157V106M380 225v59" />
        <circle cx="148" cy="191" r="3" />
        <circle cx="308" cy="191" r="3" />
      </svg>
      {nodes.map((node) => (
        <div className={`architecture-node ${node.className}`} key={node.name}>
          <span className="node-status" />
          <strong>{node.name}</strong>
          <small>{node.category}</small>
        </div>
      ))}
      <span className="architecture-caption" aria-hidden="true">
        cloud://event-driven-system
      </span>
    </div>
  )
}
