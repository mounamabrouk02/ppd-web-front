import {Button, Checkbox, Grid, Input, InputWrapper, PasswordInput} from '@mantine/core';
import {Link} from "react-router-dom";
import styles from "./Login.module.scss"
import {Mailbox} from "tabler-icons-react";
import AppLayout from "../../layouts/applayout/AppLayout";

function Login() {
    return <AppLayout title={"Connexion"}>
        <Grid justify={"center"} className={styles.authContainer}>
            <Grid.Col xs={6}>
                <h2 align={"center"} style={{color: "#03586B"}}>Connexion</h2>
                <br/>
                <form action="">
                    <InputWrapper
                        required
                        label="Adresse email ou numéro de téléphone"
                        error={null}
                    >
                        <Input
                            rightSection={<Mailbox size={18}/>}
                            type={"text"} placeholder="Adresse email ou numéro de téléphone"/>
                    </InputWrapper>
                    <br/>
                    <PasswordInput
                        placeholder="Password"
                        label="Password"
                        description="Password must include at least one letter, number and special character"
                        required
                    />
                    <br/>
                    <Checkbox
                        label="Se souvenir de mon identifiant"
                    />
                    <br/>
                    <Button color={"cyan"}>
                        Se connecter
                    </Button>
                    <br/>
                    <br/>
                    <Link to={"/"}>Mot de passe oublié</Link>
                </form>
            </Grid.Col>
        </Grid>
    </AppLayout>
}

export default Login