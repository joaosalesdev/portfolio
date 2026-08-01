const nodes = [
  { name: 'Client', category: 'application', className: 'node-client' },
  { name: 'API Gateway', category: 'gateway', className: 'node-api-gateway' },
  { name: 'Lambda', category: 'function', className: 'node-lambda' },
  { name: 'SQS', category: 'queue', className: 'node-sqs' },
  { name: 'Docker', category: 'container', className: 'node-docker' },
  { name: 'External API', category: 'integration', className: 'node-external-api' },
]

export function ArchitectureVisual() {
  return (
    <div
      className="architecture-visual"
      role="img"
      aria-label="Cloud architecture connecting Client and API Gateway to Lambda, SQS, Docker and External API"
    >
      <div className="architecture-grid" aria-hidden="true" />
      <svg className="architecture-lines" viewBox="0 0 520 390" aria-hidden="true">
        <path
          className="connection-path"
          d="M114 191H187M291 191H350M350 44V321M350 44H406M350 134H406M350 228H406M350 321H406"
        />
        <circle className="connection-particle" r="3">
          <animateMotion path="M114 191H187" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle className="connection-particle" r="3">
          <animateMotion path="M291 191H350V44H406" begin="-1.4s" dur="5.2s" repeatCount="indefinite" />
        </circle>
        <circle className="connection-particle" r="3">
          <animateMotion path="M291 191H350V134H406" begin="-2.1s" dur="4.4s" repeatCount="indefinite" />
        </circle>
        <circle className="connection-particle" r="3">
          <animateMotion path="M291 191H350V228H406" begin="-0.8s" dur="4.2s" repeatCount="indefinite" />
        </circle>
        <circle className="connection-particle" r="3">
          <animateMotion path="M291 191H350V321H406" begin="-3s" dur="5.4s" repeatCount="indefinite" />
        </circle>
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
