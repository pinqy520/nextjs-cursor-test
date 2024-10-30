import { PrismaClient } from '@prisma/client';
import { ProductTypes, ProductStatuses } from '../src/types/product';

const prisma = new PrismaClient();

const dummyProducts = [
  {
    productId: "smart_watch_v1",
    name: "Smart Watch Pro",
    type: ProductTypes.PHYSICAL,
    description: "Advanced smartwatch with health monitoring features",
    tags: JSON.stringify(["wearable", "tech", "health"]),
    status: ProductStatuses.ACTIVE,
    webhookUrl: "https://api.example.com/webhooks/smart-watch",
    callbackKey: "sw_callback_123",
    apiVersion: "v1.0",
    businessLicense: "https://example.com/licenses/bl_001.pdf",
    qualificationCert: "https://example.com/certs/qc_001.pdf",
    supplementalDocs: JSON.stringify(["manual.pdf", "warranty.pdf"]),
  },
  {
    productId: "fitness_tracker",
    name: "Fitness Band Plus",
    type: ProductTypes.PHYSICAL,
    description: "Lightweight fitness tracker with extended battery life",
    tags: JSON.stringify(["fitness", "wearable", "sports"]),
    status: ProductStatuses.ACTIVE,
    webhookUrl: "https://api.example.com/webhooks/fitness-band",
    callbackKey: "fb_callback_456",
    apiVersion: "v1.0",
    businessLicense: "https://example.com/licenses/bl_002.pdf",
    qualificationCert: "https://example.com/certs/qc_002.pdf",
    supplementalDocs: JSON.stringify(["user_guide.pdf"]),
  },
  {
    productId: "cloud_storage",
    name: "Cloud Storage Premium",
    type: ProductTypes.DIGITAL,
    description: "Secure cloud storage solution for enterprises",
    tags: JSON.stringify(["cloud", "storage", "enterprise"]),
    status: ProductStatuses.DRAFT,
    webhookUrl: "https://api.example.com/webhooks/cloud-storage",
    callbackKey: "cs_callback_789",
    apiVersion: "v2.0",
    businessLicense: "https://example.com/licenses/bl_003.pdf",
    qualificationCert: "https://example.com/certs/qc_003.pdf",
    supplementalDocs: JSON.stringify([]),
  },
  {
    productId: "ai_consulting",
    name: "AI Consulting Services",
    type: ProductTypes.SERVICE,
    description: "Expert AI consulting and implementation services",
    tags: JSON.stringify(["ai", "consulting", "enterprise"]),
    status: ProductStatuses.ACTIVE,
    webhookUrl: "https://api.example.com/webhooks/ai-consulting",
    callbackKey: "ac_callback_012",
    apiVersion: "v1.0",
    businessLicense: "https://example.com/licenses/bl_004.pdf",
    qualificationCert: "https://example.com/certs/qc_004.pdf",
    supplementalDocs: JSON.stringify(["service_terms.pdf"]),
  },
  {
    productId: "mobile_app",
    name: "Mobile App Development",
    type: ProductTypes.SERVICE,
    description: "Custom mobile application development services",
    tags: JSON.stringify(["mobile", "development", "app"]),
    status: ProductStatuses.DISABLED,
    webhookUrl: "https://api.example.com/webhooks/mobile-app",
    callbackKey: "ma_callback_345",
    apiVersion: "v1.5",
    businessLicense: "https://example.com/licenses/bl_005.pdf",
    qualificationCert: "https://example.com/certs/qc_005.pdf",
    supplementalDocs: JSON.stringify(["portfolio.pdf"]),
  }
];

async function main() {
  console.log('Start seeding...');
  
  // Clear existing data
  await prisma.product.deleteMany();
  
  // Insert dummy products
  for (const product of dummyProducts) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log(`Created product with ID: ${created.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 