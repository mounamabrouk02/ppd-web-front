import AppLayout from "../../../layouts/applayout/AppLayout";
import PatientLayout from "../../../layouts/patientlayout/PatientLayout";
import {DoctorScheduleBox} from "../../../components";
import {Grid} from "@mantine/core";


const pasedAppt = [
    {
        id: 1,
        date: "Vendredi 20 juin 2022",
        time: "10:00",
        doctorName: "Dr. John Doe",
        doctorAvatar: "https://i.pravatar.cc/300?img=1",
        doctorSpeciality: "Dentist",
    },
    {
        id: 1,
        date: "Vendredi 20 juin 2022",
        time: "10:00",
        doctorName: "Dr. John Doe",
        doctorAvatar: "https://i.pravatar.cc/300?img=1",
        doctorSpeciality: "Dentist",
    },
]

function AppointmentPast() {
    return <PatientLayout>
        <AppLayout title={"Rendez-vous passés"}>
            <br/>
            <br/>
            <h1>Rendez-vous passés</h1>
            <Grid justify={"space-between"}>
                {pasedAppt?.map((doctor) => (
                    <DoctorScheduleBox key={doctor.id} isPast={true} {...doctor} />
                ))}
            </Grid>
        </AppLayout>
    </PatientLayout>
}

export default AppointmentPast;