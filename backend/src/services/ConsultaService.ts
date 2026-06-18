import type { Consulta } from "../prisma/generated/prisma/client";
import { consultaRepository, type ConsultaRepository } from "../repositories/ConsultaRepository";

export class ConsultaService {
    constructor(private readonly repository: ConsultaRepository) {}

    async listarTodasConsultas(pagina?:number, limite?:number) {
        return await this.repository.listarTodasConsultas(pagina, limite);
    }

    async criarConsulta(dadosConsulta: Omit<Consulta, "id">) {
        return await this.repository.criarConsulta(dadosConsulta);
    }

    async buscarConsultaId(idConsulta: number) {
        return await this.repository.buscarConsultaId(idConsulta);
    }

    async atualizarConsulta(idConsulta: number, dadosParaAtualizar: Omit<Consulta, "id">) {
        return await this.repository.atualizarConsulta(idConsulta, dadosParaAtualizar);
    }

    async deletarConsulta(idConsulta: number) {
        return await this.repository.deletarConsulta(idConsulta);
    }
}

export const consultaService = new ConsultaService(consultaRepository);