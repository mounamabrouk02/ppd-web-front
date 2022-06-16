import styles from "./PatientLayout.module.scss"
import {Container} from "@mantine/core";
import {Link, useLocation} from "react-router-dom";

export const HEADER_TYPES = {
    appointment: "appointment",
    documents: "documents"
}

const Header = ({type}) => {
    const {pathname} = useLocation();
    if(type === HEADER_TYPES.documents){
        return <div className={styles.header}>
            <Link
                className={pathname === "/documents" ? "active" : ""}
                to={"/documents"}>
                Trouve votre pharmacie
            </Link>
        </div>
    }
    else{
        return <div className={styles.header}>
            <Link
                className={pathname === "/appointment" ? "active" : ""}
                to={"/appointment"}>
                Prendre un rendez-vous
            </Link>
            <Link
                className={pathname === "/appointment/schedule" ? "active" : ""}
                to={"/appointment/schedule"}>
                Mes rendez-vous à venir
            </Link>
            <Link
                className={pathname === "/appointment/past" ? "active" : ""}
                to={"/appointment/past"}>
                Mes rendez-vous passés
            </Link>
        </div>
    }
}

const PatientLayout = ({type = HEADER_TYPES.appointment, children}) => {
    return <div className={styles.container}>
        <Header type={type}/>
        <Container>
            {children}
        </Container>
    </div>
}
export default PatientLayout;