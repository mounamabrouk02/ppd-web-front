import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Header from "./layouts/header";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ConfirmEmail from "./pages/confirm_email";
import {useRecoilValue} from "recoil";
import {authState} from "./store/authStore";
import AppointmentHome from "./pages/appointment/home";
import AppointmentSchedule from "./pages/appointment/schedule/AppointmentSchedule";
import AppointmentPast from "./pages/appointment/past/AppointmentPast";
import SendDocument from "./pages/documents/send/SendDocument";
import MyDocuments from "./pages/documents/mydocuments/MyDocuments";

function App() {
    const auth = useRecoilValue(authState)
    const routes = [
        {
            path: "/login",
            requireAuth: false,
            component: Login
        },
        {
            path: "/signup",
            requireAuth: false,
            component: Signup
        },
        {
            path: "/signup/confirm",
            requireAuth: false,
            component: ConfirmEmail
        },
        {
            path: "/appointment",
            requireAuth: true,
            component: AppointmentHome
        },
        {
            path: "/appointment/schedule",
            requireAuth: true,
            component: AppointmentSchedule
        },
        {
            path: "/appointment/past",
            requireAuth: true,
            component: AppointmentPast
        },
        {
            path: "/documents",
            requireAuth: true,
            component: MyDocuments
        },
        {
            path: "/documents/send",
            requireAuth: true,
            component: SendDocument
        }
    ]
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                {
                    routes.map(({component: Component, ...route}) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact !== "undefined" ? route.exact : true}
                            element={<ExtendedRoute requireAuth={route.requireAuth}/>}
                        >
                            <Route
                                path={route.path}
                                exact={route.exact !== "undefined" ? route.exact : true}
                                element={<Component/>}/>
                        </Route>
                    ))
                }
                <Route path={"/"} exact element={<Home/>}/>

            </Routes>
        </BrowserRouter>
    );
}

function ExtendedRoute({
                           requireAuth = false,
                           ...props
                       }) {
    const auth = useRecoilValue(authState)

    if (requireAuth && !auth.isAuthenticated) {
        return <Navigate to={"/login"}/>
    }
    if (!requireAuth && auth.isAuthenticated) {
        return <Navigate to={"/appointment"}/>
    }
    return <Outlet/>
}

export default App;
