<script>
</script>

<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">User Dashboard</h2>
        <ul class="space-y-2">
            <li><nuxt-link to="/dashboard/users/orders">Orders</nuxt-link></li>
            <li><nuxt-link to="/dashboard/users/profile">Profile</nuxt-link></li>
            <li><nuxt-link to="/dashboard/users/settings">Settings</nuxt-link></li>
        </ul>

        <slot />
    </div>
</template>