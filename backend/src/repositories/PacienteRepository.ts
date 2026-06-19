import type { Paciente, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

type PacienteDados = Omit<Paciente, "id">;

export class PacienteRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async listarTodosPacientes(pagina?: number, limite?: number) {
        const existePaginacao = pagina! && limite!
        if (!existePaginacao) return await this.prisma.paciente.findMany()
        const paciente = await this.prisma.paciente.findMany({
            skip: (pagina - 1) * limite,
            take: limite
        })

        const total = await this.prisma.paciente.count();
        const totalPaginas = Math.ceil(total / limite)
        return {
            paciente,
            total,
            totalPaginas
        }
    }

    async buscarPacienteId(idPaciente: number) {
        return await this.prisma.paciente.findUnique({
            where: { id: idPaciente }
        });
    }

    async criarPaciente(dadosPaciente: PacienteDados) {
        return await this.prisma.paciente.create({
            data: {
                nome: dadosPaciente.nome,
                sexo: dadosPaciente.sexo,
                data_nascimento: dadosPaciente.data_nascimento,
                cpf: dadosPaciente.cpf,
                rg: dadosPaciente.rg,
                estado_civil: dadosPaciente.estado_civil,
                telefone: dadosPaciente.telefone,
                email: dadosPaciente.email,
                naturalidade: dadosPaciente.naturalidade,
                contato_emergencia: dadosPaciente.contato_emergencia,
                alergias: dadosPaciente.alergias,
                cuidados_especiais: dadosPaciente.cuidados_especiais,
                convenio: dadosPaciente.convenio,
                numero_convenio: dadosPaciente.numero_convenio,
                validade_convenio: dadosPaciente.validade_convenio,
                cep: dadosPaciente.cep,
                cidade: dadosPaciente.cidade,
                estado: dadosPaciente.estado,
                rua: dadosPaciente.rua,
                numero: dadosPaciente.numero,
                complemento: dadosPaciente.complemento,
                bairro: dadosPaciente.bairro,
                referencia: dadosPaciente.referencia,
                responsavel: dadosPaciente.responsavel,
            }
        });
    }

    async atualizarPaciente(idPaciente: number, dadosParaAtualizar: PacienteDados) {
        return await this.prisma.paciente.update({
            where: { id: idPaciente },
            data: {
                nome: dadosParaAtualizar.nome,
                sexo: dadosParaAtualizar.sexo,
                data_nascimento: dadosParaAtualizar.data_nascimento,
                cpf: dadosParaAtualizar.cpf,
                rg: dadosParaAtualizar.rg,
                estado_civil: dadosParaAtualizar.estado_civil,
                telefone: dadosParaAtualizar.telefone,
                email: dadosParaAtualizar.email,
                naturalidade: dadosParaAtualizar.naturalidade,
                contato_emergencia: dadosParaAtualizar.contato_emergencia,
                alergias: dadosParaAtualizar.alergias,
                cuidados_especiais: dadosParaAtualizar.cuidados_especiais,
                convenio: dadosParaAtualizar.convenio,
                numero_convenio: dadosParaAtualizar.numero_convenio,
                validade_convenio: dadosParaAtualizar.validade_convenio,
                cep: dadosParaAtualizar.cep,
                cidade: dadosParaAtualizar.cidade,
                estado: dadosParaAtualizar.estado,
                rua: dadosParaAtualizar.rua,
                numero: dadosParaAtualizar.numero,
                complemento: dadosParaAtualizar.complemento,
                bairro: dadosParaAtualizar.bairro,
                referencia: dadosParaAtualizar.referencia,
                responsavel: dadosParaAtualizar.responsavel,
            }
        });
    }

    async deletarPaciente(idPaciente: number) {
        return await this.prisma.paciente.delete({
            where: { id: idPaciente }
        });
    }
}

export const pacienteRepository = new PacienteRepository(prisma);
