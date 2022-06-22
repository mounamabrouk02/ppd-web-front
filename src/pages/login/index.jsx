import {
    Button,
    Checkbox,
    Grid,
    Input,
    InputWrapper,
    PasswordInput,
    Notification,
    Alert,
    TextInput
} from '@mantine/core';
import {Link, useNavigate} from "react-router-dom";
import styles from "./Login.module.scss"
import {AlertCircle, Mailbox, PhoneCall} from "tabler-icons-react";
import AppLayout from "../../layouts/applayout/AppLayout";
import useAxios from "../../hooks/useAxios";
import {useForm} from "@mantine/hooks";
import {useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authState} from "../../store/authStore";
import {showNotification} from "@mantine/notifications";
import {loginState} from "../../store/loginStore";

function Login() {
    const [sending, call] = useAxios();
    const [loginFaild, setLoginFaild] = useState(false);
    const setAuth = useSetRecoilState(authState);
    const loginValue = useRecoilValue(loginState);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            phone: loginValue?.username,
            password: ""
        },
        validate: {
            phone: (value) => {
                if (!value) {
                    return "Numéro de téléphone requis";
                }
            },
            password: (value) => {
                if (!value) {
                    return "Mot de passe requis";
                }
            }
        }
    })
    const login = ({phone, password}) => {
        call.post("/auth", {
            username: phone,
            password
        })
            .then((res) => {
                setAuth(old => ({
                    ...old,
                    token: res.data.token,
                    fullName: res.data.fullName,
                    isAuthenticated: true
                }))
                navigate("/")
            })
            .catch((err) => {
                form.setFieldValue("password", "")

                const repsonse = err.response
                if (repsonse) {
                    if (repsonse.status === 400) {
                        showNotification({
                            title: "Erreur",
                            message: err.response.data.message,
                            color: "red"
                        })
                        setLoginFaild(false)
                        return
                    }
                }
                setLoginFaild(true)
            })
    }
    return <AppLayout title={"Connexion"}>
        <Grid justify={"center"} className={styles.authContainer}>
            <Grid.Col xs={6}>
                <h2 align={"center"} style={{color: "#03586B"}}>Connexion</h2>
                <br/>
                <form action="" onSubmit={form.onSubmit(login)}>
                    <InputWrapper
                        required
                        label="Numéro de téléphone"
                        error={null}
                    >
                        <TextInput
                            description={"+33 123 45 67 89"}
                            {...form.getInputProps('phone')}
                            rightSection={<PhoneCall size={18}/>}
                            type={"text"} placeholder="Numéro de téléphone"/>
                    </InputWrapper>
                    <br/>
                    <PasswordInput
                        placeholder="Password"
                        label="Password"
                        description="Password must include at least one letter, number and special character"
                        required
                        {...form.getInputProps('password')}
                    />
                    <br/>
                    <Checkbox
                        label="Se souvenir de mon identifiant"
                    />
                    <br/>
                    <Button loading={sending} type={"submit"} color={"cyan"}>
                        Se connecter
                    </Button>
                    <br/>
                    {
                        loginFaild && <>
                            <br/>
                            <Alert icon={<AlertCircle size={16}/>} title="Échec de la connexion!" color="red">
                                Aucun compte n'est associé à cette nom d'utilisateur
                            </Alert>
                        </>
                    }
                    <br/>
                    <Link to={"/"}>Mot de passe oublié</Link>
                </form>
            </Grid.Col>
        </Grid>
    </AppLayout>
}

export default Login