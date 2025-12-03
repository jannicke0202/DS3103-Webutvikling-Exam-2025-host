import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AdminPage, HomePage } from "../pages";
import PageFooter from "../components/shared/PageFooter";
import PageNavigation from "../components/shared/PageNavigation";
import RegisterPage from "../pages/RegisterPage";
import Page4 from "../pages/Page4";
import Page5 from "../pages/Page5";

const AppRouting = () => {
    return (
        <BrowserRouter>

        <PageNavigation></PageNavigation>
        
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element = {<RegisterPage/>}/>
            <Route path="/administration-page" element={<AdminPage/>}/>
            <Route path="/page4" element={<Page4/>}/>
            <Route path="/page5" element={<Page5/>}/>
        </Routes>

        <PageFooter/>

        </BrowserRouter>
    )
}

export default AppRouting;