import {Button, Grid, Input, InputWrapper} from '@mantine/core';
import styles from "./ConfirmEmail.module.scss"
import AppLayout from "../../layouts/applayout/AppLayout";

function ConfirmEmail() {

    return <AppLayout>
        <Grid justify={"center"} className={styles.authContainer}>
            <Grid.Col xs={6}>
                <h2 align={"center"}>Confirmation d’adresse mail et telephone</h2>
                <br/>
                <form action="">
                    <InputWrapper
                        required
                        label="Code reçu par adresse email"
                        error={null}
                    >
                        <Input type={"text"} placeholder="Code reçu par adresse email"/>
                    </InputWrapper>
                    <InputWrapper
                        required
                        label="Code reçu par téléphone"
                        error={null}
                    >
                        <Input type={"text"} placeholder="Code reçu par téléphone"/>
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