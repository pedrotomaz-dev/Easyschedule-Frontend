import { Agendamento } from "./agendamento.model";
import { Pessoa } from "./pessoa.model";
import { Servico } from "./servico.model";

export class Profissional extends Pessoa {
   public servicos?: Servico[];
   public agendamentos?: Agendamento[];
}
