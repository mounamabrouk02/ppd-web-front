import {Button, Grid, Input, InputWrapper, TextInput} from '@mantine/core';
import styles from "./ConfirmEmail.module.scss"
import AppLayout from "../../layouts/applayout/AppLayout";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {signupState} from "../../store/signupStore";
import {useForm} from "@mantine/form";
import useAxios from "../../hooks/useAxios";
import {showNotification} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";
import {loginState} from "../../store/loginStore";

function ConfirmEmail() {
    const form = useForm({
        initialValues: {
            phoneCode: "",
            emailCode: ""
        },
        validate: {
            phoneCode: value => {
                return value?.match(/^\d{4}$/) ? null : "Code de téléphone invalide"
            },
            emailCode: value => {
                return value?.match(/^\d{4}$/) ? null : "Code e-mail invalide"
            }
        }
    })
    const [sending, call] = useAxios()
    const navigate = useNavigate()
    const signup = useRecoilValue(signupState)
    const setLogin = useSetRecoilState(loginState)
    const submit = ({
                        phoneCode,
                        emailCode
                    }) => {
        call({
            url: "/auth/confirmation",
            method: "POST",
            data: {
                phoneCode,
                emailCode,
                userId: signup.userId
            }
        })
            .then((res) => {
                showNotification({
                    message: "Votre compte a été créé avec succès",
                    color: "green"
                })
                setLogin(old => ({
                    ...old,
                    username: res.data?.username,
                }))
                navigate("/login")
            })
            .catch((err) => {
                const data = err?.response?.data
                if (err?.response?.status === 400) {
                    showNotification({
                        color: "red",
                        message: data?.message || "Quelque chose s'est mal passé"
                    })
                }
            })

    }
    return <AppLayout>
        <Grid justify={"center"} className={styles.authContainer}>
            <Grid.Col xs={6}>
                <h2 align={"center"}>Confirmation d’adresse mail et telephone</h2>
                <br/>
                <form action="" onSubmit={form.onSubmit(submit)}>
                    <InputWrapper
                        required
                        label="Code reçu par adresse email"

                    >
                        <TextInput
                            {...form.getInputProps("emailCode")}
                            required={true}
                            type={"text"} placeholder="0000"/>
                    </InputWrapper>
                    <InputWrapper
                        required
                        label="Code reçu par téléphone"
                    >
                        <TextInput
                            {...form.getInputProps("phoneCode")}
                            required={true}
                            type={"text"} placeholder="0000"/>
                    </InputWrapper>
                    <br/>
                    <Button component={"button"} type={"submit"}>
                        Confirm
                    </Button>
                </form>
            </Grid.Col>
        </Grid>
    </AppLayout>
}

export default ConfirmEmail