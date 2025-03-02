import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default roles with specific IDs
  const userRole = await prisma.roles.upsert({
    where: { roleId: '0' },
    update: {},
    create: {
      roleId: '0',
      roleName: 'USER',
    },
  });

  const adminRole = await prisma.roles.upsert({
    where: { roleId: '1' },
    update: {},
    create: {
      roleId: '1',
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
