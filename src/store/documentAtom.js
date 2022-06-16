import {atom} from "recoil";

const documentAtom = atom({
    key: "documentStore",
    default: {
        documents: [
            {
                id: 1,
                title: "Document 1",
                createdAt: "2020-01-01",
                createdBy: "John Doe",
            }
        ],
        selectedDocument: null,
    }
})
export {documentAtom}