import {Button, Card, Container, Grid, Image} from "@mantine/core";
import {Clock, Trash} from "tabler-icons-react";
import styles from "./DoctorScheduleBox.module.scss";

function DoctorScheduleBox({
                               date,
                               time,
                               doctorName,
                               doctorAvatar,
                               doctorSpeciality,
                               isPast = false,
                               canDelete = false
                           }) {
    return (
        <Grid.Col sm={12}>
            <div className={styles.outerContainer}>
                <div className={styles.container}>
                    <div className={[styles.header, isPast ? "past" : ""].join(" ")}>
                        <div className={styles.date}>{date}</div>
                        <div className={styles.time}>
                            <Clock size={18}/> <span>{time}</span>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.avatar}>
                            <img src={doctorAvatar} alt={doctorName}/>
                        </div>
                        <div className={styles.doctorInfo}>
                            <h4 className="doc-title">{doctorName}</h4>
                            <br/>
                            <h5 className="doc-speciality">{doctorSpeciality}</h5>
                        </div>
                    </div>
                    <div className={[
                        styles.footer,
                        canDelete ? "can-delete" : ""
                    ].join(" ")}>
                        <span>REPRENDRE UN RANDEZ VOUS</span>
                        {
                            canDelete && <Button
                                leftIcon={<Trash size={16}/>}
                                compact variant={"subtle"} color={"red"}>SUPPRIMER</Button>
                        }
                    </div>
                </div>
            </div>
        </Grid.Col>
    );
}

export default DoctorScheduleBox;
