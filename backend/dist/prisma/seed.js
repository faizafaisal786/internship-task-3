"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const adminPassword = await bcryptjs_1.default.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@blog.com' },
        update: {},
        create: {
            email: 'admin@blog.com',
            name: 'Admin User',
            password: adminPassword,
            role: 'ADMIN',
        },
    });
    console.log({ admin });
    const categories = ['Technology', 'Lifestyle', 'Business', 'Travel', 'Health'];
    for (const catName of categories) {
        await prisma.category.upsert({
            where: { name: catName },
            update: {},
            create: {
                name: catName,
                slug: catName.toLowerCase().replace(/ /g, '-'),
            },
        });
    }
    console.log('Seed data created!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map