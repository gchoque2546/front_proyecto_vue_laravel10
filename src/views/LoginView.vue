<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router"
import authService from "./../services/auth.service"

    //variables
    // const correo = ref ("juan@mail.com");
    // const clave = ref ("juan54321");

    const usuario = ref({email:"", password:""})
    const errors = ref({})

    const router = useRouter()
    //metodos
    async function funIngresar() {
        try {
            const { data } = await authService.loginConLaravel(usuario.value)
            console.log("CON INTERCEPTOR", data)
            errors.value = {}
            localStorage.setItem("access_token", data.access_token);
            router.push("/about")
        } catch (error) {
            console.log(error.response.data)
            errors.value = error.response.data.errors
        }
        
        
        /*axios.post("http://127.0.0.1:8000/api/v1/auth/login", usuario.value).then(
            (res) => {
                console.log("CON AXIOS", res.data)
            }
        )*/
    }
</script>
<!--
<template>
    <div>
        {{ usuario }}
        <h1>Login</h1>
        <label for="e">Ingresar Correo:</label>
        <input type="email" v-model="usuario.email">
        <span>{{ errors.email }}</span>
        <br>
        <label>Ingresar Contraseña:</label>
        <input type="password" v-model="usuario.password">
        <span>{{ errors.password }}</span>
        <br>
        <input type="button" value="Ingresar" v-on:click="funIngresar">
        
    </div>
</template>
-->
<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="data:image/png;base64,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" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
                        <span class="text-600 font-medium">Ingresar para continuar</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText v-model="usuario.email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" />
                        <span>{{ errors.email }}</span>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password v-model="usuario.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                        <span>{{ errors.password }}</span>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <!--div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div-->
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">¿Olvidaste tu contraseña?</a>
                        </div>
                        <Button label="Ingresar" class="w-full p-3 text-xl" v-on:click="funIngresar"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>