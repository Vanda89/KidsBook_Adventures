import { PrismaClient } from '@prisma/client';

// Singleton pattern to ensure only one Prisma Client instance is created
const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const Users = await prisma.user.findMany();
  console.log(Users);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default prisma;
