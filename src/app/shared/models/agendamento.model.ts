import { Cliente } from "./cliente.model";
import { Profissional } from "./profissional.model";
import { Servico } from "./servico.model";

export class Agendamento {
    id?: string;
    servicoId?: string;
    profissionalId?: string;
    clienteId?: string;
    data?: Date;
    horario?: string; // TimeSpan não existe em JS/TS, então usei string
    dataInicial?: Date;
    dataFinal?: Date;
    valor?: number;
    clienteNome?: string;
    clienteTelefone?: string;
    
    profissional?: Profissional;
    servico?: Servico;
    cliente?: Cliente;
}
