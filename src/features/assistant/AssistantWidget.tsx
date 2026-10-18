import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import './AssistantWidget.css'

type Source = { id: string; source: string; text: string }
type Message = { id: string; role: 'user' | 'assistant'; text: string; sources: Source[] }
const endpoint = import.meta.env.VITE_ASSISTANT_API_URL || 'https://dlhae6sxd6rns56hd24ba5p2ym0qormt.lambda-url.us-east-1.on.aws/'
const copy = {
  pt: {
    label: 'Assistente do portfólio', subtitle: 'João Paulo · Backend & Cloud', welcome: 'Olá! O que você gostaria de saber?', description: 'Sou o assistente de IA do João Paulo. Posso ajudar você a conhecer sua trajetória, competências e projetos.', suggestions: ['Quais oportunidades profissionais João Paulo procura?', 'Qual é a experiência de João com Python e AWS?', 'Quais projetos demonstram suas competências em backend?'],
    placeholder: 'Pergunte sobre minha experiência…', send: 'Enviar pergunta', thinking: 'Consultando o portfólio…', newChat: 'Nova conversa', note: 'Respostas geradas por IA. Confira as fontes e valide informações importantes.', sources: 'Fontes consultadas', you: 'Você', error: 'Não foi possível obter uma resposta. Verifique sua conexão e tente novamente.', timeout: 'A resposta demorou mais que o esperado. Tente novamente.', invalid: 'O serviço retornou uma resposta inválida. Tente novamente.', retry: 'Tentar novamente', question: 'Sua pergunta', count: 'caracteres', hint: 'Enter para enviar · Shift + Enter para nova linha',
  },
  en: {
    label: 'Portfolio assistant', subtitle: 'João Paulo · Backend & Cloud', welcome: 'Hi! What would you like to know?', description: 'I’m João Paulo’s AI assistant. I can help you explore his background, skills, and projects.', suggestions: ['What professional opportunities is João Paulo looking for?', 'What is João’s experience with Python and AWS?', 'Which projects demonstrate his backend skills?'],
    placeholder: 'Ask about my experience…', send: 'Send question', thinking: 'Searching the portfolio…', newChat: 'New conversation', note: 'AI-generated answers. Check sources and verify important information.', sources: 'Sources consulted', you: 'You', error: 'Could not get an answer. Check your connection and try again.', timeout: 'The response took longer than expected. Please try again.', invalid: 'The service returned an invalid response. Please try again.', retry: 'Try again', question: 'Your question', count: 'characters', hint: 'Enter to send · Shift + Enter for a new line',
  },
}

