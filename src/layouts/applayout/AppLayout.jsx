import {Container} from "@mantine/core";
import {useDocumentTitle} from "@mantine/hooks";

const AppLayout = ({children,fluid = false, downSpace = false, title = "Doctor", ...props}) => {
    useDocumentTitle(title)
    return <Container fluid={fluid} mt={4} {...props}>
        {
            downSpace && <><br/><br/></>
        }
        {children}
    </Container>
}
export default AppLayout