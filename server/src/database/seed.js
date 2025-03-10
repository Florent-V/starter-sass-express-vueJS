import sequelize from './connect.js';
import models from '../models/index.js';

export const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Roles
    const adminRole = await models.role.create({ name: 'Admin' });
    const developperRole = await models.role.create({ name: 'Developper' });
    const clientRole = await models.role.create({ name: 'Client' });

    // Permissions
    const manageProjectsPermission = await models.permission.create({ name: 'Manage Projects' });
    const trackTimePermission = await models.permission.create({ name: 'Track Time' });
    const invoicePermission = await models.permission.create({ name: 'Create Invoices' });
    const viewReportsPermission = await models.permission.create({ name: 'View Reports' })

    // Assign Permissions to Roles
    await adminRole.addPermissions([manageProjectsPermission, trackTimePermission, invoicePermission, viewReportsPermission]);
    await developperRole.addPermissions([manageProjectsPermission, trackTimePermission, invoicePermission]);
    await clientRole.addPermission(viewReportsPermission);

    // Plans
    const freePlan = await models.plan.create({ name: 'Basic', price: 0, description: 'Idéal pour les débutants', color: '#22C55E' });
    const proPlan = await models.plan.create({ name: 'Premium', price: 19.99, description: 'Parfait pour les freelance établis', color: '#3B82F6' });
    const teamPlan = await models.plan.create({ name: 'Entreprise', price: 49.99, description: 'Solution pour les grandes équipes', color: '#A855F7' });

    const users = await models.user.bulkCreate([
      {
        username: 'client',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'client@mail.com',
        password: '$2a$10$KH1D8E6BfPJFsoxBJYA5TuVItCzipAxI52JiRl0gKLKCgMOsjM.6q',
      },
      {
        username: 'developper',
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'developper@mail.com',
        password: '$2a$10$KH1D8E6BfPJFsoxBJYA5TuVItCzipAxI52JiRl0gKLKCgMOsjM.6q',
      },
      {
        username: 'admin',
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'admin@mail.com',
        password: '$2a$10$KH1D8E6BfPJFsoxBJYA5TuVItCzipAxI52JiRl0gKLKCgMOsjM.6q',
      },
    ]);

    await users[0].addRole(clientRole);
    await users[1].addRoles(developperRole);
    await users[2].addRoles(adminRole);

    // Features
    const projectManagementFeature = await models.feature.create({ name: 'Gestion de Projets', description: 'Création et gestion de projets', homepage: true });
    const timeTrackingFeature = await models.feature.create({ name: 'Suivi du Temps', description: 'Suivi du temps de travail', homepage: true });
    const oneUserFeature = await models.feature.create({ name: 'Un seul utilisateur', description: 'Un seul utilisateur' });

    const basicFeature = await models.feature.create({ name: 'Toutes les fonctionnalités Basic', description: 'Toutes les fonctionnalités de base' });
    const invoicingFeature = await models.feature.create({ name: 'Facturation de Base', description: 'Géneration de factures', homepage: true });
    const collaborationFeature = await models.feature.create({ name: 'Collaboration', description: 'Invitation de collaborateurs et de clients', homepage: true });
    const reportingFeature = await models.feature.create({ name: 'Rapports Avancés', description: 'Vues détaillées et rapports avancés', homepage: true });
    const premiumFeature = await models.feature.create({ name: 'Toutes les fonctionnalités Premium', description: 'Toutes les fonctionnalités premium' });
    const prioritySupportFeature = await models.feature.create({ name: 'Support Prioritaire', description: 'Support prioritaire 24/7', homepage: true });
    const integrationFeature = await models.feature.create({ name: 'Intégrations', description: 'Intégrations tierces' });

    // Assign Features to Plans
    await freePlan.addFeatures([projectManagementFeature, timeTrackingFeature, oneUserFeature]);
    await proPlan.addFeatures([basicFeature, invoicingFeature, collaborationFeature, reportingFeature]);
    await teamPlan.addFeatures([premiumFeature, prioritySupportFeature, integrationFeature]);

    // Subscriptions
    await models.subscription.create({ start_date: new Date(), status: 'Active', plan_id: freePlan.id, userId: users[0].id });
    await models.subscription.create({ start_date: new Date(), status: 'Active', plan_id: proPlan.id, userId: users[1].id });

    // Payments
    await models.payment.create({ amount: 19.99, payment_date: new Date(), status: 'Success', subscription_id: 2 });

    await models.testimonial.bulkCreate([
      {
        content: "Cette plateforme a transformé ma façon de gérer mes projets. Je recommande vivement !",
        author: "Alice D.",
      },
      {
        content: "Grâce à cette application, je peux me concentrer sur ce que je fais de mieux : créer.",
        author: "Bob F.",
      },
      {
        content: "L'outil de suivi du temps est incroyablement précis et facile à utiliser.",
        author: "Charlie L.",
      }
    ]);

    await models.product.bulkCreate([
      {
        name: 'Product 1',
        price: 10.99,
        description: 'Description of product 1',
        image: 'default-product-image.webp',
        available: true,
        quantity: 100,
        releaseDate: new Date(),
        userId: users[0].id,
      },
      {
        name: 'Product 2',
        price: 20.99,
        description: 'Description of product 2',
        image: 'default-product-image.webp',
        available: true,
        quantity: 50,
        releaseDate: new Date(),
        userId: users[1].id,
      },
      {
        name: 'Product 3',
        price: 30.99,
        description: 'Description of product 3',
        image: 'default-product-image.webp',
        available: false,
        quantity: 0,
        releaseDate: new Date(),
        userId: users[2].id,
      },
      {
        name: 'Product 4',
        price: 40.99,
        description: 'Description of product 4',
        image: 'default-product-image.webp',
        available: true,
        quantity: 75,
        releaseDate: new Date(),
        userId: users[0].id,
      },
      {
        name: 'Product 5',
        price: 50.99,
        description: 'Description of product 5',
        image: 'default-product-image.webp',
        available: true,
        quantity: 25,
        releaseDate: new Date(),
        userId: users[1].id,
      },
      {
        name: 'Product 6',
        price: 60.99,
        description: 'Description of product 6',
        image: 'default-product-image.webp',
        available: true,
        quantity: 125,
        releaseDate: new Date(),
        userId: users[2].id,
      }
    ]);

    const labels = await models.label.bulkCreate([
        {
            name: 'low',
        },
        {
            name: 'medium',
        },
        {
            name: 'high',
        }
    ]);


    const toDoLists = await models.toDoList.bulkCreate([
        {
            title: 'To Do List 1',
            description: 'Description of To Do List 1',
            userId: users[0].id,
        },
        {
            title: 'To Do List 2',
            description: 'Description of To Do List 2',
            userId: users[1].id,
        },
        {
            title: 'To Do List 3',
            description: 'Description of To Do List 3',
            userId: users[2].id,
        },
        {
          title: 'To Do List 4',
          description: 'Description of To Do List 4',
          userId: users[0].id,
        },
        {
          title: 'To Do List 5',
          description: 'Description of To Do List 5',
          userId: users[1].id,
        },
        {
          title: 'To Do List 6',
          description: 'Description of To Do List 6',
          userId: users[2].id,
        }
    ]);
    console.log('toDoLists', toDoLists.length);

    const toDoItems = await models.toDoItem.bulkCreate([
        {
            title: 'To Do Item 1',
            description: 'Description of To Do Item 1',
            toDoListId: toDoLists[0].id,
        },
        {
            title: 'To Do Item 2',
            description: 'Description of To Do Item 2',
            toDoListId: toDoLists[1].id,
        },
        {
            title: 'To Do Item 3',
            description: 'Description of To Do Item 3',
            toDoListId: toDoLists[2].id,
        },
        {
          title: 'To Do Item 4',
          description: 'Description of To Do Item 4',
          toDoListId: toDoLists[3].id,
        },
        {
          title: 'To Do Item 5',
          description: 'Description of To Do Item 5',
          toDoListId: toDoLists[4].id,
        },
        {
          title: 'To Do Item 6',
          description: 'Description of To Do Item 6',
          toDoListId: toDoLists[5].id,
        },
      {
            title: 'To Do Item 7',
            description: 'Description of To Do Item 7',
            toDoListId: toDoLists[0].id,
        },
        {
            title: 'To Do Item 8',
            description: 'Description of To Do Item 8',
            toDoListId: toDoLists[1].id,
        },
        {
            title: 'To Do Item 9',
            description: 'Description of To Do Item 9',
            toDoListId: toDoLists[2].id,
        },
        {
            title: 'To Do Item 10',
            description: 'Description of To Do Item 10',
            toDoListId: toDoLists[3].id,
        },
        {
            title: 'To Do Item 11',
            description: 'Description of To Do Item 11',
            toDoListId: toDoLists[4].id,
        },
        {
            title: 'To Do Item 12',
            description: 'Description of To Do Item 12',
            toDoListId: toDoLists[5].id,
      }
    ]);



    console.log('Données de test créées avec succès !');
  } catch (error) {
    console.error('Erreur lors de la création des données de test :', error);
    process.exit(1);
  }
};
