import AppLayout from "../../../layouts/applayout/AppLayout";
import {ActionIcon, Button, Grid, Input, InputWrapper, Select, Table} from "@mantine/core";
import {Eye, Pencil, Plus, Share, Trash} from "tabler-icons-react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {documentAtom} from "../../../store/documentAtom";
import addDocumentsStyles from "./AddDocuments.module.scss";
import {useState} from "react";
import {useForm} from "@mantine/hooks";
import {faker} from "@faker-js/faker";

function ListDocuments() {
    const documentsValue = useRecoilValue(documentAtom);
    return <Table mt={20} captionSide="bottom">
        <caption>Mes documents</caption>
        <thead>
        <tr>
            <th>Document</th>
            <th>Créé le</th>
            <th>Créé par</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {
            documentsValue?.documents?.map((document) => (
                <tr key={document.id}>
                    <td>{document.title}</td>
                    <td>{document.createdAt}</td>
                    <td>{document.createdBy}</td>
                    <td>
                        <Grid>
                            <ActionIcon title={"Modifier"} size={"sm"} color={"gray"} variant="filled">
                                <Pencil size={16}/>
                            </ActionIcon>
                            &nbsp;
                            <ActionIcon title={"Consulter"} size={"sm"} color={"orange"} variant="filled">
                                <Eye size={16}/>
                            </ActionIcon>
                            &nbsp;
                            <ActionIcon title={"Supprimer"} size={"sm"} color={"red"} variant="filled">
                                <Trash size={16}/>
                            </ActionIcon>
                            &nbsp;
                            <ActionIcon title={"Partager en pharmacie"} size={"sm"} color={"blue"} variant="filled">
                                <Share size={16}/>
                            </ActionIcon>
                        </Grid>
                    </td>
                </tr>
            ))
        }
        </tbody>
    </Table>
}

function AddEditDocuments({switchPage, isEdit = false}) {
    const form = useForm({
        initialValues: {
            title: ''
        },
    });
    const setDocumentValue = useSetRecoilState(documentAtom);

    const handleSubmit = ({title}) => {
        form.reset();
        setDocumentValue((old) => ({
            ...old,
            documents: [...old.documents, {
                title,
                createdAt: new Date().toISOString(),
                createdBy: faker.name.findName(),
                id: old.documents.length + 1
            }]
        }))
        switchPage();
    }
    return <Grid mt={20} justify={"center"}>
        <Grid.Col xs={12} sm={6}>
            <div className={addDocumentsStyles.container}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <InputWrapper placeholder={"Nom du document"} label="Nom de document">
                        <Input {...form.getInputProps("title")} radius={0}/>
                    </InputWrapper>
                    <br/>
                    <Select
                        label="Type de document"
                        placeholder="Sélectionner le type de document"
                        data={[
                            {value: 'pdf', label: 'PDF'},
                            {value: 'word', label: 'Word document'}
                        ]}
                    />
                    <br/>
                    <Select
                        label="Patient concerné"
                        placeholder="Sélectionner le patient "
                        data={[
                            {value: 'pdf', label: 'PDF'},
                            {value: 'word', label: 'Word document'}
                        ]}
                    />
                    <br/>
                    <br/>
                    <Grid justify={"end"}>
                        <Button onClick={switchPage} radius={0} compact variant={"subtle"}>ANNULER</Button>
                        <Button type={"submit"} radius={0} compact color={"cyan"}>AJOUTER UN DOCUMENT</Button>
                    </Grid>
                </form>
            </div>
        </Grid.Col>
    </Grid>
}

function MyDocuments() {
    const [isListDocument, setIsListDocument] = useState(true);

    function switchPage() {
        setIsListDocument(prev => !prev);
    }

    return (
        <AppLayout downSpace title={"Mes documents"}>
            <h1>My Documents</h1>
            {
                isListDocument ? <>
                        <Grid justify={"center"} mt={10}>
                            <Button onClick={switchPage} leftIcon={<Plus size={16}/>} color={"cyan"}>AJOUTER UN
                                DOCUMENT</Button>
                        </Grid>
                        <ListDocuments/>
                    </>
                    :
                    <AddEditDocuments switchPage={switchPage}/>
            }


        </AppLayout>
    )
}

export default MyDocuments;