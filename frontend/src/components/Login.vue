<template>
    <header class="loginHeader">
        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="" class="loginHeader__logo">
    </header>

    <section class="loginSection">

        <div class="loginSection__introduction">
            <h3>Connexion</h3>
        </div>

        <Form @submit="handleLogin" action="" method="post" class="loginSection__form">

            <div class="loginSection__form-input">
                <div>
                    <Field type="email" :rules="validateEmail" placeholder="Adresse email" name="email" id="email" />
                </div>
                <ErrorMessage name="email" class="loginSection__form-errorMessage" />

                <div>
                    <Field type="password" :rules="validatePassword" placeholder="Mot de Passe" name="password"
                        id="password" />
                </div>
                <ErrorMessage name="password" class="loginSection__form-errorMessage" />
            </div>

            <button type="submit" class="loginSection__form-button">Se connecter</button>

        </Form>

        <p class="loginSection__redirect">
            Vous n'avez pas de compte chez Groupomania ? <br />
            Vous pouvez vous <router-link :to="'/register'">inscrire ici !</router-link>
        </p>
        <span v-show="loading">CHARGEMENT</span>
    </section>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: "Login",

    data() {
        return {
            loading: false,
        }
    },

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },

    created() {
        if (this.loggedIn) {
            this.$router.push("/home");
        }
    },

    components: {
        Form,
        Field,
        ErrorMessage
    },

    methods: {
        handleLogin(user, error) {
            //Set loading to true so the span in v-show can be showed
            this.loading = true;
            //Login function in the auth store
            this.$store.dispatch("auth/login", user, error)
                .then(() => {
                    //As a promess in the login function, we call the user data
                    this.$store.dispatch("user/getUserProfile", error)
                        .then(() => {
                            //As a promess in the getUserProfile function, we push the router to /home
                            this.$router.push("/home")
                        })
                        .catch(error => {
                            console.log(error.response.data)
                        });
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.response.data)
                });
        }, //End of handleLogin

        validateEmail(value) {
            //If the field is empty
            if (!value) {
                return 'Veuillez renseigner le champ email'
            }

            //If the field is not a valid email 
            const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regexEmail.test(value)) {
                return 'Ce champ doit contenir un email valide'
            }

            //All id good
            return true;
        }, //End of validateEmail

        validatePassword(value) {
            //If the field is empty
            if (!value) {
                return 'Veuillez renseigner le champ mot de passe'
            }

            //If the field is not matching the password security
            const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
            if (!regexPassword.test(value)) {
                return "Votre mot de passe doit contenir au min 8 caractères, avoir 1 majuscule, 2 chiffres et 1 caractère spécial"
            }

            //All is good
            return true;
        }
    },
};
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.loginHeader {
    display: flex;
    justify-content: space-around;
    margin: 20px 5px 50px 5px;

    &__logo {
        width: 200px;
    }
}

.loginSection {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    margin: auto;
    margin-top: 100px;

    width: 100%;

    @include tablet {
        width: 70%;
    }

    @include desktop {
        max-width: 1200px;
    }

    &__form {
        background-color: $secondary-color;
        border-radius: 15px;

        input {
            background-color: $primary-color;
            border-radius: 15px;
            border: none;
            padding: 15px;
            margin: 15px auto 20px auto;
            width: 50vw;

            @include desktop {
                max-width: 700px;
            }
        }

        &-errorMessage {
            color: red;
        }

        &-input {
            padding-top: 40px;
            padding-bottom: 30px;
        }

        &-button {
            margin-bottom: 30px;
            border: none;
            border-radius: 15px;
            padding: 15px;
            background-color: $primary-color;
        }
    }
}
</style>