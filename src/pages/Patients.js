// import React, { useState, useEffect } from "react";
// import Navbar from "../components/navbar";
// import Sidemanu from "../components/sidemanu";
// import "../css/Practitioner.css";
// import { HiUserAdd } from "react-icons/hi";
// import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { message, AutoComplete, Image } from "antd";
// import { FaDotCircle } from "react-icons/fa";
// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import { FaRegCircleXmark } from "react-icons/fa6";
// import { ImUpload2 } from "react-icons/im";
// import { v4 } from "uuid";
// import { imageDb } from "../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// function Patient() {
//   var sno1 = 1;
//   var sno2 = 1;

//   const loginemail = Cookies.get("email");
//   const loginname = Cookies.get("Name");
//   const id = Cookies.get("id");
//   const token = Cookies.get("Token");

//   const Navigate = useNavigate();
//   const [popup, setpopup] = useState(false);
//   const [popupdetails, setpopupdetails] = useState(false);
//   const [popupdetails2, setpopupdetails2] = useState(false);
//   const [popupedit, setpopupedit] = useState(false);
//   const [popup2, setpopup2] = useState(false);
//   const [popup22, setpopup22] = useState(false);
//   const [practitionername, setpractitionername] = useState("");
//   const [practitioneremail, setpractitioneremail] = useState("");
//   const [idtochangepass, setidtochangepass] = useState("");
//   const [practitionerpassword, setpractitionerpassword] = useState("");
//   const [practitionercard, setpractitionercard] = useState(false);
//   const [kit, setkit] = useState([]);
//   const [patient, setPatient] = useState([]);
//   const [editpassword, seteditpassword] = useState("");

//   useEffect(() => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var requestOptions = {
//       method: "GET",
//       headers: myHeaders,

//       redirect: "follow",
//     };

//     fetch(`${process.env.REACT_APP_API_URL}/getallpatients`, requestOptions)
//       .then((response) => response.json())
//       .then((result) => setPatient(result));

//       console.log(patient)
//     var myHeaders2 = new Headers();
//     myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

//     var requestOptions2 = {
//       method: "GET",
//       headers: myHeaders2,

//       redirect: "follow",
//     };

//     fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
//       .then((response) => response.json())
//       .then((result) => setkit(result));
//   }, []);

//   var count = 0;

//   const [searchTerm, setSearchTerm] = useState("");
//   var options = [];

//   const dooption = () => {
//     patient.map((value, index) => {
//       // options = [
//       //   { value: 'Burns Bay Road' },

//       // ];
//       // const newvalue = toString(value.kitid)
//       options.push({ value: value.name });
//       options.push({ value: value.email });
//     });
//   };

//   const handleInputChange = (e) => {
//     e.preventDefault();
//     const intttt = searchTerm;
//     // Filter the Kit array based on the user's input
//     const filteredSuggestions = patient.filter(
//       (item) =>
//         item.name.toLowerCase().includes(intttt.toLowerCase()) ||
//         item.email.toLowerCase().includes(intttt.toLowerCase())
//     );
//     setPatient(filteredSuggestions);
//     setsearchdone(true);
//   };
//   const [searchdone, setsearchdone] = useState(false);

//   const clearsearch = () => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var requestOptions = {
//       method: "GET",
//       headers: myHeaders,

//       redirect: "follow",
//     };

//     fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
//       .then((response) => response.json())
//       .then((result) => setPatient(result));

//     var myHeaders2 = new Headers();
//     myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

//     var requestOptions2 = {
//       method: "GET",
//       headers: myHeaders2,

//       redirect: "follow",
//     };

//     fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
//       .then((response) => response.json())
//       .then((result) => setkit(result));

//     setsearchdone(false);
//   };

//   const [userinfo, setuserinfo] = useState([]);

//   const changecard = () => {
//     const isSure = window.confirm(
//       "Are you certain you want to proceed? Initiating a card change will erase your existing card details, necessitating a subsequent login to securely add a new card."
//     );
//     if (isSure) {
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//       var urlencoded = new URLSearchParams();
//       urlencoded.append("id", userinfo._id);

