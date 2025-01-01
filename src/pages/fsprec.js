// import React, { useState, useEffect } from 'react'
// import Navbar from '../components/navbar';
// import Sidemanu from '../components/sidemanu';
// import "../css/Practitioner.css"
// import { HiUserAdd } from "react-icons/hi"
// import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai"
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { message, AutoComplete, Image } from 'antd';
// import { FaDotCircle } from "react-icons/fa";
// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import { FaRegCircleXmark } from 'react-icons/fa6';
// import { ImUpload2 } from 'react-icons/im'
// import { v4 } from 'uuid';
// import { imageDb } from "../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// function Fsprec() {
//   var sno1 = 1
//   var sno2 = 1
//   var sno3 = 1
//   var sno4 = 1

//   const loginemail = Cookies.get("email")
//   const loginname = Cookies.get("Name")
//   const id = Cookies.get("id")
//   const token = Cookies.get("Token")
//   const [popupdetails2, setpopupdetails2] = useState(false)
//   const [img, setimg] = useState("/avatar.png")
//   const [img2, setimg2] = useState("/avatar.png")
//   const [img3, setimg3] = useState("/avatar.png")
//   const Navigate = useNavigate();
//   const [popup, setpopup] = useState(false)
//   const [popupdetails, setpopupdetails] = useState(false)
//   const [popupedit, setpopupedit] = useState(false)
//   const [popup2, setpopup2] = useState(false)
//   const [popup22, setpopup22] = useState(false)
//   const [practitionername, setpractitionername] = useState("")
//   const [practitioneremail, setpractitioneremail] = useState("")
//   const [idtochangepass, setidtochangepass] = useState("")
//   const [practitionerpassword, setpractitionerpassword] = useState("")
//   const [practitionercard, setpractitionercard] = useState(false)
//   const [kit, setkit] = useState([])
//   const [practitioner, setpractitioner] = useState([])
//   const [editpassword, seteditpassword] = useState("")





//   const addnewPractitioner = async (e) => {
//     e.preventDefault()

//     const hide = message.loading("Action in progress", 0)


//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var urlencoded = new URLSearchParams();
//     urlencoded.append("name", practitionername);
//     urlencoded.append("email", practitioneremail);
//     urlencoded.append("password", practitionerpassword);
//     urlencoded.append("card", practitionercard);


//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow'
//     };

//     fetch(`${process.env.REACT_APP_API_URL}/addpractitioner`, requestOptions)
//       .then(response => response.json())
//       .then(result => {

//         if (result === 'user found') {
//           alert("Practitioner Already in List")
//         } else {

//           setpractitioner(result)
//           setpopup(false)
//           setpractitioneremail('')
//           setpractitionername('')
//           setpractitionerpassword('')
//         }

//       }


//       )
//       .catch(error => console.log('error', error));

//     await setTimeout(() => {
//       hide(); // Call hide to stop the loading message
//       message.success("Action completed successfully");
//     }, 2000);
//   }




//   useEffect(() => {

//     if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



//       var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,

//         redirect: 'follow'
//       };

//       fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
//         .then(response => response.json())
//         .then(result => setpractitioner(result))


//       var myHeaders2 = new Headers();
//       myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");



//       var requestOptions2 = {
//         method: 'GET',
//         headers: myHeaders2,

//         redirect: 'follow'
//       };

//       fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
//         .then(response => response.json())
//         .then(result => setkit(result))





//     }


//   }, [])




//   var count = 0

//   const [searchTerm, setSearchTerm] = useState('');
//   var options = [];

//   const dooption = () => {
//     practitioner.map((value, index) => {

//       // options = [
//       //   { value: 'Burns Bay Road' },

//       // ];
//       // const newvalue = toString(value.kitid)
//       options.push({ value: value.name })
//       options.push({ value: value.email })


//     })


//   }



//   const handleInputChange = (e) => {
//     e.preventDefault()






//     const intttt = (searchTerm)

//     // Filter the Kit array based on the user's input
//     const filteredSuggestions = practitioner.filter((item) =>

//       item.name.toLowerCase().includes(intttt.toLowerCase()) || item.email.toLowerCase().includes(intttt.toLowerCase())



//     );


//     setpractitioner(filteredSuggestions)
//     setsearchdone(true)

//   };




