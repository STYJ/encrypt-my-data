<template>
    <div class="form-group">
        <label for="email">Your Email Address</label>
        <input type="text"
            id="email"
            class="form-control"
            v-model="userData.email">
    </div>
</template>
    
</template>


<script>
    export default {
        data() {
            return {
                userData: {
                    email: ''
                }
            }
        }
    }
</script>