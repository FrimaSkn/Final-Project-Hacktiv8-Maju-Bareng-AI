export interface NavLink {
  label: string
  to: string
}

export interface ChatRequest {
  sessionId: string
  message: string
}

export interface DichotomyTable {
  internal: string[]
  external: string[]
}

export interface ChatResponse {
  reply: string
  dichotomy_table: DichotomyTable
  crisis_flag: boolean
}

export interface ChatMessage {
  role: 'assistant' | 'user' | 'system'
  content: string
  dichotomyTable?: DichotomyTable
  crisisFlag?: boolean
}
