<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { client } from '@/utils/requestMaker.js';
import { useAuthStore } from '@/stores/authStore';

const userStore = useAuthStore();
const user = computed(() => userStore.user);

const router = useRouter();
const showLoginModal = ref(false);

const plans = ref([]);

const selectPlan = async (plan) => {
  if (!user.value) {
    showLoginModal.value = true;
    return;
  }

  try {
    // Appel API pour enregistrer la sélection du plan
    await client.post('/api/subscribe', { plan });
    router.push('/confirmation');
  } catch (error) {
    console.error('Error selecting plan:', error);
  }
};

const closeModal = () => {
  showLoginModal.value = false;
  router.push('/login');
};

// Fetch plans from API
onMounted(async () => {
  try {
    const data = await client.get('/api/plan');
    console.log('cocou')

    console.log("Plans Data:", data);
    plans.value = data.plans;



  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- Pricing Section -->
    <section class="container mx-auto py-20">
      <h2 class="text-5xl font-bold text-center mb-16">Choisissez Votre Plan</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Plans boucle -->
        <div v-for="plan in plans" :key="plan.name" class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border-t-4"  :style="{ borderColor: plan.color }">
          <h3 class="text-3xl font-semibold mb-4">{{ plan.name }}</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">{{ plan.description }}</p>
          <p class="text-gray-500 dark:text-gray-400 mb-6">{{ plan.description }}</p>
          <p class="text-5xl font-bold mb-6">{{ plan.price === 0 ? 'Gratuit' : plan.price + '€ /mois' }}</p>
          <ul class="mb-6 space-y-2">
            <li v-for="feature in plan.features" :key="feature.name" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ feature.name }}
            </li>
          </ul>
          <button @click="selectPlan(plan.name)" class="w-full bg-green-500 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition" :style="{ backgroundColor: plan.color }">
            Choisir {{ plan.name }}
          </button>
        </div>

      </div>
    </section>

    <!-- Login Required Modal -->
    <div v-if="showLoginModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
        <img src="../assets/close-circle.svg" alt="Logo" class="mx-auto mb-4">
        <h3 class="text-3xl font-bold mb-4">Connexion Requise</h3>
        <p class="mb-4">Veuillez vous connecter pour continuer</p>
        <RouterLink to="/signin" class="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition">Se Connecter</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
