import styles from "./Header.module.scss"
import {Button, Menu} from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import {Logout, User, UserCircle} from 'tabler-icons-react';
import logo from "../../assets/img/logo.svg"
import {useRecoilState} from "recoil";
import {authState} from "../../store/authStore";

function Index() {
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authState)

    const goto = (path) => {
        navigate(path)
    }

    const logout = ()=>{
        setAuth(old => ({
            ...old,
            isAuthenticated: false,
            user: null
        }))
    }

    const testLogin = () => {
        setAuth(old => ({
            ...old,
            isAuthenticated: true,
            user: {
                username: "test",
                fullName: "John doe"
            }
        }))
    }

    return <div className={styles.container}>
        <h2 onClick={() => goto("/")} className={styles.logo}>
            <img src={logo} alt="logo"/>
        </h2>
        <div className="auth">
            {
                !auth.isAuthenticated ? <>
                    <Button onClick={() => testLogin()} variant="subtle" color={"cyan"} radius={0}>(Temp : Tester la
                        connexion)</Button>
                    <Button onClick={() => goto("/login")} variant="subtle" color={"cyan"} radius={0}>Professionnel de
                        santé?</Button>
                    <Button onClick={() => goto("/login")} variant="subtle" color={"cyan"} radius={0}>Se
                        connecter</Button>&nbsp;
                    <Button leftIcon={<User size={16}/>} onClick={() => goto("/signup")} variant="default"
                            radius={0}>S'inscrire</Button>
                </> : <>
                    <Button onClick={() => goto("/login")} variant="subtle" color={"cyan"} radius={0}>Mes
                        rendez-vous</Button>
                    <Button onClick={() => goto("/documents")} variant="subtle" color={"cyan"} radius={0}>Mes
                        documents</Button>
                    <Menu control={<Button
                        rightIcon={<UserCircle size={16}/>}
                        variant="subtle" color={"cyan"} radius={0}>Mon compte</Button>}
                    >
                        <Menu.Label>{auth?.user?.fullName}</Menu.Label>

                        <Menu.Item icon={<User size={16}/>}>Profile</Menu.Item>
                        <Menu.Item onClick={logout} icon={<Logout size={16} />}>Se déconnecter</Menu.Item>
                    </Menu>

                </>
            }

        </div>
    </div>
}

export default Index