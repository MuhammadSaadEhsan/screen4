import React, { useEffect, useState } from 'react'
import "../components/component.css"
import { GiExitDoor } from "react-icons/gi"
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"

import { IoNotificationsSharp } from "react-icons/io5";

import Cookies from 'js-cookie';
import { MdMedicalInformation, MdOutlineAnalytics, MdOutlineAppRegistration, MdOutlineQueryStats, MdOutlineSpaceDashboard, MdOutlineWeb } from "react-icons/md"
import { FaBowlFood, FaClipboardQuestion, FaKitMedical } from "react-icons/fa6"
import { HiOutlineUsers, HiUserGroup } from 'react-icons/hi2'
import { HiOutlineDocumentReport } from "react-icons/hi"
import { CgProfile, CgReorder } from "react-icons/cg"
import { useNavigate } from 'react-router-dom'

import { GiDna1, GiLiver } from 'react-icons/gi'
import { FcBiomass } from "react-icons/fc";
import { FaMicroscope, FaShippingFast } from 'react-icons/fa'
import { BiHelpCircle } from 'react-icons/bi'
import { IoTicketSharp } from 'react-icons/io5'
import { BsCalendar2EventFill } from 'react-icons/bs'
import { Avatar, Badge, message, Space } from 'antd'


function Navbar() {


    const loginemail = Cookies.get("email")
    const loginname = Cookies.get("Name")
    const id = Cookies.get("id")
    const token = Cookies.get("Token")
    const navigate = useNavigate()

    const logout = () => {
        const allCookies = Cookies.get();
        for (const cookieName in allCookies) {
            Cookies.remove(cookieName);
        }
        navigate('/')
    }

    const [manukonssa, setmanukonssa] = useState("0")

    const [manuuu, setmanu] = useState(false)
    const [manuuunoti, setmanuuunoti] = useState(false)
    const [notification, setnotification] = useState([])


    const openNotification = async () => {

        try {

            if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                const response = await fetch(`${process.env.REACT_APP_API_URL}/getallnotification`, requestOptions);


                const result = await response.json();

                await setnotification(result)
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            // Handle error (e.g., show error notification)
        }
    };



    useEffect(() => {
        openNotification()


    }, [])


    const count = () => {

        return notification.filter(item => item.status === false).length;
    }
    return (

        <>  {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
            {manuuunoti === true && <>
                <div className='notificationbg' onClick={() => setmanuuunoti(false)}> </div>
                <div className='notifications' >

                    {notification.map((value, index) => {


                        return (<>
                            <div className={`subnoti ${value.status === false ? 'bglight' : ''}`} >

                                <h4 style={{ margin: 0 }}>{value.title}</h4>
                                <p style={{ margin: 0 }}>{value.contant}</p>

                                {value.status === false && <>
                                    <button onClick={() => {
                                        const hide = message.loading("Action in progress", 0)
                                        var myHeaders = new Headers();
                                        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                                        var urlencoded = new URLSearchParams();
                                        urlencoded.append("_id", value._id);


                                        var requestOptions = {
                                            method: 'POST',
                                            headers: myHeaders,
                                            body: urlencoded,
                                            redirect: 'follow'
                                        };

                                        fetch(`${process.env.REACT_APP_API_URL}/editnotification`, requestOptions)
                                            .then(response => response.json())
                                            .then(result => {
                                                setnotification(result)
                                                // setmanuuunoti(false)
                                            })

                                        setTimeout(() => {
                                            hide(); // Call hide to stop the loading message
                                            message.success("Action completed successfully");
                                        }, 2000);

                                    }} className='button'>Mark as Read</button></>}
                            </div>

                        </>)
                    })}
                </div>
            </>}</>}
            <div className='navbar'>

                <div className='navlogo'>
                    <img alt='' src="/Screen4.png" width={"160px"} className='hovar' onClick={() => { navigate("/") }} />

                </div>
                {(token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" || token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") && <>

                    <div className='navmanu' style={{ display: 'flex', gap: '20px' }}>


                 
                        <h5 onClick={logout} className='hovar' style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4d4b4b' }} > <GiExitDoor style={{ width: '35px', height: '35px' }} />  LOGOUT</h5>



                        {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
                            <Space size="large">

                                <Badge count={count()} overflowCount={10} >
                                    <IoNotificationsSharp className='hovar' onClick={() => { setmanuuunoti(!manuuunoti) }} style={{ width: '25px', height: '25px', color: "#19b0e6" }} />
                                </Badge>

                            </Space>
                        </>}


                    </div>

                </>}
                <div className='navmanumob'>
                    {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
                        <Space size="large">

                            <Badge count={count()} overflowCount={10} >
                                <IoNotificationsSharp className='hovar' onClick={() => { setmanuuunoti(!manuuunoti) }} style={{ width: '30px', height: '30px', color: "#4180B7" }} />
                            </Badge>

                        </Space></>}

                    {(token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" || token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") && <>


                        {manuuu === false && <>   <h5 onClick={() => setmanu(true)} className='hovar' style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7050A0' }} > <FaBars style={{ width: '30px', height: '30px' }} />  </h5></>}
                        {manuuu === true && <>     <h5 onClick={() => setmanu(false)} className='hovar' style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7050A0' }} > <ImCross style={{ width: '30px', height: '30px' }} />  </h5></>}
                    </>}
                </div>



            </div >

            {manuuu === true && <>  <div className='mobmanubg' onClick={() => setmanu(false)}>  </div>
                <div className='mobmanu'>




                    <h3 onClick={() => navigate("/dashboard")}><MdOutlineSpaceDashboard style={{ width: '30px', height: '30px' }} /> Dashboard</h3>
                    <h3 onClick={() => setmanukonssa("1")}> <FaBowlFood style={{ width: '30px', height: '30px' }} /> Food Sensitivtiy            </h3>
                    {manukonssa === "1" && <>   <ul>
                        <li onClick={() => navigate("/dashboard/fs/kit")}><FaKitMedical style={{ width: '20px', height: '20px' }} />Kit </li>
                        {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <li onClick={() => navigate("/dashboard/fs/practitioner")}><HiUserGroup style={{ width: '20px', height: '20px' }} />Practitioners </li></>}
                        <li onClick={() => navigate("/dashboard/fs/report")}><HiOutlineDocumentReport style={{ width: '20px', height: '20px' }} />Reports </li>
                    </ul>
                    </>}
                    {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
                        {/* <h3 onClick={() => setmanukonssa("2")}><GiLiver style={{ width: '30px', height: '30px' }} />  Microbiome           </h3> */}
                        {manukonssa === "2" && <>     <ul>
                            <li onClick={() => navigate("/dashboard/micro/kit")}><FaKitMedical style={{ width: '20px', height: '20px' }} />Kit </li>
                            {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <li onClick={() => navigate("/dashboard/micro/practitioner")}><HiUserGroup style={{ width: '20px', height: '20px' }} />Practitioners </li></>}
                            {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <li onClick={() => navigate("/dashboard/kitregistration")}><MdOutlineAppRegistration style={{ width: '20px', height: '20px' }} />White Label KIT Registration </li></>}


                        </ul>
                        </>}   </>}

                    {/* <h3 onClick={() => setmanukonssa("3")}>  <GiDna1 style={{ width: '30px', height: '30px' }} />DNAMap      </h3> */}
                    {manukonssa === "3" && <>     <ul>
                        <li onClick={() => navigate("/dashboard/dna/kit")}><FaKitMedical style={{ width: '20px', height: '20px' }} />Kit </li>
                        {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <li onClick={() => navigate("/dashboard/dna/practitioner")}><HiUserGroup style={{ width: '20px', height: '20px' }} />Practitioners </li></>}
                        <li onClick={() => navigate("/dashboard/dna/report")}><HiOutlineDocumentReport style={{ width: '20px', height: '20px' }} />Reports </li>
                    </ul>
                    </>}


                    {/* <h3 onClick={() => setmanukonssa("4")}>  <FaMicroscope style={{ width: '30px', height: '30px' }} />Parasitology Test      </h3> */}
                    {manukonssa === "4" && <>     <ul>
                        <li onClick={() => navigate("/dashboard/Parasitology/kit")}><FaKitMedical style={{ width: '20px', height: '20px' }} />Kit </li>
                        {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <li onClick={() => navigate("/dashboard/Parasitology/practitioner")}><HiUserGroup style={{ width: '20px', height: '20px' }} />Practitioners </li></>}
                        <li onClick={() => navigate("/dashboard/Parasitology/report")}><HiOutlineDocumentReport style={{ width: '20px', height: '20px' }} />Reports </li>
                    </ul>
                    </>}



                    {/* <h3 onClick={() => navigate("/dashboard/kit")}><MdMedicalInformation style={{ width: '30px', height: '30px' }} />All Kits</h3> */}
                    {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <h3 onClick={() => navigate("/dashboard/analysis")}><MdOutlineAnalytics style={{ width: '30px', height: '30px' }} />Kits Analysis</h3></>} */}


                    {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <h3 onClick={() => navigate("/dashboard/practitioner")}><HiOutlineUsers style={{ width: '30px', height: '30px' }} />All Practitioners</h3></>} */}
                    {/* <h3 onClick={() => navigate("/dashboard/practitionerstates")}><MdOutlineQueryStats style={{ width: '30px', height: '30px' }} />Practitioners States</h3> */}

                    {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <h3 onClick={() => navigate("/dashboard/orders")}><CgReorder style={{ width: '30px', height: '30px' }} />Orders information</h3></>} */}

                    {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>    <h3 onClick={() => navigate("/dashboard/shippingdata")}><FaShippingFast style={{ width: '30px', height: '30px' }} />Shipping</h3></>} */}


                    {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>    <h3 onClick={() => navigate("/dashboard/eventinfogdata")}><BsCalendar2EventFill style={{ width: '30px', height: '30px' }} />Event Info</h3></>} */}

                    {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>    <h3 onClick={() => navigate("/dashboard/webinar")}><MdOutlineWeb style={{ width: '30px', height: '30px' }} />Webinar</h3></>} */}


                    {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
                        <h3 onClick={() => setmanukonssa("5")}>  <BiHelpCircle style={{ width: '30px', height: '30px' }} />Help Center      </h3>
                        {manukonssa === "5" && <>     <ul>
                            <li onClick={() => navigate("/dashboard/tickets")}><IoTicketSharp style={{ width: '20px', height: '20px' }} />Help Center Tickets </li>

                            <li onClick={() => navigate("/dashboard/helpcenter")}><FaClipboardQuestion style={{ width: '20px', height: '20px' }} />Help Center FAQs </li>
                        </ul>
                        </>}
                    </>} */}
                    <h3 onClick={() => navigate("/dashboard/profile")}><CgProfile style={{ width: '30px', height: '30px' }} />Profile</h3>


                    {/* <h5 onClick={() => { navigate("/kitack") }} className='hovar link' style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'left', color: '#4180b7' }} >  Kit Received</h5>
                    <h5 onClick={() => { navigate("/shipping") }} className='hovar link' style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'left', color: '#4180b7' }} >   Shipping Form</h5>
                    <h5 onClick={() => { navigate("/eventinfo") }} className='hovar link' style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'left', color: '#4180b7' }} >   Event Info Form</h5>

                    <h5 onClick={() => { navigate("/bucket") }} className='hovar link' style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'left', color: '#4180b7' }} >   Bucket</h5> */}

                    <h5 onClick={logout} className='hovar' style={{ margin: '0', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', color: '#4180b7' }} > <GiExitDoor style={{ width: '50px', height: '50px' }} />  log Out</h5>


                </div>
            </>
            }

        </>
    )
}

export default Navbar