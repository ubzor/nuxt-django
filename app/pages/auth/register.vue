<template lang="html">
    <div>
        <form @submit.prevent="userLogin">
        <div>
            <label>Username</label>
            <input type="text" v-model="login.username" />
        </div>
        <div>
            <label>Password</label>
            <input type="text" v-model="login.password" />
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
        </form>
    </div>
</template>

<script>
    export default {
        layout: 'centered',
        // auth: 'guest',
    }
</script>
