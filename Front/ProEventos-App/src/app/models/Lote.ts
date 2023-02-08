import { Evento } from "./Evento"

export interface Lote {
id: number
nome: string
preco: number
dataInicio?: Date
dataFinal?: Date
quantidade: number
eventoId: number
evento: Evento
}
