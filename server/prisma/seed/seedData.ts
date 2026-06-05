import { PrismaClient, StatusEmprestimo, Categoria } from "@prisma/client"

const prisma = new PrismaClient();

const dataForPopulation = [
    {
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        isbn: "9788522031429",
        editora: "Agir",
        quantidadeTotal: 8,
        quantidadeDisponivel: 7,
        categoria: Categoria.INFANTIL,
        ano: 1943,
        emprestimos: [
            {
                nomeCliente: "Carlos Silva",
                emailCliente: "carlos.silva@exemplo.com",
                dataLocacao: new Date(), // Hoje
                dataPrevistaDevolucao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                status: StatusEmprestimo.EM_ANDAMENTO
            }
        ]
    },
    {
        titulo: "Código Limpo: Habilidades Práticas do Agile Software",
        autor: "Robert C. Martin",
        isbn: "9788576082675",
        editora: "Alta Books",
        quantidadeTotal: 5,
        quantidadeDisponivel: 4,
        categoria: Categoria.TECNOLOGIA,
        ano: 2009,
        emprestimos: [
            {
                nomeCliente: "Ana Souza",
                emailCliente: "ana.souza@exemplo.com",
                dataLocacao: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                dataPrevistaDevolucao: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                status: StatusEmprestimo.ATRASADO
            }
        ]
    },
    {
        titulo: "Orgulho e Preconceito",
        autor: "Jane Austen",
        isbn: "9788544001820",
        editora: "Martin Claret",
        quantidadeTotal: 3,
        quantidadeDisponivel: 3,
        categoria: Categoria.ROMANCE,
        ano: 1813,
        emprestimos: [
            {
                nomeCliente: "Bruno Lima",
                emailCliente: "bruno.lima@exemplo.com",
                dataLocacao: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                dataPrevistaDevolucao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                status: StatusEmprestimo.DEVOLVIDO
            }
        ]
    },
    {
        titulo: "Sapiens: Uma Breve História da Humanidade",
        autor: "Yuval Noah Harari",
        isbn: "9788525432186",
        editora: "L&PM",
        quantidadeTotal: 12,
        quantidadeDisponivel: 12,
        categoria: Categoria.HISTORIA,
        ano: 2011,
        emprestimos: []
    },
    {
        titulo: "Harry Potter e a Pedra Filosofal",
        autor: "J.K. Rowling",
        isbn: "9788532530783",
        editora: "Rocco",
        quantidadeTotal: 15,
        quantidadeDisponivel: 15,
        categoria: Categoria.INFANTIL,
        ano: 1997,
        emprestimos: []
    },
    {
        titulo: "Arquitetura Limpa",
        autor: "Robert C. Martin",
        isbn: "9788550804606",
        editora: "Alta Books",
        quantidadeTotal: 6,
        quantidadeDisponivel: 6,
        categoria: Categoria.TECNOLOGIA,
        ano: 2019,
        emprestimos: []
    },
    {
        titulo: "O Universo Numa Casca de Noz",
        autor: "Stephen Hawking",
        isbn: "9788551000961",
        editora: "Intrínseca",
        quantidadeTotal: 4,
        quantidadeDisponivel: 4,
        categoria: Categoria.CIENCIAS,
        ano: 2001,
        emprestimos: []
    }
];

async function main() {
    for (const item of dataForPopulation) {
        const { emprestimos, ...dadosDoLivro } = item;

        await prisma.livro.upsert({
            where: { isbn: dadosDoLivro.isbn },
            update: {},
            create: {
                ...dadosDoLivro,
                emprestimo: {
                    create: emprestimos
                }
            }
        });
    }
}

main()
    .catch((e) => {
        console.error("Erro ao popular o banco de dados:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });