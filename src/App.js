import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import MainPage from './components/pages/Main/MainPage';
import AcknowledgementPage from './components/pages/Acknowledgement/AcknowledgementPage';


const  App = () => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<MainPage/>}/>
        <Route path = "/acknowledgement-page" element={<AcknowledgementPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