//       var requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: urlencoded,
//         redirect: "follow",
//       };

//       fetch(
//         `${process.env.REACT_APP_API_URL}/profileKitsinfochnagecard`,
//         requestOptions
//       )
//         .then((response) => response.text())
//         .then((result) => {
//           if (result === "cardremoved") {
//             const allCookies = Cookies.get();
//             for (const cookieName in allCookies) {
//               Cookies.remove(cookieName);
//             }
//             // navigate('/')
//           } else {
//             message.error("Something wrong");
//           }
//         })
//         .catch((error) => console.log("error", error));
//     }
//   };

//   const [editname, seteditname] = useState("");
//   const [editemail, seteditemail] = useState("");
//   const [editaddres, seteditaddres] = useState("");
//   const [editphone, seteditphone] = useState("");
//   const [editabout, seteditabout] = useState("");
//   const [billingpostcode, setbillingpostcode] = useState("");

//   const [img, setimg] = useState("/avatar.png");
//   const [img2, setimg2] = useState("/avatar.png");
//   const [img3, setimg3] = useState("/avatar.png");

//   const subminupdatedata = async (e) => {

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
//       method: "POST",
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: "follow",
//     };

//     await fetch(`${process.env.REACT_APP_API_URL}/profileedit`, requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         setpopupedit(false);
//       })
//       .catch((error) => console.log("error", error));

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var requestOptions22 = {
//       method: "GET",
//       headers: myHeaders,

//       redirect: "follow",
//     };

//     await fetch(
//       `${process.env.REACT_APP_API_URL}/getallpractitioner`,
//       requestOptions22
//     )
//       .then((response) => response.json())
//       .then((result) => setPatient(result));

//     var myHeaders2 = new Headers();
//     myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

//     var requestOptions2 = {
//       method: "GET",
//       headers: myHeaders2,

//       redirect: "follow",
//     };

//     await fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
//       .then((response) => response.json())
//       .then((result) => setkit(result));
//   };

//   const counttttkit = (type) => {
//     var whatsreturn = "0";
//     var total = 0;

//     kit.map((value) => {
//       if (type === value.Kittype && userinfo._id === value.assignedto) {
//         total = total + 1;
//       }
//     });

//     if (type === "100") {
//       whatsreturn = "fs 100(" + total + ")";
//     } else if (type === "210") {
//       whatsreturn = "fs 210(" + total + ")";
//     } else {
//       whatsreturn = total;
//     }
//     return whatsreturn;
//   };

//   const Conuttttttt2 = () => {
//     var whatreturn = "0";

//     var total2 = 0;

//     kit.map((value) => {
//       if (
//         (value.result.length === 0 || value.result2.length === 0) &&
//         userinfo._id === value.assignedto &&
//         (value.Kittype === "100" || value.Kittype === "210")
//       ) {
//         total2 = total2 + 1;
//       }
//       if (
//         value.otherresults === "nil" &&
//         userinfo._id === value.assignedto &&
//         value.Kittype !== "100" &&
//         value.Kittype !== "210"
//       ) {
//         total2 = total2 + 1;
//       }
//     });
//     whatreturn = total2;

//     return whatreturn;
//   };
//   const Conuttttttt = () => {
//     var whatreturn = "0";
//     var total = 0;

//     kit.map((value) => {
//       if (
//         (value.result || value.result2 || value.otherresults !== "nil") &&
//         userinfo._id === value.assignedto
//       ) {
//         total = total + 1;
//       }
//     });
//     whatreturn = total;

//     return whatreturn;
//   };

//   const handleImgChange = (e) => {
//     setimg(URL.createObjectURL(e.target.files[0]));
//     setimg2(e.target.files[0]);
//   };

//   const updateimage = async (e) => {
//     e.preventDefault();

//     const Carimageid = v4();

//     const imgRef = ref(imageDb, `profile/${Carimageid}`);
//     await uploadBytes(imgRef, img2);
//     const cvUrl = await getDownloadURL(imgRef);

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var urlencoded2 = new URLSearchParams();
//     urlencoded2.append("profilepic", cvUrl);
//     urlencoded2.append("_id", userinfo._id);

//     var requestOptions2 = {
//       method: "POST",
//       headers: myHeaders,
//       body: urlencoded2,
//       redirect: "follow",
//     };

//     await fetch(`${process.env.REACT_APP_API_URL}/updateimage`, requestOptions2)
//       .then((response) => response.json())
//       .then((result) => setPatient(result))
//       .catch((error) => console.log("error", error));
//     setpopupdetails2(false);
//   };

//   return (
//     <>
//       {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
//         <>
//           <Navbar />
//           <div className="deshboardmain">
//             <Sidemanu />
//             <div className="Practitionermainbody">
//               <div className="header">
//                 <h1 className="pppheading"> Practitioners</h1>
//                 {dooption()}

//                 {searchdone === false && (
//                   <>
//                     <form onSubmit={handleInputChange}>
//                       <AutoComplete
//                         type="number"
//                         style={{ width: 200 }}
//                         options={options}
//                         placeholder="Search by Email/Name"
//                         filterOption={
//                           (inputValue, options) =>
//                             options.value
//                               .toString()
//                               .toUpperCase()
//                               .indexOf(inputValue.toUpperCase()) !== -1
//                           //  console.log(kitss)
//                         }
//                         onChange={(inputValue) => setSearchTerm(inputValue)}
//                       />
//                       <button>Search</button>
//                     </form>
//                   </>
//                 )}
//                 {searchdone === true && (
//                   <>
//                     {" "}
//                     <div className="clearsearch">
//                       <h3>search: {searchTerm}</h3>{" "}
//                       <button onClick={clearsearch}>
//                         <AiOutlineClose /> Clear
//                       </button>{" "}
//                     </div>
//                   </>
//                 )}
//               </div>

//               <div className="addbutton">
//                 <button onClick={() => setpopup(true)}>
//                   <HiUserAdd style={{ width: "20px", height: "20px" }} />
//                   Add Practitioner
//                 </button>
//               </div>

//               {patient.length !== 0 && (
//                 <>
//                   <table className="tablep">
//                     <thead className="tablephead">
//                       <tr>
//                         <th>Account Status</th>

//                         <th>S NO.</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Assigned Kits</th>

//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {popup22 === true && (
//                         <>
//                           <div
//                             onClick={() => {
//                               setpopup22(false);
//                               count = 0;
//                             }}
//                             className="popupbg2"
//                           ></div>
//                           <div className="popup">
//                             <div className="header">
//                               <h4>Change password of Practitioner</h4>
//                             </div>

//                             <form
//                               onSubmit={(e) => {
//                                 e.preventDefault();

//                                 var myHeaders = new Headers();
//                                 myHeaders.append(
//                                   "Content-Type",
//                                   "application/x-www-form-urlencoded"
//                                 );

//                                 var urlencoded = new URLSearchParams();
//                                 urlencoded.append("_id", idtochangepass);

//                                 urlencoded.append("newpassword", editpassword);

//                                 var requestOptions = {
//                                   method: "POST",
//                                   headers: myHeaders,
//                                   body: urlencoded,
//                                   redirect: "follow",
//                                 };

//                                 fetch(
//                                   `${process.env.REACT_APP_API_URL}/profileeditpassword2`,
//                                   requestOptions
//                                 )
//                                   .then((response) => response.json())
//                                   .then((result) => {
//                                     if (
//                                       result === "Password has been changed"
//                                     ) {
//                                       message.success(
//                                         "Password has been changed"
//                                       );
//                                       setpopup22(false);
//                                     }
//                                   })
//                                   .catch((error) =>
//                                     console.log("error", error)
//                                   );
//                               }}
//                               className="profileeditingform"
//                             >
//                               <h3>Edit Profile</h3>
//                               <div
//                                 className="editprofileinputs"
//                                 style={{ gap: "10px" }}
//                               >
//                                 <label>
//                                   New Password :
//                                   <input
//                                     required
//                                     type="password"
//                                     value={editpassword}
//                                     onChange={(e) =>
//                                       seteditpassword(e.target.value)
//                                     }
//                                     style={{ width: "70%" }}
//                                   />
//                                 </label>
//                                 <label>
//                                   Confirm Password :
//                                   <input
//                                     required
//                                     type="password"
//                                     title="Password does not Match"
//                                     pattern={editpassword}
//                                     style={{ width: "70%" }}
//                                   />
//                                 </label>
//                               </div>

//                               <div className="buttonnnnn">
//                                 <button
//                                   onClick={() => {
//                                     setpopup22(false);
//                                   }}
//                                   style={{
//                                     border: "1px solid red",
//                                     color: "black",
//                                   }}
//                                 >
//                                   cancel
//                                 </button>

//                                 <button style={{ backgroundColor: "#4180b7" }}>
//                                   Update
//                                 </button>
//                               </div>
//                             </form>
//                           </div>
//                         </>
//                       )}

//                       {patient.map((item, index) => (
//                         <>
//                           {popup2 === index && (
//                             <>
//                               <div
//                                 onClick={() => {
//                                   setpopup2(false);
//                                   count = 0;
//                                 }}
//                                 className="popupbg2"
//                               ></div>
//                               <div className="popup">
//                                 <div className="header">
//                                   <h4>
//                                     Assigned {item.assignedkits.length} Kits to{" "}
//                                     {item.name}
//                                   </h4>
//                                 </div>

//                                 <h4 style={{ marginTop: "30px" }}>
//                                   Food Sensitivity 210
//                                 </h4>
//                                 <table className="tablep">
//                                   <thead className="tablephead">
//                                     <tr>
//                                       <th>S NO.</th>
//                                       <th>Kit ID</th>

//                                       <th>Result</th>
//                                       <th></th>
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     {kit.map((item2, index) => {
//                                       return (
//                                         <>
//                                           {item2.Kittype === "210" && (
//                                             <>
//                                               <React.Fragment key={index}>
//                                                 {item2.assignedto ===
//                                                   item._id && (
//                                                   <tr>
//                                                     <td>
//                                                       {(count = count + 1)}
//                                                     </td>
//                                                     <td>{item2.kitid}</td>

//                                                     {item2.result.length !==
//                                                       0 && (
//                                                       <>
//                                                         <td>
//                                                           <a
//                                                             href={
//                                                               "/dashboard/view-report/" +
//                                                               item2._id
//                                                             }
//                                                           >
//                                                             View
//                                                           </a>
//                                                         </td>
//                                                       </>
//                                                     )}

//                                                     {item2.result.length ===
//                                                       0 && (
//                                                       <>
//                                                         <td>Pending</td>
//                                                       </>
//                                                     )}

//                                                     <td className="assignbuttom">
//                                                       <AiFillDelete
//                                                         className="hovar"
//                                                         style={{
//                                                           width: "30px",
//                                                           height: "30px",
//                                                           color: "red",
//                                                         }}
//                                                         onClick={() => {
//                                                           var myHeaders =
//                                                             new Headers();
//                                                           myHeaders.append(
//                                                             "Content-Type",
//                                                             "application/x-www-form-urlencoded"
//                                                           );

//                                                           var urlencoded =
//                                                             new URLSearchParams();
//                                                           urlencoded.append(
//                                                             "_id",
//                                                             item._id
//                                                           );

//                                                           var requestOptions = {
//                                                             method: "POST",
//                                                             headers: myHeaders,
//                                                             body: urlencoded,
//                                                             redirect: "follow",
//                                                           };

//                                                           fetch(
//                                                             `${process.env.REACT_APP_API_URL}/dltkits`,
//                                                             requestOptions
//                                                           )
//                                                             .then((response) =>
//                                                               response.json()
//                                                             )
//                                                             .then((result) =>
//                                                               setkit(result)
//                                                             )
//                                                             .catch((error) =>
//                                                               console.log(
//                                                                 "error",
//                                                                 error
//                                                               )
//                                                             );
//                                                         }}
//                                                       />
//                                                     </td>
//                                                   </tr>
//                                                 )}
//                                               </React.Fragment>
//                                             </>
//                                           )}
//                                         </>
//                                       );
//                                     })}
//                                   </tbody>
//                                 </table>

//                                 <h4 style={{ marginTop: "30px" }}>
//                                   Food Sensitivity 100
//                                 </h4>
//                                 <table className="tablep">
//                                   <thead className="tablephead">
//                                     <tr>
//                                       <th>S NO.</th>
//                                       <th>Kit ID</th>

//                                       <th>Result</th>
//                                       <th></th>
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     {kit.map((item2, index) => {
//                                       return (
//                                         <>
//                                           {item2.Kittype === "100" && (
//                                             <>
//                                               <React.Fragment key={index}>
//                                                 {item2.assignedto ===
//                                                   item._id && (
//                                                   <tr>
//                                                     <td>
//                                                       {(count = count + 1)}
//                                                     </td>
//                                                     <td>{item2.kitid}</td>

//                                                     {item2.result.length !==
//                                                       0 && (
//                                                       <>
//                                                         <td>
//                                                           <a
//                                                             href={
//                                                               "/dashboard/view-report/" +
//                                                               item2._id
//                                                             }
//                                                           >
//                                                             View
//                                                           </a>
//                                                         </td>
//                                                       </>
//                                                     )}

//                                                     {item2.result.length ===
//                                                       0 && (
//                                                       <>
//                                                         <td>Pending</td>
//                                                       </>
//                                                     )}

//                                                     <td className="assignbuttom">
//                                                       <AiFillDelete
//                                                         className="hovar"
//                                                         style={{
//                                                           width: "30px",
//                                                           height: "30px",
//                                                           color: "red",
//                                                         }}
//                                                         onClick={() => {
//                                                           var myHeaders =
//                                                             new Headers();
//                                                           myHeaders.append(
//                                                             "Content-Type",
//                                                             "application/x-www-form-urlencoded"
//                                                           );

//                                                           var urlencoded =
//                                                             new URLSearchParams();
//                                                           urlencoded.append(
//                                                             "_id",
//                                                             item._id
//                                                           );

//                                                           var requestOptions = {
//                                                             method: "POST",
//                                                             headers: myHeaders,
//                                                             body: urlencoded,
//                                                             redirect: "follow",
//                                                           };

//                                                           fetch(
//                                                             `${process.env.REACT_APP_API_URL}/dltkits`,
//                                                             requestOptions
//                                                           )
//                                                             .then((response) =>
//                                                               response.json()
//                                                             )
//                                                             .then((result) =>
//                                                               setkit(result)
//                                                             )
//                                                             .catch((error) =>
//                                                               console.log(
//                                                                 "error",
//                                                                 error
//                                                               )
//                                                             );
//                                                         }}
//                                                       />
//                                                     </td>
//                                                   </tr>
//                                                 )}
//                                               </React.Fragment>
//                                             </>
//                                           )}{" "}
//                                         </>
//                                       );
//                                     })}
//                                   </tbody>
//                                 </table>

//                                 <div className="bownpopupbutton">
//                                   <button
//                                     onClick={() => {
//                                       setpopup2(false);
//                                       count = 0;
//                                     }}
//                                     style={{
//                                       border: "1px solid red",
//                                       color: "black",
//                                     }}
//                                   >
//                                     Close
//                                   </button>
//                                 </div>
//                               </div>
//                             </>
//                           )}

//                           <tr>
//                             {item.status ? (
//                               <>
//                                 {" "}
//                                 <td
//                                   className="hovar"
//                                   onClick={() => {
//                                     var myHeaders = new Headers();
//                                     myHeaders.append(
//                                       "Content-Type",
//                                       "application/x-www-form-urlencoded"
//                                     );

//                                     var urlencoded = new URLSearchParams();
//                                     urlencoded.append("id", item._id);

//                                     var requestOptions = {
//                                       method: "POST",
//                                       headers: myHeaders,
//                                       body: urlencoded,
//                                       redirect: "follow",
//                                     };

//                                     fetch(
//                                       `${process.env.REACT_APP_API_URL}/deactive`,
//                                       requestOptions
//                                     )
//                                       .then((response) => response.json())
//                                       .then((result) => setPatient(result))
//                                       .catch((error) =>
//                                         console.log("error", error)
//                                       );
//                                   }}
//                                   style={{ color: "green" }}
//                                 >
//                                   <FaDotCircle /> Active
//                                 </td>
//                               </>
//                             ) : (
//                               <>
//                                 {" "}
//                                 <td
//                                   className="hovar"
//                                   onClick={() => {
//                                     var myHeaders = new Headers();
//                                     myHeaders.append(
//                                       "Content-Type",
//                                       "application/x-www-form-urlencoded"
//                                     );

//                                     var urlencoded = new URLSearchParams();
//                                     urlencoded.append("id", item._id);

//                                     var requestOptions = {
//                                       method: "POST",
//                                       headers: myHeaders,
//                                       body: urlencoded,
//                                       redirect: "follow",
//                                     };

//                                     fetch(
//                                       `${process.env.REACT_APP_API_URL}/active`,
//                                       requestOptions
//                                     )
//                                       .then((response) => response.json())
//                                       .then((result) => setPatient(result))
//                                       .catch((error) =>
//                                         console.log("error", error)
//                                       );
//                                   }}
//                                   style={{ color: "red" }}
//                                 >
//                                   <FaDotCircle /> Inactive
//                                 </td>
//                               </>
//                             )}

//                             <td>{sno1++}</td>
//                             <td>{item.name} </td>
//                             <td>{item.email}</td>
//                             <td>{item.assignedkits.length}</td>

//                             <td>
//                               <button
//                                 className="button"
//                                 onClick={async () => {
//                                   await setpopupdetails(true);
//                                   await setuserinfo(item);

//                                   await seteditname(item.name);
//                                   await seteditemail(item.email);
//                                   await seteditaddres(item.address);
//                                   await seteditphone(item.phone);
//                                   await seteditabout(item.about);
//                                   await setbillingpostcode(
//                                     item.billingpostcode
//                                   );

//                                   if (item.profilepic) {
//                                     await setimg3(item.profilepic);
//                                   } else {
//                                     await setimg3("/avatar.png");
//                                   }
//                                 }}
//                               >
//                                 Detail
//                               </button>
//                             </td>
//                           </tr>
//                         </>
//                       ))}
//                     </tbody>
//                   </table>
//                 </>
//               )}

//               {patient.length === 0 && (
//                 <>
//                   <img alt="" src="/empty.gif" width={"40%"} />
//                 </>
//               )}
//             </div>
//           </div>
//         </>
//       )}{" "}
//     </>
//   );
// }

// export default Patient;

// import React from "react";
// import Navbar from "../components/navbar";
// import Sidemanu from "../components/sidemanu";

// const Patients = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="deshboardmain">
//         <Sidemanu />
//         <div className="Practitionermainbody">
//           <div className="header">
//             <h1 className="pppheading"> Patients</h1>
//             {/* {dooption()} */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Patients;



// import React, { useState, useEffect } from "react";
// import Navbar from "../components/navbar";
// import Sidemanu from "../components/sidemanu";

// const Patients = () => {
//   const [patients, setPatients] = useState([]); // State to store patient data
//   const [loading, setLoading] = useState(true); // State to track loading
//   const [error, setError] = useState(null); // State to track errors

//   // Fetch patient data on component mount
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/getallpatients`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch patient data');
//         }
//         const data = await response.json();
//         setPatients(data.data || []); // Update the state with the fetched data
//       } catch (error) {
//         setError(error.message); // Set the error state if something goes wrong
//       } finally {
//         setLoading(false); // Set loading to false once the data is fetched or error occurred
//       }
//     };

//     fetchPatients();
//   }, []); // Empty dependency array ensures this runs once when the component mounts

//   // Inline CSS styles for the table
//   const tableStyle = {
//     width: '100%',
//     borderCollapse: 'collapse',
//   };

//   const thTdStyle = {
//     padding: '10px',
//     border: '1px solid #ddd',
//     textAlign: 'left',
//   };

//   const thStyle = {
//     backgroundColor: '#f4f4f4',
//   };

//   const trEvenStyle = {
//     backgroundColor: '#f9f9f9',
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="deshboardmain">
//         <Sidemanu />
//         <div className="Practitionermainbody">
//           <div className="header">
//             <h1 className="pppheading">Patients</h1>
//           </div>
          
//           {/* Handle loading, error, and patient data rendering */}
//           {loading ? (
//             <p>Loading patients...</p>
//           ) : error ? (
//             <p style={{ color: 'red' }}>Error: {error}</p>
//           ) : (
//             <table style={tableStyle}>
//               <thead>
//                 <tr>
//                   <th style={{ ...thTdStyle, ...thStyle }}>ID</th>
//                   <th style={thTdStyle}>Name</th>
//                   <th style={thTdStyle}>Age</th>
//                   <th style={thTdStyle}>Gender</th>
//                   <th style={thTdStyle}>Email</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {patients.map((patient, index) => (
//                   <tr key={patient.id} style={index % 2 === 0 ? trEvenStyle : {}}>
//                     <td style={thTdStyle}>{patient.id}</td>
//                     <td style={thTdStyle}>{patient.name}</td>
//                     <td style={thTdStyle}>{patient.age}</td>
//                     <td style={thTdStyle}>{patient.gender}</td>
//                     <td style={thTdStyle}>{patient.email}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Patients;




import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidemanu from "../components/sidemanu";

const Patients = () => {
  const [patients, setPatients] = useState([]); // State to store patient data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Fetch patient data on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getallpatients`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.json();
        setPatients(data.data || []); // Update the state with the fetched data
      } catch (error) {
        setError(error.message); // Set the error state if something goes wrong
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or error occurred
      }
    };

    fetchPatients();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Inline CSS styles for the table
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom:"30px"
  };

  const thTdStyle = {
    padding: '10px',
    border: '1px solid #19b0e6',
    // textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#f4f4f4',
  };

  const trEvenStyle = {
    // backgroundColor: '#f9f9f9',
  };

  return (
    <div>
      <Navbar />
      <div className="deshboardmain">
        <Sidemanu />
        <div className="Practitionermainbody">
          <div className="header">
            <h1 className="pppheading" style={{marginBottom:"20px"}}>Patients</h1>
          </div>
          
          {/* Handle loading, error, and patient data rendering */}
          {loading ? (
            <p>Loading patients...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
          ) : (
            <div className="imp"><table style={tableStyle} className="tablep">
            <thead className="tablephead">
              <tr>
                <th style={{ ...thTdStyle }}>S.No</th>
                <th style={thTdStyle}>Patient Name</th>
                <th style={thTdStyle}>Sample Date</th>
                <th style={thTdStyle}>Kit Code</th>
                <th style={thTdStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id} style={index % 2 === 0 ? trEvenStyle : {}}>
                  <td style={thTdStyle}>{index + 1}</td> {/* Display Serial Number */}
                  <td style={thTdStyle}>{patient.name}</td>
                  <td style={thTdStyle}>{patient.sampleDate+"  \n"}</td> {/* Sample Date */}
                  <td style={thTdStyle}>{patient.kitCode+"\n"}</td> {/* Kit Code */}
                  <td style={thTdStyle}>{patient.email}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;