//   const [searchdone, setsearchdone] = useState(false)

//   const clearsearch = async () => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     const hide = message.loading("Action in progress", 0)

//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,

//       redirect: 'follow'
//     };

//     fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
//       .then(response => response.json())
//       .then(result => setpractitioner(result))


//     var myHeaders2 = new Headers();
//     myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");



//     var requestOptions2 = {
//       method: 'GET',
//       headers: myHeaders2,

//       redirect: 'follow'
//     };

//     fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
//       .then(response => response.json())
//       .then(result => setkit(result))


//     setsearchdone(false)
//     await setTimeout(() => {
//       hide(); // Call hide to stop the loading message
//       message.success("Action completed successfully");
//     }, 2000);
//   }





//   const [userinfo, setuserinfo] = useState([])



//   const changecard = async () => {


//     const isSure = window.confirm("Are you certain you want to proceed? Initiating a card change will erase your existing card details, necessitating a subsequent login to securely add a new card.");
//     if (isSure) {


//       const hide = message.loading("Action in progress", 0)


//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//       var urlencoded = new URLSearchParams();
//       urlencoded.append("id", userinfo._id);

//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: urlencoded,
//         redirect: 'follow'
//       };

//       fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfochnagecard`, requestOptions)
//         .then(response => response.text())
//         .then(result => {
//           if (result === "cardremoved") {
//             const allCookies = Cookies.get();
//             for (const cookieName in allCookies) {
//               Cookies.remove(cookieName);
//             }
//             // navigate('/')
//           } else { message.error("Something wrong") }
//         })
//         .catch(error => console.log('error', error));





//       await setTimeout(() => {
//         hide(); // Call hide to stop the loading message
//         message.success("Action completed successfully");
//       }, 2000);



//     }

//   }




//   // var coutppp = 0




//   // var padingres = 0

//   // const cout = () => {

//   //   coutppp = kit.filter(item => 'result' in item && item.result.length !== 0).length;
//   //   padingres = kit.length - coutppp;
//   // }


//   const [editname, seteditname] = useState("")
//   const [editemail, seteditemail] = useState("")
//   const [editaddres, seteditaddres] = useState("")
//   const [editphone, seteditphone] = useState("")
//   const [editabout, seteditabout] = useState("")
//   const [billingpostcode, setbillingpostcode] = useState("")



//   const subminupdatedata = async (e) => {
//     // e.preventDefault()
//     const hide = message.loading("Action in progress", 0)

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var urlencoded = new URLSearchParams();
//     urlencoded.append("_id", userinfo._id);
//     urlencoded.append("password", "admin");
//     urlencoded.append("billingpostcode", billingpostcode);
//     urlencoded.append("address", editaddres);
//     urlencoded.append("phone", editphone);
//     urlencoded.append("about", editabout);
//     urlencoded.append("email", editemail);
//     urlencoded.append("name", editname);

//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow'
//     };

//     await fetch(`${process.env.REACT_APP_API_URL}/profileedit`, requestOptions)
//       .then(response => response.json())
//       .then(result => {



//         setpopupedit(false)


//       })
//       .catch(error => console.log('error', error));





//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



//     var requestOptions22 = {
//       method: 'GET',
//       headers: myHeaders,

//       redirect: 'follow'
//     };

//     await fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions22)
//       .then(response => response.json())
//       .then(result => setpractitioner(result))


//     var myHeaders2 = new Headers();
//     myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");



//     var requestOptions2 = {
//       method: 'GET',
//       headers: myHeaders2,

//       redirect: 'follow'
//     };

//     await fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
//       .then(response => response.json())
//       .then(result => setkit(result))



//     await setTimeout(() => {
//       hide(); // Call hide to stop the loading message
//       message.success("Action completed successfully");
//     }, 2000);


//   }



//   const counttttkit = (type) => {
//     var whatsreturn = "0"
//     var total = 0

//     kit.map((value) => {

//       if (type === value.Kittype && userinfo._id === value.assignedto) {
//         total = total + 1
//       }


//     })



//     if (type === "100") {
//       whatsreturn = "fs 100(" + total + ")"
//     } else
//       if (type === "210") {
//         whatsreturn = "fs 210(" + total + ")"
//       } else {
//         whatsreturn = total
//       }
//     return (
//       whatsreturn
//     )
//   }



