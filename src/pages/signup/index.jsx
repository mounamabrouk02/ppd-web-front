import {Button, Checkbox, Grid, Input, InputWrapper, PasswordInput, TextInput} from '@mantine/core';
import {useNavigate} from "react-router-dom";
import styles from "./Signup.module.scss"
import {Calendar, DatePicker} from "@mantine/dates";
import {showNotification} from "@mantine/notifications";
import {Mailbox, Phone} from 'tabler-icons-react';
import AppLayout from "../../layouts/applayout/AppLayout";
import useAxios from "../../hooks/useAxios";
import {useForm} from "@mantine/form";
import {useSetRecoilState} from "recoil";
import {signupState} from "../../store/signupStore";

function Signup() {
    const [sending, call] = useAxios();
    const setSignup = useSetRecoilState(signupState)
    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            emailConfirmation: "",
            birthDate: "",
            password:"",
        },
        validate: {
            firstName: (value) => value.length > 0 ? undefined : "Nom requis",
            lastName: (value) => value.length > 0 ? undefined : "Prénom requis",
            password: (value) => value.length > 0 ? undefined : "Mot de passe requis",
            phone: (value) => {
                if (value.length === 0) {
                    return "Numéro de téléphone requis";
                } else {
                    return value.match(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/) ? undefined : "Numéro de téléphone invalide";
                }
            },
            email: (value) => value.length > 0 ? undefined : "Email requis",
            emailConfirmation: (value, values) => {
                return value !== values.email ? 'l\'e-mail ne correspond pas' : null
            },
            birthDate: (value) => value ? undefined : "Date de naissance requise",
        }
    });
    const navigate = useNavigate();
    const signup = ({
                        firstName,
                        lastName,
                        phone,
                        email,
                        birthDate,
                        password
                    }) => {
        call({
            method: "POST",
            url: "/auth/register",
            data: {
                firstName,
                lastName,
                username:phone,
                email,
                birthDate,
                password
            }
        })
            .then(res => {
                showNotification({
                    title: 'Inscription réussie',
                    message: 'Veuillez vérifier votre e-mail et votre téléphone pour le code que nous vous avons envoyé',
                })
                setSignup(old=>({
                    ...old,
                    userId:res.data.userId,
                }))
                navigate("/signup/confirm")
            })
            .catch((err) => {
                const data = err?.response?.data;
                if(data?.field){
                    form.setFieldError(data.field, data.message)
                }
                else{
                    showNotification({
                        title: "Erreur",
                        message: err.response.data.message,
                        color: "red"
                    })
                }

            })
    }
    return <AppLayout title={"S’inscrire"}>
        <Grid justify={"center"} className={styles.authContainer}>
            <Grid.Col md={6} xs={12}>
                <h2 align={"center"} style={{color: "#03586B"}}>S’inscrire</h2>
                <br/>
                <form action="" onSubmit={form.onSubmit(signup)}>
                    <Grid>
                        <Grid.Col span={6}>
                            <InputWrapper
                                required
                                label="Nom"
                                error={null}
                            >
                                <TextInput {...form.getInputProps("lastName")} type={"text"} placeholder="Nom"/>
                            </InputWrapper>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <InputWrapper
                                required
                                label="Prenom"
                            >
                                <TextInput {...form.getInputProps("firstName")} type={"text"} placeholder="Prenom"/>
                            </InputWrapper>
                        </Grid.Col>
                    </Grid>
                    <InputWrapper
                        required
                        label="Téléphone portable"
                        error={null}
                    >
                        <TextInput
                            description={"(ex: +33 123 45 67 89)"}
                            {...form.getInputProps("phone")} rightSection={<Phone size={18}/>} type={"text"}
                                   placeholder="Téléphone portable"/>
                    </InputWrapper>
                    <InputWrapper
                        required
                        label="Votre adresse email"
                        error={null}
                    >
                        <TextInput {...form.getInputProps("email")} rightSection={<Mailbox size={18}/>} type={"email"}
                                   placeholder="Votre adresse email"/>
                    </InputWrapper>
                    <InputWrapper
                        required
                        label="Confirmer votre adresse email"
                    >
                        <TextInput {...form.getInputProps("emailConfirmation")} rightSection={<Mailbox size={18}/>}
                                   type={"email"}
                                   placeholder="Confirmer votre adresse email"/>
                    </InputWrapper>
                    <DatePicker
                        {...form.getInputProps("birthDate")}
                        placeholder="Date d'anniversaire" label="Date d'anniversaire" required/>
                    <PasswordInput
                        {...form.getInputProps("password")} label={"Choisissez un mot de passe "}
                                   placeholder={"Choisissez un mot de passe "}/>

                    <br/>

                    <Checkbox
                        required={true}
                        label="J'accepte les  Conditions d'Utilisation de Doctolib "
                    /><br/>
                    <br/>
                    <Button loading={sending} component={"button"} color={"cyan"} type={"submit"}>
                        S’inscrire
                    </Button>
                </form>
            </Grid.Col>
        </Grid>
    </AppLayout>
}

export default Signup