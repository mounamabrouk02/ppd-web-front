import styles from "./Home.module.scss"
import {Button, Card, Container, Grid, Image, Input, Text} from "@mantine/core";
import {Search} from "tabler-icons-react";
import homeTop from "../../assets/img/home_top.svg"
import footerImg1 from "../../assets/img/footer/1.svg"
import footerImg2 from "../../assets/img/footer/2.svg"
import footerImg3 from "../../assets/img/footer/3.svg"
import AppLayout from "../../layouts/applayout/AppLayout";

function HomeTop() {
    return <>
        <div className={styles.homeTop}>
            <h1>Réservez un rendez-vous en ligne chez un médecin ou en pharmacie</h1>
            <img src={homeTop}/>
        </div>
    </>
}

function HomeFooterBox({img, description}) {
    return <div className={styles.homeFooterBox}>
        <img src={img}/>
        <p>{description}</p>
    </div>
}

function HomeFooter() {

    return <div className={styles.homeFooter}>
        <HomeFooterBox img={footerImg1} description={"Trouvez rapidement un médecin ou une pharmacie disponible"}/>
        <HomeFooterBox img={footerImg2} description={"Accédez plus rapidement à vos documents médicax"}/>
        <HomeFooterBox img={footerImg3} description={"Choisissez le meilleur praticien pour vous"}/>
    </div>
}

function Home() {
    return (
        <AppLayout fluid={true}>
            <div className={styles.homeLayout}>
                <Container>
                    <HomeTop/>
                    <div className={styles.searchContainer}>
                        <p>Réservez une consultation physique oou vidéo chez un professionnel de santé</p>
                        <br/>
                        <Grid>
                            <Grid.Col span={6}>
                                <Input
                                    variant="filled"
                                    placeholder={"Spécialité, médecin, établissement ..."} radius={0}/>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Input
                                    variant="filled"
                                    placeholder={"Ville"} radius={0}/>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Button rightIcon={<Search
                                    size={16}
                                />}>Rechercher</Button>
                            </Grid.Col>
                        </Grid>
                    </div>
                    <br/>
                    <Grid grow align="stretch">
                        <Grid.Col className={styles.boxContainer} span={4}>
                            <Card shadow="sm" p="lg">
                                <Text size="sm" style={{color: 'blue', lineHeight: 1.5}}>
                                    Partagez vos
                                    documents avec les médecins et pharmacies
                                </Text>

                                <Button color={"cyan"} fullWidth style={{marginTop: 14}}>
                                    Partager mes docs
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col className={styles.boxContainer} span={4}>
                            <Card shadow="sm" p="lg">
                                <Text size="sm" style={{color: 'blue', lineHeight: 1.5}}>
                                    Renouveler votre ordonnance en ligne
                                </Text>

                                <Button color={"cyan"} fullWidth style={{marginTop: 14}}>
                                    Renouveler mes ordonnances
                                </Button>
                            </Card>
                        </Grid.Col>
                        <Grid.Col className={styles.boxContainer} span={4}>
                            <Card shadow="sm" p="lg">
                                <Text size="sm" style={{color: 'blue', lineHeight: 1.5}}>
                                    Commander vos médicaments chez une pharmacie près de chez vous
                                </Text>

                                <Button color={"cyan"} fullWidth style={{marginTop: 14}}>
                                    Renouveler mes ordonnances
                                </Button>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
                <HomeFooter/>
            </div>
        </AppLayout>
    );
}

export default Home