//   const Conuttttttt2 = () => {
//     var whatreturn = "0"

//     var total2 = 0



//     kit.map((value) => {

//       if ((value.result.length === 0 || value.result2.length === 0) && userinfo._id === value.assignedto && (value.Kittype === "100" || value.Kittype === "210")) {
//         total2 = total2 + 1
//       }
//       if ((value.otherresults === "nil") && userinfo._id === value.assignedto && (value.Kittype !== "100" && value.Kittype !== "210")) {
//         total2 = total2 + 1
//       }


//     })
//     whatreturn = total2




//     return whatreturn

//   }
//   const Conuttttttt = () => {
//     var whatreturn = "0"
//     var total = 0




//     kit.map((value) => {

//       if ((value.result || value.result2 || value.otherresults !== "nil") && userinfo._id === value.assignedto) {
//         total = total + 1
//       }


//     })
//     whatreturn = total



//     return whatreturn

//   }



//   const handleImgChange = (e) => {
//     setimg(URL.createObjectURL(e.target.files[0]));
//     setimg2(e.target.files[0])
//   };

//   const updateimage = async (e) => {
//     e.preventDefault()
//     const hide = message.loading("Action in progress", 0)
//     const Carimageid = v4();

//     const imgRef = ref(imageDb, `profile/${Carimageid}`)
//     await uploadBytes(imgRef, img2)
//     const cvUrl = await getDownloadURL(imgRef);

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var urlencoded2 = new URLSearchParams();
//     urlencoded2.append("profilepic", cvUrl);
//     urlencoded2.append("_id", userinfo._id);

//     var requestOptions2 = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded2,
//       redirect: 'follow'
//     };


//     await fetch(`${process.env.REACT_APP_API_URL}/updateimage`, requestOptions2)
//       .then(response => response.json())
//       .then(result => setpractitioner(result))
//       .catch(error => console.log('error', error));
//     setpopupdetails2(false)

//     await setTimeout(() => {
//       hide(); // Call hide to stop the loading message
//       message.success("Action completed successfully");
//     }, 2000);

//   }


//   return (<>
//     {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
//       <Navbar />
//       <div className='deshboardmain'>
//         <Sidemanu />
//         <div className='Practitionermainbody'>


//           <div className='header'>
//             <h1 className='pppheading'> Food Sensitivity Practitioners</h1>
//             {dooption()}

//             {searchdone === false && <>
//               <form onSubmit={handleInputChange}>
//                 <AutoComplete
//                   type="number"
//                   style={{ width: 200 }}
//                   options={options}
//                   placeholder="Search by Email/Name"
//                   filterOption={(inputValue, options) =>
//                     options.value.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//                     //  console.log(kitss) 
//                   }
//                   onChange={(inputValue) => setSearchTerm(inputValue)}
//                 />
//                 <button>Search</button>
//               </form>

//             </>}
//             {searchdone === true && <>     <div className='clearsearch'  ><h3>search: {searchTerm}</h3> <button onClick={clearsearch}><AiOutlineClose /> Clear</button>  </div>
//             </>}
//           </div>





//           <div className='addbutton'></div>


//           {popup === true && <>
//             <div onClick={() => {
//               setpopup(false)
//               setpractitioneremail('')
//               setpractitionername('')
//               setpractitionerpassword('')

//             }
//             } className='popupbg'></div>
//             <div className='popup'>

//               <form onSubmit={addnewPractitioner} className='addPractitioner'>
//                 <input autoComplete="none" style={{ borderRadius: '5px' }} type='name' value={practitionername} onChange={(e) => setpractitionername(e.target.value)} required placeholder='Practitioner Name' />
//                 <input autoComplete="none" style={{ borderRadius: '5px' }} onChange={(e) => setpractitioneremail(e.target.value)} type="email" name='new' value={practitioneremail} required placeholder='Practitioner Email' />
//                 <input autoComplete="none" style={{ borderRadius: '5px' }} onChange={(e) => setpractitionerpassword(e.target.value)} type="password" name='nedfvw' value={practitionerpassword} required placeholder='Password for Practitioner' />

//                 {/* <div style={{ width: '85%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '20px' }}> <input style={{ width: '30px', marginLeft: '10px', height: '30px' }} type="checkbox" onChange={(e) => { setpractitionercard(e.target.checked) }} /> <lebal>Do not Ask for Card information</lebal></div> */}

