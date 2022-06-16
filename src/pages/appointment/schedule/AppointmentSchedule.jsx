import {Container, Grid} from "@mantine/core";
import {DoctorScheduleBox} from "../../../components";
import AppLayout from "../../../layouts/applayout/AppLayout";
import PatientLayout from "../../../layouts/patientlayout/PatientLayout";

const doctors = [
    {
        id: 1,
        date: "Vendredi 20 juin 2022",
        time: "10:00",
        doctorName: "Dr. John Doe",
        doctorAvatar: "https://i.pravatar.cc/300?img=1",
        doctorSpeciality: "Dentist",
    },
    {
        id: 2,
        date: "Lundi 21 mars 2022",
        time: "10:00",
        doctorName: "Dr. Jhane nirol",
        doctorAvatar: "https://i.pravatar.cc/300?img=2",
        doctorSpeciality: "Médecin généraliste",
    },
    {
        id: 3,
        date: "Mardi 22 avril 2022",
        time: "12:30",
        doctorName: "Dr. Left twix",
        doctorAvatar: "https://i.pravatar.cc/300?img=3",
        doctorSpeciality: "Médecin généraliste",
    },
    {
        id: 4,
        date: "Mercredi 23 mai 2022",
        time: "10:00",
        doctorName: "Dr. John Doe",
        doctorAvatar: "https://i.pravatar.cc/300?img=4",
        doctorSpeciality: "Dentist",
    },
    {
        id: 5,
        date: "Jeudi 24 juin 2022",
        time: "10:00",
        doctorName: "Dr. Jhane nirol",
        doctorAvatar: "https://i.pravatar.cc/300?img=5",
        doctorSpeciality: "Médecin généraliste",
    },
    {

        id: 6,
        date: "Vendredi 25 juin 2022",
        time: "10:00",
        doctorName: "Dr. John Doe",
        doctorAvatar: "https://i.pravatar.cc/300?img=6",
        doctorSpeciality: "Dentist",
    },
    {
        id: 7,
        date: "Lundi 26 mars 2022",
        time: "10:00",
        doctorName: "Dr. Jhane nirol",
        doctorAvatar: "https://i.pravatar.cc/300?img=7",
        doctorSpeciality: "Médecin généraliste",
    },

];

function Schedule() {
    return (
        <PatientLayout>
            <AppLayout title={"Randez-vous à venir"}>
                <br/>
                <br/>
                <h1>Randez-vous à venir</h1><br/>
                <Grid justify={"space-between"}>
                    {doctors?.map((doctor) => (
                        <DoctorScheduleBox canDelete={true} key={doctor.id} {...doctor} />
                    ))}
                </Grid>
            </AppLayout>
        </PatientLayout>
    );
}

export default Schedule;
