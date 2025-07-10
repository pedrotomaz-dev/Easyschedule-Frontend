import { Agendamento } from "./agendamento.model";
import { Profissional } from "./profissional.model";

export class Servico {
  public id?: string;
  public sigla?: string;
  public nome?: string;
  public ativo?: boolean;
  public valor?: number;
  public tempoGastoEmHora?: number;

  public profissionais?: Profissional[];
  public agendamentos?: Agendamento[];
}
