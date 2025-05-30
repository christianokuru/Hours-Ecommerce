<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import loginImg from '@/assets/images/loginImg.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { Loader2 } from 'lucide-vue-next' // ✅ New import

const email = ref('okuruchristian@gmail.com')
const password = ref('')
const isLoading = ref(false)

const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    if (email.value === 'okuruchristian@gmail.com' && password.value === 'qwerty') {
      // Show success toast BEFORE navigation
      toast.success('Login successful 🎉', {
        description: 'Redirecting to dashboard...',
        // duration: 2000, // 2 seconds
      })

      // Wait for 2 seconds so the toast can be seen
      setTimeout(() => {
        router.push('/dashboard/users')
      }, 2000)

    } else {
      throw new Error('Invalid email or password')
    }
  } catch (error: any) {
    toast.error(error.message || 'Login failed 😓', {
      duration: 3000,
    })
  } finally {
    isLoading.value = false
  }
}

</script>


<template>
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <!-- Left Side: Form -->
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <NuxtLink
                to="/auth/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </NuxtLink>
            </div>
            <Input id="password" v-model="password" type="password" required />
          </div>

          <Button type="submit" class="w-full flex items-center justify-center gap-2" :disabled="isLoading">
            <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
            <span v-if="!isLoading">Login</span>
          </Button>

          <Button variant="outline" class="w-full">
            Login with Google
          </Button>
        </form>

        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/auth/register" class="underline">
            Sign up
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Right Side: Image -->
    <div class="hidden bg-muted lg:block">
      <img
        :src="loginImg"
        alt="Login Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</template>