//                 <div className='bownpopupbutton' style={{ width: '85%' }}>

//                   <button onClick={() => {
//                     setpopup(false)
//                     setpractitioneremail('')
//                     setpractitionername('')
//                     setpractitionerpassword('')
//                   }
//                   } style={{ border: '1px solid red', color: 'black', backgroundColor: '#fff' }} >cancel</button>
//                   <button style={{ backgroundColor: '#4180b7' }}>Add Practitioner</button>

//                 </div>

//               </form>




//             </div>
//           </>}




//           {popupdetails === true && <>
//             <div onClick={() => {
//               setpopupdetails(false)


//             }
//             } className='popupbg'></div>
//             <div className='popup' style={{ height: '600px !important' }}>












//               <div className='profilemainbody' style={{ width: '95%' }}>







//                 <div className='addbutton' style={{ width: '100%' }}>






//                   <button onClick={() => {
//                     setpopupdetails(false)
//                     setpopupedit(true)
//                   }}><AiFillEdit style={{ width: '20px', height: '20px' }} />Edit Profile </button>
//                 </div>






//                 <div className='uperprofile'>

//                   <div className='profilepicture'>
//                     <Image alt='avatar' src={img3} width={"300px"} />
//                     <div> <button className='button' onClick={() => {
//                       setpopupdetails2(true)
//                       setpopupdetails(false)

//                     }}><AiFillEdit style={{ width: '20px', height: '20px' }} />Change Profile Picture</button></div>

//                   </div>
//                   <div className='profileabot'>

//                     <div ><h3 style={{ width: '200px' }}>Name : </h3> <p style={{ margin: '0' }}> {userinfo.name ? (<>{userinfo.name}</>) : (<a href='#' onClick={(e) => {
//                       e.preventDefault()
//                       setpopupdetails(false)
//                       setpopupedit(true)
//                     }}>Click to edit</a>)}</p></div>
//                     <div ><h3 style={{ width: '200px' }}>Email : </h3> <p style={{ margin: '0' }}> {userinfo.email ? (<>{userinfo.email}</>) : (<a onClick={(e) => {
//                       e.preventDefault()
//                       setpopupdetails(false)
//                       setpopupedit(true)
//                     }} href='#'>Click to edit</a>)}</p></div>
//                     <div ><h3 style={{ width: '200px' }}>phone : </h3> <p style={{ margin: '0' }}> {userinfo.phone ? (<>{userinfo.phone}</>) : (<a onClick={(e) => {
//                       e.preventDefault()
//                       setpopupdetails(false)
//                       setpopupedit(true)
//                     }} href='#'>Click to edit</a>)}</p></div>
//                     <div ><h3 style={{ width: '200px' }}>address : </h3> <p style={{ margin: '0' }}> {userinfo.address ? (<>{userinfo.address}</>) : (<a onClick={(e) => {
//                       e.preventDefault()
//                       setpopupdetails(false)
//                       setpopupedit(true)
//                     }} href='#'>Click to edit</a>)}</p></div>
//                     <div ><h3 style={{ width: '200px' }}>billing post code : </h3> <p style={{ margin: '0' }}> {userinfo.billingpostcode ? (<>{userinfo.billingpostcode}</>) : (<a onClick={(e) => {
//                       e.preventDefault()
//                       setpopupdetails(false)
//                       setpopupedit(true)
//                     }} href='#'>Click to edit</a>)}</p></div>
//                     <div ><h3 style={{ width: '200px' }}>Registered On :   </h3> <p style={{ margin: '0' }}> {userinfo.timestamp ? (<>{userinfo.timestamp}</>) : (<a href='#'>Click to edit</a>)}</p></div>

//                     <div ><h3 style={{ width: '200px' }}>Action   </h3>
//                       <a onClick={(e) => {
//                         e.preventDefault()
//                         setpopup22(true)
//                         setidtochangepass(userinfo._id)
//                         // setpopup3(true)
//                         setpopupdetails(false)
//                       }} href='/' style={{ display: 'flex', marginRight: '10px', alignItems: "center", color: 'red' }}> <AiFillEdit style={{ width: '20px', height: '20px' }} />change password</a>
//                     </div>