export function AssistantWidget() {
  const language = useLanguage()
  const t = copy[language]
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const launcher = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [question, setQuestion] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [failedQuestion, setFailedQuestion] = useState('')
  const controller = useRef<AbortController | null>(null)
  const busy = useRef(false)
  const log = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)

  useEffect(() => () => controller.current?.abort(), [])
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight }, [messages, pending, error, open])

  useEffect(() => {
    if (!open) return
    const frame = window.requestAnimationFrame(() => panel.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  function minimize() {
    setOpen(false)
    setDismissed(true)
    launcher.current?.focus()
  }

  async function ask(value: string, retry = false) {
    const trimmed = value.trim()
    if (!trimmed || trimmed.length > 2000 || busy.current) return
    busy.current = true
    setPending(true)
    setError('')
    setQuestion('')
    if (!retry) setMessages(previous => [...previous, { id: crypto.randomUUID(), role: 'user', text: trimmed, sources: [] }])
    const request = new AbortController()
    controller.current = request
    const timer = window.setTimeout(() => request.abort(), 60000)
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: trimmed }), signal: request.signal })
      const data: unknown = await response.json().catch(() => null)
      if (!response.ok) {
        const detail = data && typeof data === 'object' && 'error' in data && typeof data.error === 'string' ? data.error : t.error
        throw new Error(detail)
      }
      if (!data || typeof data !== 'object' || !('answer' in data) || typeof data.answer !== 'string' || !data.answer.trim()) throw new Error(t.invalid)
      const sources: Source[] = 'sources' in data && Array.isArray(data.sources) ? data.sources.filter((source: unknown): source is Source => !!source && typeof source === 'object' && 'id' in source && typeof source.id === 'string' && 'text' in source && typeof source.text === 'string' && 'source' in source && typeof source.source === 'string') : []
      setMessages(previous => [...previous, { id: crypto.randomUUID(), role: 'assistant', text: data.answer as string, sources }])
      setFailedQuestion('')
    } catch (cause) {
      setError(request.signal.aborted ? t.timeout : cause instanceof TypeError ? t.error : cause instanceof Error ? cause.message : t.error)
      setFailedQuestion(trimmed)
    } finally {
      window.clearTimeout(timer)
      busy.current = false
      setPending(false)
      controller.current = null
    }
  }

  function citation(message: Message, id: string) {
    const element = document.getElementById(`${message.id}-${id}`) as HTMLDetailsElement | null
    if (element) { element.open = true; element.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); element.querySelector('summary')?.focus() }
  }

  return (
    <div className="assistant-widget" onKeyDown={event => { if (open && event.key === 'Escape') { event.stopPropagation(); minimize() } }}>
      {!open && !dismissed && <div className="assistant-invitation"><button type="button" onClick={() => setOpen(true)}><strong>{language === 'pt' ? 'Pergunte sobre mim' : 'Ask about me'} <span aria-hidden="true">↗</span></strong><span>{language === 'pt' ? 'Experiência, projetos e meu próximo passo.' : 'Experience, projects, and my next step.'}</span></button><button className="assistant-dismiss" type="button" aria-label={language === 'pt' ? 'Dispensar convite' : 'Dismiss invitation'} onClick={() => setDismissed(true)}>×</button></div>}
      <button ref={launcher} type="button" className="assistant-launcher" aria-expanded={open} aria-controls="portfolio-chat" aria-label={open ? (language === 'pt' ? 'Minimizar assistente' : 'Minimize assistant') : t.label} onClick={() => open ? minimize() : setOpen(true)}><span aria-hidden="true">{open ? '⌄' : '✦'}</span><span>{open ? (language === 'pt' ? 'Minimizar' : 'Minimize') : 'AI Assistant'}</span>{pending && <i aria-label={t.thinking} />}</button>
        <section ref={panel} id="portfolio-chat" className="assistant-panel" aria-label={t.label} tabIndex={-1} hidden={!open}>
          <header className="assistant-panel-header"><div className="assistant-avatar" aria-hidden="true">✦</div><div><h2>{t.label}</h2><p>{t.subtitle}</p></div><button type="button" className="assistant-reset" disabled={pending || !messages.length} onClick={() => { setMessages([]); setError(''); setFailedQuestion(''); input.current?.focus() }} aria-label={t.newChat} title={t.newChat}>＋</button><button type="button" className="assistant-minimize" onClick={minimize} aria-label={language === 'pt' ? 'Minimizar assistente' : 'Minimize assistant'} title={language === 'pt' ? 'Minimizar' : 'Minimize'}>−</button></header>
          <div className="assistant-log" ref={log} role="log" aria-label={t.label} aria-live="polite" aria-relevant="additions text">
            {!messages.length && <div className="assistant-welcome"><div className="assistant-welcome-mark" aria-hidden="true">✦</div><h2>{t.welcome}</h2><p>{t.description}</p><div className="assistant-suggestions">{t.suggestions.map((suggestion, index) => <button key={suggestion} type="button" onClick={() => void ask(suggestion)} disabled={pending}><span>0{index + 1}</span>{suggestion}<span aria-hidden="true">↗</span></button>)}</div></div>}
            {messages.map(message => <article key={message.id} className={`assistant-message assistant-message-${message.role}`}><div className="assistant-message-author">{message.role === 'user' ? t.you : '✦ AI Assistant'}</div><div className="assistant-message-text">{message.role === 'assistant' ? message.text.split(/(\[S\d+\])/g).map((part, index) => /^\[S\d+\]$/.test(part) && message.sources.some(source => source.id === part.slice(1, -1)) ? <button key={index} type="button" className="assistant-citation" onClick={() => citation(message, part.slice(1, -1))} aria-label={`${t.sources}: ${part}`}>{part}</button> : part) : message.text}</div>{message.sources.length > 0 && <div className="assistant-sources"><p>{t.sources} · {message.sources.length}</p>{message.sources.map(source => <details key={source.id} id={`${message.id}-${source.id}`}><summary><span>{source.id}</span> {source.source.replace(/^documents\//, '')}</summary><blockquote>{source.text}</blockquote></details>)}</div>}</article>)}
            {pending && <div className="assistant-thinking" role="status"><span aria-hidden="true">✦</span>{t.thinking}<span className="assistant-loading-dots" aria-hidden="true">•••</span></div>}
            {error && <div className="assistant-error" role="alert"><p>{error}</p><button type="button" onClick={() => void ask(failedQuestion, true)} disabled={pending}>{t.retry} ↗</button></div>}
          </div>
          <form className="assistant-composer" onSubmit={event => { event.preventDefault(); void ask(question) }}>
            <div className="assistant-input-wrap"><label htmlFor="assistant-question" className="sr-only">{t.question}</label><textarea ref={input} id="assistant-question" rows={2} maxLength={2000} value={question} placeholder={t.placeholder} onChange={event => setQuestion(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void ask(question) } }} /><button type="submit" disabled={pending || !question.trim()} aria-label={t.send} title={t.send}>↑</button></div>
            <div className="assistant-input-meta"><span>{t.hint}</span><span aria-label={`${question.length} / 2000 ${t.count}`}>{question.length}/2000</span></div>
            <p className="assistant-disclaimer">{t.note}</p>
          </form>
        </section>
    </div>
  )
}
