import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AdminPage, HomePage } from "../pages";
import PageFooter from "../components/shared/PageFooter";
import PageNavigation from "../components/shared/PageNavigation";

const AppRouting = () => {
    return (
        <BrowserRouter>

        <PageNavigation></PageNavigation>
        
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="administation-panel" element={<AdminPage/>}/>
            
        </Routes>

        <PageFooter/>

        </BrowserRouter>
    )
}

export default AppRouting;