import type { Prontuario, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

type ProntuarioDados = Omit<Prontuario, "id">;

export class ProntuarioRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async listarTodosProntuarios(pagina?: number, limite?: number) {
        const existePaginacao = pagina! && limite!
        if (!existePaginacao) {
            return await this.prisma.prontuario.findMany({
                include: { paciente: true }
            })
        }
        const prontuario = await this.prisma.prontuario.findMany({
            skip: (pagina - 1) * limite,
            take: limite,
            include: { paciente: true }
        })

        const total = await this.prisma.prontuario.count();
        const totalPaginas = Math.ceil(total / limite)
        return {
            prontuario,
            total,
            totalPaginas
        }
    }

    async buscarProntuarioId(idProntuario: number) {
        return await this.prisma.prontuario.findUnique({
            where: { id: idProntuario },
            include: { paciente: true }
        });
    }

    async criarProntuario(dadosProntuario: ProntuarioDados) {
        return await this.prisma.prontuario.create({
            data: {
                descricao: dadosProntuario.descricao,
                data: dadosProntuario.data,
                medico_responsavel_id: dadosProntuario.medico_responsavel_id,
                paciente_id: dadosProntuario.paciente_id
            },
            include: { paciente: true }
        });
    }

    async atualizarProntuario(idProntuario: number, dadosParaAtualizar: ProntuarioDados) {
        return await this.prisma.prontuario.update({
            where: { id: idProntuario },
            data: {
                descricao: dadosParaAtualizar.descricao,
                data: dadosParaAtualizar.data,
                medico_responsavel_id: dadosParaAtualizar.medico_responsavel_id,
                paciente_id: dadosParaAtualizar.paciente_id
            },
            include: { paciente: true }
        });
    }

    async deletarProntuario(idProntuario: number) {
        return await this.prisma.prontuario.delete({
            where: { id: idProntuario }
        });
    }
}

export const prontuarioRepository = new ProntuarioRepository(prisma);
