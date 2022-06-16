import {Button, Container, Grid} from "@mantine/core";
import {Link} from "react-router-dom";
import {CalendarStats} from "tabler-icons-react";
import PatientLayout from "../../../layouts/patientlayout/PatientLayout";
import AppLayout from "../../../layouts/applayout/AppLayout";

function AppointmentHome() {

    return (
        <PatientLayout>
            <AppLayout title={"Rendez-vous"}>
                <br/>
                <br/>
                <Grid justify="center">
                    <CalendarStats size={64} strokeWidth={2} color={"#314459"}/>
                </Grid>
                <br/>
                <Grid justify="center">
                    <Link to={"/appointment/schedule"}><Button>PRENDRE UN RENDEZ VOUS</Button></Link>
                </Grid>
            </AppLayout>
        </PatientLayout>
    );
}

export default AppointmentHome;
