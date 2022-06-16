import PatientLayout, {HEADER_TYPES} from "../../../layouts/patientlayout/PatientLayout";
import AppLayout from "../../../layouts/applayout/AppLayout";
import styles from "./DocumentBox.module.scss"
import {Grid} from "@mantine/core";

function DocumentBox({
                         title,
                         address,
                         id
                     }) {
    return <div className={styles.outerContainer}>
        <div className={styles.container}>
            <div className={styles.contaner}>
                <h4>{title}</h4>
                <br/>
                <p>{address}</p>
            </div>
            <div className={styles.footer}>
                Envoyer
            </div>
        </div>
    </div>
}

const documentsData = [
    {
        id: 1,
        title: "Pharmacie aux Lilas",
        address: "10 rue des Lilas, 75010 Paris",
    },
    {
        id: 2,
        title: "Pharmacie TICO",
        address: "2 Rue de Paris , 75006 Paris",
    }
]

function SendDocument() {
    return <PatientLayout type={HEADER_TYPES.documents}>
        <AppLayout title={"Mes documents"}>
            <h1>Mes documents</h1>
            <Grid justify={"center"}>
                <Grid.Col sm={12} md={6}>
                    {
                        documentsData?.map(e => {
                            return <DocumentBox key={e.id} {...e}/>
                        })
                    }
                </Grid.Col>
            </Grid>
        </AppLayout>
    </PatientLayout>
}

export default SendDocument;