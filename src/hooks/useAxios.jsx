import {useRecoilValue} from "recoil";
import {authState} from "../store/authStore";
import axios from "axios";
import {useState} from "react";

function useAxios() {
    const [isSending, setIsSending] = useState(false);
    const auth = useRecoilValue(authState);

    const instance = axios.create({
        baseURL: "http://localhost:8080/api/",
        headers: {
            Authorization: `Bearer ${auth.token}`,
        },
    });
    instance.interceptors.request.use((response) => {
        setIsSending(true);
        return response;
    }, (error) => {
        setIsSending(false);
        return Promise.reject(error);
    })

    instance.interceptors.response.use(
        (response) => {
            setIsSending(false);
            return response;
        },
        (error) => {
            setIsSending(false);
            return Promise.reject(error);
        }
    )

    return [isSending, instance];
}

export default useAxios;