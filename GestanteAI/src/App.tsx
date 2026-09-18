import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const API_URL = `/chat`

// URL da API do chat
function App() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

// Função para enviar a pergunta ao assistente e atualizar o estado das mensagens
  const askQuestion = async () => {
    const trimmed = question.trim()
    if (!trimmed || loading) return

// Adiciona a pergunta do usuário à lista de mensagens e inicia o carregamento
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setQuestion('')
    setLoading(true)


// Chama a API do chat e trata a resposta
    try {
      const response = await fetch(`${API_URL}?message=${encodeURIComponent(trimmed)}`)
      if (!response.ok) throw new Error('Falha ao consultar o assistente')
      const answer = await response.text()
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Desculpe, ocorreu um erro ao buscar a resposta.' }])
    } finally {
      setLoading(false)
      // Finaliza o carregamento após receber a resposta ou ocorrer um erro

    }
  }

// Função para lidar com o evento de pressionar a tecla Enter no campo de entrada
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') askQuestion()
  }

// Fim da função handleKeyDown
  return (
    <>
      <section className="header">
        <img className="logo" src={logo} alt="GestanteAI" />
        <h1>Em que posso te ajudar?</h1>
      </section>
      <section className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.role}`}>
            {message.text}
          </div>
        ))}
        {loading && <div className="chat-bubble assistant loading">Digitando...</div>}
      </section>

      <div className="question-bar">
        {/* Barra de perguntas */}  
        <input
          className="question-input"
          type="text"
          placeholder="Me faça uma pergunta sobre gestação"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="ask-button" onClick={askQuestion} disabled={loading}>
          Enviar
        </button>
      </div>
      {/* Fim da barra de perguntas */}
    </>
  )
}

export default App