//                     <div style={{ width: '100%', margin: '30px 0' }}>
//                       <h2>About Me</h2>
//                       <p style={{ width: '100%', margin: '0' }}>{userinfo.about ? (<>{userinfo.about}</>) : (<a href='#'>Click to edit</a>)}</p>
//                     </div>




//                     {userinfo.CardID === "nocardneeded" ? (<> <button className='addbutton button' onClick={changecard}>Consignment (Click to add Card)</button>
//                     </>) : (<>
//                       {userinfo.CardID ? (<>
//                         <button className='addbutton button' onClick={changecard}>Change payment Card</button>
//                       </>) : (<>
//                         <button className='addbutton button' disabled>The card has not been added yet.</button>

//                       </>)}
//                     </>)}

//                   </div>

//                 </div>


//                 <div className='profileinfo'>

//                   <div className='infoboxinside'>
//                     {userinfo.assignedkits !== undefined && <>      <h2>{userinfo.assignedkits.length}</h2></>}
//                     {userinfo.assignedkits === undefined && <>      <h2>0</h2></>}
//                     <p style={{ margin: '0' }}>KIts</p>
//                   </div>

//                   <div className='infoboxinside'>
//                     {/* {userinfo.assignedkits !== undefined && <>      <h2>{coutppp}</h2></>} */}
//                     <h2 style={{ margin: '0' }}>{Conuttttttt()}</h2>
//                     <p style={{ margin: '0' }}>Total Patients</p>
//                   </div>


//                   <div className='infoboxinside'>
//                     {/* {userinfo.assignedkits !== undefined && <>      <h2>{padingres}</h2></>} */}
//                     <h2>{Conuttttttt2()}</h2>
//                     <p style={{ margin: '0' }}>Pending results
//                     </p>
//                   </div>





//                 </div>

//                 <table className='tablep' style={{ width: '90%' }}>
//                   <thead className='tablephead' >
//                     <tr>
//                       <th>Food Sensitivity Kits</th>

//                       <th>Microbiome Kits</th>
//                       <th>DNAMap Kits</th>
//                       <th>Parasitology Test</th>

//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td> {userinfo.fstype ? (<><IoIosCheckmarkCircleOutline style={{ width: '30px', height: '30px', color: 'green' }} /> </>) : (<><FaRegCircleXmark style={{ width: '30px', height: '30px', color: 'red' }} />  </>)}    </td>
//                       <td> {userinfo.mbtype ? (<><IoIosCheckmarkCircleOutline style={{ width: '30px', height: '30px', color: 'green' }} /> </>) : (<><FaRegCircleXmark style={{ width: '30px', height: '30px', color: 'red' }} />  </>)}    </td>
//                       <td> {userinfo.dmtype ? (<><IoIosCheckmarkCircleOutline style={{ width: '30px', height: '30px', color: 'green' }} /> </>) : (<><FaRegCircleXmark style={{ width: '30px', height: '30px', color: 'red' }} />  </>)}    </td>
//                       <td> {userinfo.pttype ? (<><IoIosCheckmarkCircleOutline style={{ width: '30px', height: '30px', color: 'green' }} /> </>) : (<><FaRegCircleXmark style={{ width: '30px', height: '30px', color: 'red' }} />  </>)}    </td>

//                     </tr>

//                     <tr>
//                       <td><h4>{counttttkit("100")}  {counttttkit("210")} </h4></td>
//                       <td><h4>Viewable on Microbiome Portal.</h4></td>
//                       <td><h4>{counttttkit("dm")} </h4></td>
//                       <td><h4>{counttttkit("pt")} </h4></td>
//                     </tr>
//                   </tbody>
//                 </table>



//                 <div style={{ display: 'flex', justifyContent: 'flex-end', width: '92%', marginTop: '30px' }}>   <a onClick={async (e) => {
//                   e.preventDefault()


//                   const hide = message.loading("Action in progress", 0)
//                   var myHeaders = new Headers();
//                   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                   var urlencoded = new URLSearchParams();
//                   urlencoded.append("_id", userinfo._id);

//                   var requestOptions = {
//                     method: 'POST',
//                     headers: myHeaders,
//                     body: urlencoded,
//                     redirect: 'follow'
//                   };

//                   await fetch(`${process.env.REACT_APP_API_URL}/dltpractitioner`, requestOptions)
//                     .then(response => response.json())
//                     .then(result => {
//                       setpopupdetails(false)
//                       setpractitioner(result)
//                     })
//                     .catch(error => console.log('error', error));


