import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/zh_CN';

const prisma = new PrismaClient();

const PRODUCT_COUNT = 50;
const PRODUCT_TYPES = ['SAAS', 'API', 'SDK', 'OTHER'] as const;
const PRODUCT_STATUS = ['draft', 'active', 'inactive'] as const;

// 生成唯一的产品ID
function generateUniqueProductId(existingIds: Set<string>): string {
  let id: string;
  do {
    // 使用英文单词组合生成ID
    const prefix = faker.helpers.arrayElement(['app', 'api', 'sdk', 'service', 'tool']);
    const suffix = faker.string.alpha({ length: 8, casing: 'lower' });
    id = `${prefix}_${suffix}`;
  } while (existingIds.has(id));
  existingIds.add(id);
  return id;
}

async function main() {
  // 清除现有数据
  await prisma.product.deleteMany();

  const existingIds = new Set<string>();

  // 生成产品数据
  const products = Array.from({ length: PRODUCT_COUNT }, () => {
    const type = PRODUCT_TYPES[Math.floor(Math.random() * PRODUCT_TYPES.length)];
    const status = PRODUCT_STATUS[Math.floor(Math.random() * PRODUCT_STATUS.length)];
    const createdAt = faker.date.past();

    return {
      id: generateUniqueProductId(existingIds),
      name: faker.company.name() + ' ' + faker.company.buzzPhrase(),
      description: faker.company.catchPhrase(),
      type,
      status,
      imageUrl: faker.image.url(),
      tags: [
        faker.helpers.arrayElement(['企业级', '开源', '云原生', '高性能']),
        faker.helpers.arrayElement(['微服务', '容器化', '安全', '稳定']),
      ].join(','),

      webhookUrl: faker.internet.url(),
      secretKey: faker.string.alphanumeric(32),
      apiVersion: 'v' + faker.number.int({ min: 1, max: 3 }),
      notifyConfig: JSON.stringify({
        retryTimes: faker.number.int({ min: 1, max: 5 }),
        retryInterval: faker.number.int({ min: 1000, max: 5000 }),
        timeout: faker.number.int({ min: 3000, max: 10000 }),
      }),
      retryStrategy: JSON.stringify({
        maxRetries: faker.number.int({ min: 3, max: 10 }),
        retryDelay: faker.number.int({ min: 1000, max: 5000 }),
      }),

      licenseUrl: '/uploads/license_' + faker.string.alphanumeric(8) + '.pdf',
      qualificationUrls: [
        '/uploads/qual_' + faker.string.alphanumeric(8) + '.pdf',
        '/uploads/qual_' + faker.string.alphanumeric(8) + '.pdf',
      ].join(','),

      createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
      createdBy: faker.internet.username(),
      updatedBy: faker.internet.username(),
    };
  });

  // 批量创建产品
  await prisma.product.createMany({
    data: products,
  });

  console.log(`Created ${PRODUCT_COUNT} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
