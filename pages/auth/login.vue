<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import loginImg from "@/assets/images/loginImg.png"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { toast } from "vue-sonner"
import { Loader2 } from "lucide-vue-next"
import { z } from "zod"
import { useZodForm } from "@/composables/useZodForm"

// ✅ Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

// ✨ Use the composable
const { values, errors, isValid, validate } = useZodForm(loginSchema, {
  email: "okuruchristian@gmail.com",
  password: "",
})

const isLoading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  const isOkay = validate()

  if (!isOkay) {
    toast.error(errors.value.email || errors.value.password || "Invalid credentials")
    return
  }

  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    if (
      values.value.email === "okuruchristian@gmail.com" &&
      values.value.password === "qwerty"
    ) {
      toast.success("Login successful 🎉", {
        description: `Welcome, ${values.value.email}!`,
      })

      setTimeout(() => {
        router.push("/dashboard/users")
      }, 2000)
    } else {
      throw new Error("Invalid email or password")
    }
  } catch (error: any) {
    toast.error(error.message || "Login failed 😓")
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <!-- Left Side: Form -->
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[450px] max-sm:w-[350px] max-sm:px-6 gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-balance text-muted-foreground max-sm:text-sm">
            Enter your email below to login to your account
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="grid gap-4">
          <div class="grid gap-1 max-sm:mb-2">
            <Label for="email">
              Email <span class="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              v-model="values.email"
              type="email"
              placeholder="m@example.com"
              required
            />
            <p v-if="errors.email" class="text-sm text-red-500 mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div class="grid gap-1">
            <div class="flex items-center">
              <Label for="password">Password <span class="text-red-500">*</span></Label>
              <NuxtLink
                to="/auth/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </NuxtLink>
            </div>
            <Input
              id="password"
              v-model="values.password"
              type="password"
              required
            />
            <p v-if="errors.password" class="text-sm text-red-500 mt-1">
              {{ errors.password }}
            </p>
          </div>

          <Button
            type="submit"
            class="w-full flex items-center justify-center gap-2"
            :disabled="isLoading || !isValid"
          >
            <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
            <span v-if="!isLoading">Login</span>
          </Button>
        </form>

        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/auth/registeration" class="underline">Sign up</NuxtLink>
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