//                   await setTimeout(() => {
//                     hide(); // Call hide to stop the loading message
//                     message.success("Action completed successfully");
//                   }, 2000);
//                   setpopupdetails(false)
//                 }} href='/' style={{ display: 'flex', marginRight: '10px', alignItems: "center", color: 'red' }}> <AiFillDelete style={{ width: '20px', height: '20px' }} />Remove this Practitioner</a>

//                 </div>






//               </div>























//             </div>
//           </>}



//           {popupdetails2 === true && <>
//             <div onClick={() => {
//               setpopupdetails2(false)


//             }
//             } className='popupbg'></div>
//             <div className='popup' style={{ height: '600px !important' }}>

//               <div>

//                 <Image src={img} alt='' width={"30%"} />
//               </div>

//               <form onSubmit={updateimage}>
//                 <input
//                   type='file'
//                   onChange={handleImgChange}
//                   accept='image/*'
//                 />
//                 <button>Update</button>
//               </form>



//             </div>
//           </>}



//           {popupedit === true && <>
//             <div onClick={() => {
//               setpopupdetails(false)
//               setpopupedit(false)


//             }
//             } className='popupbg'></div>
//             <div className='popup'>









//               <div className='bownpopupbutton'>






//                 <form onSubmit={(e) => {
//                   e.preventDefault()
//                   setpopup2(true)
//                   subminupdatedata()
//                 }} className='profileeditingform'>

//                   <h3>Edit Profile</h3>
//                   <div className='editprofileinputs'>
//                     <label>Name :<input required value={editname} onChange={(e) => seteditname(e.target.value)} /></label>
//                     <label>Email :<input required value={editemail} onChange={(e) => seteditemail(e.target.value)} /></label>
//                     <label>Address :<input required value={editaddres} onChange={(e) => seteditaddres(e.target.value)} /></label>
//                     <label>Phone :<input required value={editphone} onChange={(e) => seteditphone(e.target.value)} /></label>
//                     <label>billing post code :<input required value={billingpostcode} onChange={(e) => setbillingpostcode(e.target.value)} style={{ width: '70%' }} /></label>

//                     <label style={{ alignItems: 'baseline' }}>About :<textarea required onChange={(e) => seteditabout(e.target.value)} value={editabout} /></label>
//                   </div>


//                   <div className='buttonnnnn'>

//                     <button onClick={() => {
//                       setpopupedit(false)


//                     }
//                     } style={{ border: '1px solid red', color: 'black' }} >cancel</button>







//                     <button style={{ backgroundColor: '#4180b7' }}>Update</button>
//                   </div>

//                 </form>








//               </div>

//             </div>
//           </>}









//           {practitioner.length !== 0 && <>
//             <table className='tablep'>
//               <thead className='tablephead'>
//                 <tr>
//                   <th>Account Status</th>

//                   <th>S NO.</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Assigned Kits</th>


//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>






//                 {popup22 === true && <>
//                   <div onClick={() => {
//                     setpopup22(false)
//                     count = 0

//                   }
//                   } className='popupbg2'></div>
//                   <div className='popup'>

//                     <div className='header' >
//                       <h4>Change password of Practitioner</h4>

//                     </div>






//                     <form onSubmit={async (e) => {
//                       e.preventDefault()
//                       const hide = message.loading("Action in progress", 0)
//                       var myHeaders = new Headers();
//                       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                       var urlencoded = new URLSearchParams();
//                       urlencoded.append("_id", idtochangepass);

//                       urlencoded.append("newpassword", editpassword);

//                       var requestOptions = {
//                         method: 'POST',
//                         headers: myHeaders,
//                         body: urlencoded,
//                         redirect: 'follow'
//                       };

//                       fetch(`${process.env.REACT_APP_API_URL}/profileeditpassword2`, requestOptions)
//                         .then(response => response.json())
//                         .then(result => {
//                           if (result === "Password has been changed") {

//                             message.success("Password has been changed")
//                             setpopup22(false)

//                           }
//                         })
//                         .catch(error => console.log('error', error));






//                       await setTimeout(() => {
//                         hide(); // Call hide to stop the loading message
//                         message.success("Action completed successfully");
//                       }, 2000);




