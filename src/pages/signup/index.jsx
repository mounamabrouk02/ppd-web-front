import {Button, Checkbox, Grid, Input, InputWrapper, PasswordInput} from '@mantine/core';
import {useNavigate} from "react-router-dom";
import styles from "./Signup.module.scss"
import {Calendar, DatePicker} from "@mantine/dates";
import {showNotification} from "@mantine/notifications";
import {Mailbox, Phone} from 'tabler-icons-react';
import AppLayout from "../../layouts/applayout/AppLayout";

function Signup() {
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e?.preventDefault()

        showNotification({
            title: 'Inscription réussie',
            message: 'Veuillez vérifier votre e-mail et votre téléphone pour le code que nous vous avons envoyé',
        })

        navigate("/signup/confirm")
    }
    return <AppLayout title={"S’inscrire"}>
        <Grid justify={"center"} className={styles.authContainer}>
            <Grid.Col md={6} xs={12}>
                <h2 align={"center"} style={{color: "#03586B"}}>S’inscrire</h2>
                <br/>
                <form action="" onSubmit={onSubmit}>
                    <Grid>
                        <Grid.Col span={6}>
                            <InputWrapper
                                required
                                label="Nom"
                                error={null}
                            >
                                <Input type={"text"} placeholder="Nom"/>
                            </InputWrapper>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <InputWrapper
                                required
                                label="Prenom"
                                error={null}
                            >
                                <Input type={"text"} placeholder="Prenom"/>
                            </InputWrapper>
                        </Grid.Col>
                    </Grid>
                    <InputWrapper
                        required
                        label="Téléphone portable"
                        error={null}
                    >
                        <Input rightSection={<Phone size={18}/>} type={"text"} placeholder="Téléphone portable"/>
                    </InputWrapper>
                    <InputWrapper
                        required
                        label="Votre adresse email"
                        error={null}
                    >
                        <Input rightSection={<Mailbox size={18}/>} type={"email"} placeholder="Votre adresse email"/>
                    </InputWrapper>
                    <InputWrapper
                        required
                        label="Confirmer votre adresse email"
                        error={null}
                    >
                        <Input rightSection={<Mailbox size={18}/>} type={"email"}
                               placeholder="Confirmer votre adresse email"/>
                    </InputWrapper>
                    <DatePicker placeholder="Pick date" label="Event date" required/>
                    <PasswordInput required label={"Choisissez un mot de passe "}
                                   placeholder={"Choisissez un mot de passe "}/>

                    <br/>

                    <Checkbox
                        label="J'accepte les  Conditions d'Utilisation de Doctolib "
                    /><br/>
                    <Checkbox
                        label="Se souvenir de mon identifiant"
                    />
                    <br/>
                    <Button component={"button"} color={"cyan"} type={"submit"}>
                        S’inscrire
                    </Button>
                </form>
            </Grid.Col>
        </Grid>
    </AppLayout>
}

export default Signup