import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Index from './pages';
import Desboard from './pages/desboard';
import Adminkit from './pages/adminkit';
import Adminreport from './pages/adminreport';
import Practitioner from './pages/Practitioner';
import Patient from './pages/Patients';
import Profile from './pages/Profile';
import { useNavigate } from 'react-router-dom'
import Fskits from './pages/fskits';
import Fsprec from './pages/fsprec';
import Screen4TestForm from './pages/FSForm';

function ScrollToTop() {
  const { pathname } = useLocation();
  const loginemail = Cookies.get("email")
  const loginname = Cookies.get("Name")
  const id = Cookies.get("id")
  const token = Cookies.get("Token")
  const navigate = useNavigate()




  useEffect(() => {
    window.scrollTo(0, 0);

    if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("_id", id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
//https://yourgutmap-food-sensitivity-423a2af84621.herokuapp.com
      fetch(`${process.env.REACT_APP_API_URL}/profileinfocheck`, requestOptions)
        .then(response => response.text())
        .then(result => {
          if (result === "deactivated") {
            const allCookies = Cookies.get();
            for (const cookieName in allCookies) {
              Cookies.remove(cookieName);
            }
            navigate('/')
          }

        })
        .catch(error => console.log('error', error));
    }


  }, [pathname]);

  return null;
}



function App() {

  return (

    <div className="App">

      <BrowserRouter>
        <ScrollToTop />


        <Routes>

          <Route path='/' element={<Patient />} />
          {/* <Route path='/kitack' element={<Ackpage />} /> */}
          {/* <Route path='/shipping' element={<Shippingform />} /> */}
          {/* <Route path='/leads' element={<Leads />} /> */}
    
          {/* <Route path='/eventinfo' element={<Eventinfoform/>} /> */}
          {/* <Route path='/bucket' element={<Bucket />} /> */}
          <Route path='/dashboard' element={<Patient />} />
          {/* <Route path='/dashboard/analysis' element={<KitAnalysis />} /> */}
          {/* <Route path='/dashboard/webinar' element={<Webinar />} /> */}
          {/* <Route path='/dashboard/webinar/:id' element={<Webinardetails />} /> */}
          {/* <Route path='/dashboard/webinar/meeting/:id' element={<Meeting />} /> */}
          {/* <Route path='/dashboard/helpcenter' element={<Helpcenter />} /> */}
          {/* <Route path='/dashboard/tickets' element={<Tickets />} /> */}
          {/* <Route path='/dashboard/order-states' element={<Orderstates />} /> */}
          {/* <Route path='/dashboard/map' element={<Maps />} /> */}
          {/* <Route path='/dashboard/tickets/:id' element={<Ticketsid />} /> */}
          {/* <Route path='/dashboard/kitregistration' element={<Kitregistration />} /> */}
          {/* <Route path='/dashboard/para-report/:id' element={<Pararesults />} /> */}
          {/* <Route path='/dashboard/view-report/:id' element={<Viewreport />} /> */}
          {/* <Route path='/dashboard/view-report100/:id' element={<Viewreport2 />} /> */}


        </Routes>

        <Routes>

          {/* fs/  */}
          <Route path='/dashboard/fs/kit' element={<Fskits />} />
          <Route path='/dashboard/fs/report' element={<Adminreport />} />
          <Route path='/dashboard/fs/practitioner' element={<Fsprec />} />

          {/* micro/     */}
          {/* <Route path='/dashboard/micro/kit' element={<Microkit />} />
          <Route path='/dashboard/micro/report' element={<Mircoreport />} />
          <Route path='/dashboard/micro/practitioner' element={<Micropre />} /> */}



          {/* dna/     */}
          {/* <Route path='/dashboard/dna/kit' element={<DNAkit />} />
          <Route path='/dnamap-form' element={<Dnamapform />} />
          <Route path='/Parasitology-Test-Form' element={<Praform />} />
          <Route path='/dashboard/dna/report' element={<DNAreport />} />
          <Route path='/dashboard/dna/practitioner' element={<DNAprec />} /> */}

          {/* Parasitology */}
          {/* <Route path='/dashboard/Parasitology/kit' element={<Parasitologykit />} />
          <Route path='/dashboard/Parasitology/report' element={<Parasitologyreport />} />
          <Route path='/dashboard/Parasitology/practitioner' element={<Parasitologyprec />} /> */}



          <Route path='/dashboard/kit' element={<Adminkit />} />
          <Route path='/dashboard/practitioner' element={<Practitioner />} />
          <Route path='/dashboard/patient' element={<Patient />} />
          {/* <Route path='/dashboard/practitionerstates' element={<Pracstate />} /> */}
          {/* <Route path='/dashboard/orders' element={<Orderlables />} /> */}
          {/* <Route path='/dashboard/shippingdata' element={<Shipping />} /> */}
          {/* <Route path='/dashboard/eventinfogdata' element={<Eventinfo />} /> */}

          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/screen4testform' element={<Screen4TestForm />} />




        </Routes>


      </BrowserRouter>

    </div>
  );
}

export default App;