//                     }} className='profileeditingform'>

//                       <h3>Edit Profile</h3>
//                       <div className='editprofileinputs' style={{ gap: '10px' }}>
//                         <label>New Password :<input required type='password' value={editpassword} onChange={(e) => seteditpassword(e.target.value)} style={{ width: '70%' }} /></label>
//                         <label>Confirm Password :<input required type='password' title='Password does not Match' pattern={editpassword} style={{ width: '70%' }} /></label>

//                       </div>


//                       <div className='buttonnnnn'>

//                         <button onClick={() => {

//                           setpopup22(false)


//                         }
//                         } style={{ border: '1px solid red', color: 'black' }} >cancel</button>







//                         <button style={{ backgroundColor: '#4180b7' }}>Update</button>
//                       </div>

//                     </form>




//                   </div>
//                 </>}











//                 {practitioner.map((item, index) => (<>


//                   {popup2 === index && <>
//                     <div onClick={() => {
//                       setpopup2(false)
//                       count = 0

//                     }
//                     } className='popupbg2'></div>
//                     <div className='popup'>

//                       <div className='header' >
//                         <h4>Assigned {item.assignedkits.length} Kits to {item.name}</h4>

//                       </div>




//                       <h4 style={{ marginTop: '30px' }}>Food Sensitivity 210</h4>
//                       <table className='tablep'>
//                         <thead className='tablephead'>
//                           <tr>
//                             <th>S NO.</th>
//                             <th>Kit ID</th>


//                             <th>Result</th>
//                             <th></th>
//                           </tr>
//                         </thead>
//                         <tbody>



//                           {kit.map((item2, index) => {
//                             return (<>

//                               {item2.Kittype === "210" && <>

//                                 <React.Fragment key={index}>
//                                   {item2.assignedto === item._id && (
//                                     <tr>
//                                       <td>{count = count + 1}</td>
//                                       <td>{item2.kitid}</td>

//                                       {item2.result.length !== 0 && <>
//                                         <td><a href={"/dashboard/view-report/" + item2._id} >View</a></td>
//                                       </>}

//                                       {item2.result.length === 0 && <>
//                                         <td>Pending</td>
//                                       </>}

//                                       <td className='assignbuttom' ><AiFillDelete className='hovar' style={{ width: '30px', height: '30px', color: 'red' }}
//                                         onClick={async () => {
//                                           const hide = message.loading("Action in progress", 0)
//                                           var myHeaders = new Headers();
//                                           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                                           var urlencoded = new URLSearchParams();
//                                           urlencoded.append("_id", item._id);

//                                           var requestOptions = {
//                                             method: 'POST',
//                                             headers: myHeaders,
//                                             body: urlencoded,
//                                             redirect: 'follow'
//                                           };

//                                           fetch(`${process.env.REACT_APP_API_URL}/dltkits`, requestOptions)
//                                             .then(response => response.json())
//                                             .then(result => setkit(result))
//                                             .catch(error => console.log('error', error));




//                                           await setTimeout(() => {
//                                             hide(); // Call hide to stop the loading message
//                                             message.success("Action completed successfully");
//                                           }, 2000);


//                                         }}


//                                       /></td>

//                                     </tr>
//                                   )}
//                                 </React.Fragment>
//                               </>}</>);
//                           })}



//                         </tbody>
//                       </table>




//                       <h4 style={{ marginTop: '30px' }}>Food Sensitivity 100</h4>
//                       <table className='tablep'>
//                         <thead className='tablephead'>
//                           <tr>
//                             <th>S NO.</th>
//                             <th>Kit ID</th>


//                             <th>Result</th>
//                             <th></th>
//                           </tr>
//                         </thead>
//                         <tbody>



//                           {kit.map((item2, index) => {
//                             return (<>

//                               {item2.Kittype === "100" && <>

//                                 <React.Fragment key={index}>
//                                   {item2.assignedto === item._id && (
//                                     <tr>
//                                       <td>{count = count + 1}</td>
//                                       <td>{item2.kitid}</td>

//                                       {item2.result.length !== 0 && <>
//                                         <td><a href={"/dashboard/view-report/" + item2._id} >View</a></td>
//                                       </>}

//                                       {item2.result.length === 0 && <>
//                                         <td>Pending</td>
//                                       </>}

