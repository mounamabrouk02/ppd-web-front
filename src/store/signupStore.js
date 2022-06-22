import {atom} from "recoil";

const signupState = atom({
    key: 'signupState',
    default: {
        userId: null,
    }
})


export {signupState};