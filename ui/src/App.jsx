import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Chats from "./components/Chats";
import Statuses from "./components/Statuses";
import Calls from "./components/Calls";

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Chats/>} />

<Route path="/chats" element={<Chats/>} />

<Route path="/statuses" element={<Statuses/>} />

<Route path="/calls" element={<Calls/>} />

</Routes>

</BrowserRouter>

)

}

export default App;