//                                       <td className='assignbuttom' ><AiFillDelete className='hovar' style={{ width: '30px', height: '30px', color: 'red' }}
//                                         onClick={async () => {
//                                           const hide = message.loading("Action in progress", 0)
//                                           var myHeaders = new Headers();
//                                           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                                           var urlencoded = new URLSearchParams();
//                                           urlencoded.append("_id", item._id);

//                                           var requestOptions = {
//                                             method: 'POST',
//                                             headers: myHeaders,
//                                             body: urlencoded,
//                                             redirect: 'follow'
//                                           };

//                                           fetch(`${process.env.REACT_APP_API_URL}/dltkits`, requestOptions)
//                                             .then(response => response.json())
//                                             .then(result => setkit(result))
//                                             .catch(error => console.log('error', error));




//                                           await setTimeout(() => {
//                                             hide(); // Call hide to stop the loading message
//                                             message.success("Action completed successfully");
//                                           }, 2000);


//                                         }}


//                                       /></td>

//                                     </tr>
//                                   )}
//                                 </React.Fragment>
//                               </>} </>);
//                           })}



//                         </tbody>
//                       </table>















//                       <div className='bownpopupbutton'>
//                         <button onClick={() => {
//                           setpopup2(false)
//                           count = 0
//                         }
//                         } style={{ border: '1px solid red', color: 'black' }} >Close</button>

//                       </div>

//                     </div>
//                   </>}



























//                   {item.fstype === true && <>

//                     <tr>

//                       {item.status ? (<>  <td className='hovar' onClick={async () => {

//                         const hide = message.loading("Action in progress", 0)
//                         var myHeaders = new Headers();
//                         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                         var urlencoded = new URLSearchParams();
//                         urlencoded.append("id", item._id);

//                         var requestOptions = {
//                           method: 'POST',
//                           headers: myHeaders,
//                           body: urlencoded,
//                           redirect: 'follow'
//                         };

//                         fetch(`${process.env.REACT_APP_API_URL}/deactive`, requestOptions)
//                           .then(response => response.json())
//                           .then(result => setpractitioner(result))
//                           .catch(error => console.log('error', error));

//                         await setTimeout(() => {
//                           hide(); // Call hide to stop the loading message
//                           message.success("Action completed successfully");
//                         }, 2000);

//                       }} style={{ color: "green" }}><FaDotCircle /> Active</td></>) : (<> <td className='hovar' onClick={async () => {

//                         const hide = message.loading("Action in progress", 0)
//                         var myHeaders = new Headers();
//                         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                         var urlencoded = new URLSearchParams();
//                         urlencoded.append("id", item._id);

//                         var requestOptions = {
//                           method: 'POST',
//                           headers: myHeaders,
//                           body: urlencoded,
//                           redirect: 'follow'
//                         };

//                         fetch(`${process.env.REACT_APP_API_URL}/active`, requestOptions)
//                           .then(response => response.json())
//                           .then(result => setpractitioner(result))
//                           .catch(error => console.log('error', error));

//                         await setTimeout(() => {
//                           hide(); // Call hide to stop the loading message
//                           message.success("Action completed successfully");
//                         }, 2000);

//                       }} style={{ color: "red" }}><FaDotCircle /> Inactive</td></>)}


//                       <td>{sno2++}</td>
//                       <td>{item.name} </td>
//                       <td>{item.email}</td>
//                       <td>{item.assignedkits.length}</td>




//                       <td  >
//                         <button className='button' onClick={async () => {
//                           await setpopupdetails(true)
//                           await setuserinfo(item)

//                           await seteditname(item.name)
//                           await seteditemail(item.email)
//                           await seteditaddres(item.address)
//                           await seteditphone(item.phone)
//                           await seteditabout(item.about)
//                           await setbillingpostcode(item.billingpostcode)

//                           if (item.profilepic) { await setimg3(item.profilepic) }
//                           else { await setimg3("/avatar.png") }


//                         }}>Detail</button>
//                       </td>
//                     </tr>

//                   </>}

//                 </>))}







//               </tbody>
//             </table>


//           </>}




//           {practitioner.length === 0 && <>

//             <img alt='' src='/empty.gif' width={"40%"} />
//           </>}





















//         </div>


//       </div>
//     </>} </>)
// }

// export default Fsprec