<template>
    <header class="header">
        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="" class="header__logo">
    </header>

    <section class="registerSection">

        <div class="registerSection__introduction">
            <h3>Inscription</h3>
        </div>

        <Form @submit="handleRegister" action="" method="post" class="registerSection__form">

            <div class="registerSection__form-input">
                <div>
                    <Field type="text" :rules="validateUsername" placeholder="Pseudo" name="username" id="username" />
                </div>
                <ErrorMessage name="username" class="registerSection__form-errorMessage" />

                <div>
                    <Field type="email" :rules="validateEmail" placeholder="Adresse email" name="email" id="email" />
                </div>
                <ErrorMessage name="email" class="registerSection__form-errorMessage" />

                <div>
                    <Field type="password" :rules="validatePassword" placeholder="Mot de Passe" name="password"
                        id="password" />
                </div>
                <ErrorMessage name="password" class="registerSection__form-errorMessage" />
            </div>

            <button type="submit" class="registerSection__form-button">S'inscrire</button>

        </Form>

        <p class="registerSection__redirect">
            Vous avez déjà un compte chez Groupomania ? <br />
            <router-link :to="'/login'">Cliquez ici</router-link> pour vous connecter !
        </p>
        <span v-show="loading">CHARGEMENT</span>

    </section>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';


export default {
    name: "Register",

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
        //Display the register function in the store in the form
        handleRegister(user, error) {
            this.$store.dispatch("auth/register", user, error)
                .then(() => {
                    this.handleLogin(user);
                })
                .catch(error => {
                    console.log(error.response.data)
                });
        }, //End of handleRegister

        // This handleLogin function is used in the handleRegister function above
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
            const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
            if (!regexPassword.test(value)) {
                return "Votre mot de passe doit contenir au min 8 caractères, avoir 1 majuscule, 2 chiffres et 1 caractère spécial"
            }

            //All is good
            return true;
        }, //End of validatePassword

        validateUsername(value) {
            //If the field is empty
            if (!value) {
                return 'Veuillez renseigner le champ pseudo'
            }

            //If the username doesn't match the regexUsername
            const regexUsername = /^([\w]){3,15}$/;
            if (!regexUsername.test(value)) {
                return "Votre pseudo doit être compris entre entre 3 et 15 caractères et ne contenir aucun caractère spécial"
            }

            //All is good
            return true;
        }, //End of validateUsername
    },
};
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.header {
    display: flex;
    justify-content: space-around;
    margin: 20px 5px 50px 5px;

    &__logo {
        width: 200px;
    }
}

.registerSection {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    width: 70vw;
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