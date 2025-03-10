<script setup>
import {ref, onMounted, computed} from 'vue';
import {initializeTheme} from '@/utils/initDarkMode';
import { useAuthStore } from '@/stores/authStore';

const userStore = useAuthStore();
const user = computed(() => userStore.user);

const isMobileMenuOpen = ref(false)
const isResourcesDropdownOpen = ref(false)
const isUserDropdownOpen = ref(false)
const isMobileResourcesDropdownOpen = ref(false)
const isDarkMode = ref(document.documentElement.classList.contains('dark'));
const isMenuOpen = ref(false);


const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};


const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  isResourcesDropdownOpen.value = false
  isUserDropdownOpen.value = false
  isMobileResourcesDropdownOpen.value = false
  manageOutsideClickListener();
}

const toggleResourcesDropdown = () => {
  isResourcesDropdownOpen.value = !isResourcesDropdownOpen.value
  isUserDropdownOpen.value = false
  manageOutsideClickListener();
}

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
  isResourcesDropdownOpen.value = false
  manageOutsideClickListener();
}

const toggleMobileResourcesDropdown = () => {
  isMobileResourcesDropdownOpen.value = !isMobileResourcesDropdownOpen.value
  manageOutsideClickListener();
}

const closeDropdowns = () => {
  isResourcesDropdownOpen.value = false
  isUserDropdownOpen.value = false
  isMobileResourcesDropdownOpen.value = false
  isMobileMenuOpen.value = false
  manageOutsideClickListener();
}

const anyDropdownOpen = () =>
    isResourcesDropdownOpen.value ||
    isUserDropdownOpen.value ||
    isMobileResourcesDropdownOpen.value ||
    isMobileMenuOpen.value;

// Fonction appelée dans chaque toggle pour gérer les événements
const manageOutsideClickListener = () => {
  if (anyDropdownOpen()) {
    document.addEventListener('click', closeDropdowns);
    console.log('Event listener added');
    return;
  }
  document.removeEventListener('click', closeDropdowns);
  console.log('Event listener removed');
};

const logout = () => {
  userStore.logout();
}

onMounted(() => {
  initializeTheme(isDarkMode);
  console.log('User:', user.value);
});
</script>

<template>

  <header>
    <!-- Navbar -->
    <nav class="bg-white dark:bg-gray-800 shadow-md">
      <div class="container mx-auto p-4 flex justify-between items-center">
        <h1>
          <RouterLink to="/" class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            MonSaaS
          </RouterLink>
        </h1>

        <div class="flex items-center space-x-4">

          <div>
            <button @click="toggleDarkMode"
                    class="darkMode relative inline-flex items-center justify-center w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition duration-300 focus:outline-none">
            <span v-if="isDarkMode"
                  class="w-4 h-4 bg-yellow-500 rounded-full shadow-md transform transition-transform duration-300 translate-x-6">🌜</span>
              <span v-else
                    class="w-4 h-4 bg-yellow-500 rounded-full shadow-md transform transition-transform duration-300 translate-x-0">🌞</span>
            </button>
          </div>

          <template v-if="user">
            <div class="relative">
                <div class="flex items-center">
                  <span class="text-gray-800 dark:text-gray-200 font-semibold">{{ user.username }}</span>
                  <img @click.stop="toggleUserDropdown" :src="user.avatar || 'https://i.pravatar.cc/300'" alt="Avatar" class="w-10 h-10 rounded-full mr-4">
                  <button @click.stop="toggleUserDropdown" class="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                </div>
              <div v-show="isUserDropdownOpen"
                   class="absolute right-0 mt-2 w-64 bg-blue-100 dark:bg-gray-700 rounded-md shadow-lg">
                <div class="p-4">
                  <p class="font-semibold">{{ user.firstName }} {{ user.lastName }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ user.email }}</p>
                </div>
                <hr class="border-gray-200 dark:border-gray-600">
                <ul>
                  <li>
                    <a href="#"
                       class="block px-4 py-2 text-sm hover:bg-blue-200 dark:hover:bg-gray-600">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#"
                       class="block px-4 py-2 text-sm hover:bg-blue-200 dark:hover:bg-gray-600">
                      Settings
                    </a>
                  </li>
                  <li>
                    <button @click="logout"
                            class="ml-4 flex items-center gap-1 py-2 text-sm text-red-600 hover:text-red-800">
                      <span>Sign Out</span>
                      <!-- Icône SVG de déconnexion -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 002-2v-1"/>
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <div v-else class="flex space-x-4">
            <RouterLink to="/signin" class="sign-in-button">
              Sign In
            </RouterLink>
            <RouterLink to="/signup" class="sign-up-button">
              Sign Up
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
button.darkMode {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button.darkMode span {
  display: flex;
  align-items: center;
  justify-content: center;
}

 .sign-in-button,
 .sign-up-button {
   display: inline-block;
   padding: 10px 20px;
   font-size: 16px;
   font-weight: bold;
   border-radius: 25px;
   transition: background-color 0.3s, color 0.3s, transform 0.3s;
 }

.sign-in-button {
  background-color: #4a90e2;
  color: white;
  border: 2px solid #4a90e2;
}

.sign-in-button:hover {
  background-color: #357abd;
  transform: translateY(-3px);
}

.sign-up-button {
  background-color: #5cb85c;
  color: white;
  border: 2px solid #5cb85c;
}

.sign-up-button:hover {
  background-color: #4cae4c;
  transform: translateY(-3px);
}
</style>