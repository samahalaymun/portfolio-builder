import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTemplates() {
  const templates = [
    {
      id: 'default',
      name: 'Default Portfolio',
      description:
        'Clean and professional single-column layout. Perfect for developers and designers showcasing their work.',
      previewUrl:
        'https://res.cloudinary.com/dbakezv9c/image/upload/v1772651869/localhost_5173_samah_abu_laymun_2_ihls2d.png',
      previewUrlDark:
        'https://res.cloudinary.com/dbakezv9c/image/upload/v1772651956/localhost_5173_samah_abu_laymun_vgmdai.png',
      isPremium: false,
      isActive: true,
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description:
        'Ultra-clean minimalist design with focus on content. Great for writers, consultants, and professionals who prefer simplicity.',
      previewUrl:
        'https://res.cloudinary.com/dbakezv9c/image/upload/v1772652241/localhost_5173_samah_abu_laymun_2_tgnvih.png',
      previewUrlDark:
        'https://res.cloudinary.com/dbakezv9c/image/upload/v1772652082/localhost_5173_samah_abu_laymun_1_pwqoz9.png',
      isPremium: false,
      isActive: true,
    },
    {
      id: 'modern',
      name: 'Modern Grid',
      description:
        'Contemporary two-column grid layout with bold typography and modern aesthetics. Perfect for creative professionals.',
      previewUrl:
        'https://res.cloudinary.com/dbakezv9c/image/upload/v1772652410/localhost_5173_samah_abu_laymun_w3cjjp.png',
      previewUrlDark:
        'https://res.cloudinary.com/dbakezv9c/image/upload/v1772652463/localhost_5173_samah_abu_laymun_y3wvni.png',
      isPremium: false,
      isActive: true,
    },
    {
      id: 'creative',
      name: 'Creative Pro',
      description:
        'Eye-catching design with animations and unique layouts. Perfect for designers, artists, and creative professionals.',
      previewUrl: '/templates/previews/creative.png',
      isPremium: true,
      isActive: true,
    },
  ];

  console.log('🌱 Seeding templates...');

  for (const templateData of templates) {
    const existing = await prisma.template.findUnique({
      where: { id: templateData.id },
    });

    if (!existing) {
      await prisma.template.create({
        data: templateData,
      });
      console.log(`✅ Created template: ${templateData.name}`);
    } else {
      console.log(`⏭️  Template already exists: ${templateData.name}`);
    }
  }

  console.log('✅ Templates seeding completed');
}

async function main() {
  try {
    await seedTemplates();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
