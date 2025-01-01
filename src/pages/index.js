import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/index.css"
import { message } from 'antd';
import Cookies from 'js-cookie';
// import { loadStripe } from '@stripe/stripe-js';
import { TiArrowBack } from "react-icons/ti";


function Index() {

    const loginemail = Cookies.get("email")
    const loginname = Cookies.get("Name")
    const id = Cookies.get("id")
    const token = Cookies.get("Token")



    let navigate = useNavigate();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [forgetpassword, setforgetpassword] = useState("1")
    const [forgetpasswordemail, setforgetpasswordemail] = useState("")
    const [forgetpasswordotp, setforgetpasswordotp] = useState("")
    const [forgetpasswordnewpassword, setforgetpasswordnewpassword] = useState("")

    // const addcard = async (item) => {

    //     const hide = message.loading("Action in progress", 0)
    //     // console.log(item)
    //     const stripe = await loadStripe("pk_live_51MsenqJSzdsymN5jGOTIP3q4qBmD4PDra9chWFQYDC6RCchx2jLlIgdDRrUnhI24QhZeNeAqEo9tc6l3oiR4SWc3000yjqG8qW");

    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    //     var urlencoded = new URLSearchParams();
    //     urlencoded.append("CID", item[0].customerId);
    //     urlencoded.append("PID", item[0].Id);

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: urlencoded,
    //         redirect: 'follow'
    //     };
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/addcar-session`, requestOptions);

    //     const session = await response.json();

    //     const result = stripe.redirectToCheckout({
    //         sessionId: session.id
    //     });

    //     if (result.error) {
    //         console.log(result.error);
    //     }
    //     await setTimeout(() => {
    //         hide(); // Call hide to stop the loading message
    //         message.success("Action completed successfully");
    //     }, 2000);

    // }

    const formsub = async (e) => {

        e.preventDefault();

        const hide = message.loading("Action in progress", 0)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        // console.log(process.env.REACT_APP_API_URL);
        fetch(`${process.env.REACT_APP_API_URL}/login`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result === "user not found") {
                    message.error("Please enter a correct Email Address or Password")
                } else if (result === "Password is incorrect.") {
                    message.error("Please enter a Email Address correct Password")
                } else if (result === "Account is disable by Admin") {
                    message.error("Account is disable by Admin")


                } else {
                    if (result.admin === true) {
                        message.success("logged in")
                        Cookies.set('email', result.email, { expires: 7 }); // Expires in 7 days
                        Cookies.set('id', result._id, { expires: 7 }); // Expires in 7 days
                        Cookies.set('Name', result.name, { expires: 7 }); // Expires in 7 days
                        Cookies.set('Token', "dskgfsdgfkgsdfkjg35464154845674987dsf@53", { expires: 7 }); // Expires in 7 days
                        navigate("/dashboard")
                    } else {

                        // if (!result.CardID) {
                            Cookies.set('email', result.email, { expires: 7 }); // Expires in 7 days
                            Cookies.set('id', result._id, { expires: 7 }); // Expires in 7 days
                            Cookies.set('Name', result.name, { expires: 7 }); // Expires in 7 days
                            Cookies.set('Token', "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg", { expires: 7 }); // Expires in 7 days
                            navigate("/dashboard")
                        // } else {
                        //     const info = [{ Id: result._id, customerId: result.customerID }]
                        //     // addcard(info)
                        // }




                    }
                }



            })
            .catch(error => console.log('error', error));
        await setTimeout(() => {
            hide(); // Call hide to stop the loading message
            message.success("Action completed successfully");
        }, 2000);
    }


    const formsubsentotp = async (e) => {

        e.preventDefault();

        const hide = message.loading("Action in progress", 0)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", forgetpasswordemail);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_API_URL}/sentotp`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === "user not found") {
                    message.error("Please enter a correct Email Address")
                } else if (result === "user deactivated") {

                    message.error("Account is Disable by Admin")
                }

                else {
                    message.success("OTP has been sent")
                    setforgetpassword("3")
                }



            })
            .catch(error => console.log('error', error));
        await setTimeout(() => {
            hide(); // Call hide to stop the loading message
            message.success("Action completed successfully");
        }, 2000);
    }


    const formsubsentsetpass = async (e) => {

        e.preventDefault();
        const hide = message.loading("Action in progress", 0)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", forgetpasswordemail);
        urlencoded.append("otp", forgetpasswordotp);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_API_URL}/setnewpassword`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === "otp match") {
                    message.success("OTP Match")
                    setforgetpassword("4")
                } else {
                    message.error("Please enter the correct OTP")


                }



            })
            .catch(error => console.log('error', error));
        await setTimeout(() => {
            hide(); // Call hide to stop the loading message
            message.success("Action completed successfully");
        }, 2000);
    }

    const formsubsentsetpass2 = async (e) => {

        e.preventDefault();
        const hide = message.loading("Action in progress", 0)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", forgetpasswordemail);
        urlencoded.append("password", forgetpasswordnewpassword);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_API_URL}/setnewpassword2`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === "password changed please login ") {
                    message.success("password changed please login")
                    setforgetpassword("1")
                } else {
                    message.error("something wrong please try again later")


                }



            })
            .catch(error => console.log('error', error));
        await setTimeout(() => {
            hide(); // Call hide to stop the loading message
            message.success("Action completed successfully");
        }, 2000);
    }


    useEffect(() => {
        if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" || token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {
            navigate("/dashboard")
        }
    }, [])




    return (<>


        <div className='mainindex' style={{color:"#de0000"}}>

            <div className='loginbox'>


                <div className='logoinbox'>
                    <img alt='' src="/logo192.png" width={"100%"} />

                </div>
                {forgetpassword === "1" && <>
                    <form onSubmit={formsub}>
                        <h5 style={{ margin: '10px', color: '#4180b7 ' }}>Welcome to practitioner login page</h5>
                        <input value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' required type='email' name='email' />
                        <input value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' required type='password' name='password' />

                        <button  >Login</button>

                        <h5 className='hovar' style={{ margin: '10px', color: '#4180b7 ' }} onClick={() => setforgetpassword("2")}>Forgot your password?</h5>
                    </form>

                </>}
                {forgetpassword === "2" && <>
                    <form onSubmit={formsubsentotp}>
                        <h5 style={{ margin: '10px', color: '#4180b7 ' }}>Please Enter the email to sent OTP</h5>
                        <div onClick={() => setforgetpassword("1")} className='hovar' style={{ display: 'flex', alignItems: 'center', width: "100%", justifyContent: 'flex-start', color: "#6E4E9F" }}><TiArrowBack />Back</div>
                        <input value={forgetpasswordemail} onChange={(e) => setforgetpasswordemail(e.target.value)} placeholder='Email' required type='email' name='email' />

                        <button  >Sent OTP</button>


                    </form>
                </>}

                {forgetpassword === "3" && <>
                    <form onSubmit={formsubsentsetpass}>
                        <h5 style={{ margin: '10px', color: '#4180b7 ' }}>Enter The OTP</h5>
                        <div onClick={() => setforgetpassword("2")} className='hovar' style={{ display: 'flex', alignItems: 'center', width: "100%", justifyContent: 'flex-start', color: "#6E4E9F" }}><TiArrowBack />Back</div>

                        <input value={forgetpasswordotp} onChange={(e) => setforgetpasswordotp(e.target.value)} placeholder='Please enter the OTP' required type='text' name='otp' />

                        <button  >Submit</button>


                    </form>
                </>}




                {forgetpassword === "4" && <>
                    <form onSubmit={formsubsentsetpass2}>
                        <h5 style={{ margin: '10px', color: '#4180b7 ' }}>Enter The New Password</h5>
                        <div onClick={() => setforgetpassword("3")} className='hovar' style={{ display: 'flex', alignItems: 'center', width: "100%", justifyContent: 'flex-start', color: "#6E4E9F" }}><TiArrowBack />Back</div>

                        <input value={forgetpasswordnewpassword} onChange={(e) => setforgetpasswordnewpassword(e.target.value)} placeholder='new Password' required type='password' name='password' />
                        <input pattern={forgetpasswordnewpassword} title='Please match the password' placeholder='Confirm Password' required type='password' name='password' />

                        <button  >Submit</button>


                    </form>
                </>}

            </div>


        </div>
    </>)
}

export default Index