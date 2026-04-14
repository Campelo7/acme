import { PrismaClient, InvoiceStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('iniciando população do banco de dados...');

    const password = await bcrypt.hash('password', 10);

    const user = await prisma.user.upsert({
        where: { email: 'admin@acme.com' },
        update: {}
        create: {
            name: 'Admin',
            email: 'admin@acme.com',
            password: password
        }
    });

    console.log('Usuário criado com sucesso.');

    const customer_data = [{
        name: 'Anderson Campelo',
        email: 'anderson@email.com',
        imageUrl: 'https://ui-avatars.com/api/?name=Anderson+Campelo&background=random'
    }, {
        name: 'Livya Campelo',
        email: 'livya@email.com',
        imageUrl: 'https://ui-avatars.com/api/?name=Livya+Campelo&background=random'
    }, {
        name: 'Beth Campelo',
        email: 'beth@email.com',
        imageUrl: 'https://ui-avatars.com/api/?name=Beth+Campelo&background=random'
    }];

    const customers = [];

    for (const data of customer_data) {
        const customer = await prisma.customer.upsert({
            where: { email: data.email },
            update: {},
            create: data

        });

        customers.push(customer);
        console.log(`Cliente criado: ${customer.name}`);
    };

    const invoiceData = [{
        amount: 15785,
        status: InvoiceStatus.PENDENTE,
        date: '2026-17-05',
        customer: customers[1]
    }, {
        amount: 15722,
        status: InvoiceStatus.PENDENTE,
        date: '2026-11-05',
        customer: customers[0]
    }, {
        amount: 1585,
        status: InvoiceStatus.PENDENTE,
        date: '2026-15-05',
        customer: customers[1]
    }, {
        amount: 15485,
        status: InvoiceStatus.PENDENTE,
        date: '2026-05-05',
        customer: customers[2]
    }, {
        amount: 157285,
        status: InvoiceStatus.PENDENTE,
        date: '2026-09-05',
        customer: customers[0]
    }, {
        amount: 15995,
        status: InvoiceStatus.PAGO,
        date: '2026-21-05',
        customer: customers[1]
    }, {
        amount: 1125,
        status: InvoiceStatus.PENDENTE,
        date: '2026-22-05',
        customer: customers[0]
    }, {
        amount: 157805,
        status: InvoiceStatus.PENDENTE,
        date: '2026-29-05',
        customer: customers[0]
    }, {
        amount: 14785,
        status: InvoiceStatus.PAGO,
        date: '2026-30-05',
        customer: customers[0]
    }, {
        amount: 12385,
        status: InvoiceStatus.PENDENTE,
        date: '2026-01-05',
        customer: customers[2]
    }, {
        amount: 19785,
        status: InvoiceStatus.PENDENTE,
        date: '2026-15-05',
        customer: customers[0]
    }, {
        amount: 1555585,
        status: InvoiceStatus.PENDENTE,
        date: '2026-01-05',
        customer: customers[1]
    }, {
        amount: 1535,
        status: InvoiceStatus.PAGO,
        date: '2026-15-05',
        customer: customers[0]
    }, {

    }];

    for (const data of invoicesData) {
        await prisma.invoice.create({
            data: {
                amount: data.amount,
                status: data.status,
                date: new Date(data.date),
                customerId: data.customer.id
            }
        });
    };

    console.log(`${invoicesData.length} faturas criadas.`);

    const revenueData = [
        { month: 'Jan', revenue: 151554 },
        { month: 'Fev', revenue: 1542245 },
        { month: 'Mar', revenue: 151554444 },
        { month: 'Abr', revenue: 44165465 },
        { month: 'Mai', revenue: 525465464 },
        { month: 'Jun', revenue: 525446488 },
        { month: 'Jul', revenue: 224555242 },
        { month: 'Ago', revenue: 151554556 },
        { month: 'Set', revenue: 15118467 },
        { month: 'Out', revenue: 114546656 },
        { month: 'Nov', revenue: 3665548754 },
        { month: 'Dez', revenue: 44457824 },

    ];

    for (const data of revenueData){
        await prisma.revenue.upsert({
            where: { month: data.month },
            update: { revenue: data.revenue },
            create : data
        });
    };

    console.log('Dados de receita mensal criados');

    console.log('População concluída com sucesso.');
};

main()
    .catch((erro) => {
        console.log('Erro ao popular o banco:', erro);
    })
     .finally(async () => {
        await prisma.$disconnect();
     });


