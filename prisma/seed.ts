import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default roles with specific IDs
  const userRole = await prisma.role.upsert({
    where: { id: '0' },
    update: {},
    create: {
      id: '0',
      roleName: 'USER',
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      roleName: 'ADMIN',
    },
  });

  console.log({ userRole, adminRole });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
