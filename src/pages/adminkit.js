// import React, { useState, useEffect } from 'react'
// import Navbar from '../components/navbar';
// import Sidemanu from '../components/sidemanu';
// import "../css/deshboard.css"
// import { BiSolidAddToQueue } from "react-icons/bi"
// import { AiFillDelete, AiOutlineMail, AiTwotoneInteraction } from "react-icons/ai"
// import { MdAssignmentReturn, MdAttachEmail, MdEditSquare, MdOutlinePayment, MdOutlinePayments, MdOutlinePendingActions } from "react-icons/md"
// import { loadStripe } from '@stripe/stripe-js';
// import { AiOutlineClose } from "react-icons/ai"
// import { IoIosArrowDropdown } from "react-icons/io";
// import Cookies from 'js-cookie';
// import { AutoComplete, Button, Dropdown, message } from 'antd';
// import Item from 'antd/es/list/Item';
// import { FaKitMedical } from 'react-icons/fa6';
// import { GiFirstAidKit } from 'react-icons/gi';
// import { FaUser } from 'react-icons/fa';
// import { TbGitBranchDeleted, TbReportMoney } from "react-icons/tb";
// import { SiSemaphoreci } from "react-icons/si";









// function Adminkit() {



//   const loginemail = Cookies.get("email")
//   const loginname = Cookies.get("Name")
//   const id = Cookies.get("id")
//   const token = Cookies.get("Token")

//   const [popup, setpopup] = useState(false)
//   const [popup2, setpopup2] = useState("addkit")
//   const [addkit2, setaddkit2] = useState("")
//   const [addkit2p, setaddkit2p] = useState("")
//   const [addkit, setaddkit] = useState([])
//   const [kit, setkit] = useState([])
//   const [kitid, setkitid] = useState("")
//   const [kitiddb, setkitiddb] = useState("")
//   const [kittype, setkittype] = useState("")
//   const [kitdetails, setkitdetails] = useState([])

//   const [practitioner, setpractitioner] = useState([])
//   const [practitionerid, setpractitionerid] = useState("")
//   const [ackKit, setackKit] = useState([])


//   const Addkit = async (e) => {
//     await e.preventDefault()
//     const Kittt = addkit2.replace(/\D/g, '');

//     const kitiddd = parseInt(Kittt)

//     const alphabets = addkit2.replace(/[^a-zA-Z]/g, '');


//     await setaddkit([...addkit, { Kit: kitiddd, Kitprice: addkit2p, Kittype: kittype, prefix: alphabets }]);
//     setaddkit2("")
//     setaddkit2p("")
//     setkittype("")
//     console.log(addkit)
//   }

//   const RemoveItemByIndex = (index) => {
//     // Create a new array without the item at the specified index
//     const updatedAddkit = addkit.filter((_, i) => i !== index);
//     setaddkit(updatedAddkit);
//   };






//   const sendnewkittobackend = async () => {

//     const hide = message.loading("Action in progress", 0)

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json"); // Change the content type to JSON

//     // Create an array


//     // Convert the array to a JSON string
//     var jsonData = JSON.stringify(addkit);

//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: jsonData, // Send the JSON data
//       redirect: 'follow'
//     };

//     await fetch(`${process.env.REACT_APP_API_URL}/addkit`, requestOptions)
//       .then(response => response.json())
//       .then(result => setkit(result),

//         setpopup(false),
//         setaddkit([]),
//         setaddkit2(""),


//       )
//       .catch(error => console.log('error', error));



//     await setTimeout(() => {
//       hide(); // Call hide to stop the loading message
//       message.success("Action completed successfully");
//     }, 2000);

//   }





//   const assignkittopra = () => {
//     const hide = message.loading("Action in progress", 0)
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var urlencoded = new URLSearchParams();
//     urlencoded.append("kitID", kitiddb);
//     urlencoded.append("userid", practitionerid);

//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow'
//     };

//     fetch(`${process.env.REACT_APP_API_URL}/assignkittopra`, requestOptions)
//       .then(response => response.json())
//       .then(result => setkit(result),

//         setpopup(false),
//         setaddkit([]),
//         setaddkit2(""),
//       )
//       .catch(error => console.log('error', error));

//     setTimeout(() => {
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

//       fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions)
//         .then(response => response.json())
//         .then(result => setkit(result))



//       var myHeaders2 = new Headers();
//       myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");



//       var requestOptions2 = {
//         method: 'GET',
//         headers: myHeaders2,

//         redirect: 'follow'
//       };

//       fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions2)
//         .then(response => response.json())
//         .then(result => setpractitioner(result))


//       fetch(`${process.env.REACT_APP_API_URL}/getallemaidata`, requestOptions2)
//         .then(response => response.json())
//         .then(result => setackKit(result))


//     } else if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {

//       var urlencoded2 = new URLSearchParams();
//       urlencoded2.append("id", id);

//       var requestOptions2 = {
//         method: 'POST',
//         headers: myHeaders,
//         body: urlencoded2,
//         redirect: 'follow'
//       };


//       fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfo`, requestOptions2)
//         .then(response => response.json())
//         .then(result => setkit(result))
//         .catch(error => console.log('error', error));




//     }






//   }, [])


//   // const Kit = [
//   //   { name: 'ali', age: 25 },
//   //   { name: 'ahmed', age: 15 },
//   //   { name: 'ahmed', age: 15 },
//   //   { name: 'samoo', age: 22 },
//   // ];

//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   const handleInputChange = (e) => {
//     e.preventDefault()






//     const Kittt = searchTerm.replace(/\D/g, '');

//     const intttt = parseInt(Kittt)
//     // Filter the Kit array based on the user's input
//     const filteredSuggestions = kit.filter((item) =>
//       item.kitid === intttt
//     );

//     // setSuggestions(filteredSuggestions);

//     setkit(filteredSuggestions)
//     setsearchdone(true)

//   };

//   var options = [];

//   const dooption = () => {
//     kit.map((value, index) => {

//       // options = [
//       //   { value: 'Burns Bay Road' },

//       // ];
//       // const newvalue = toString(value.kitid)
//       if (value.Kittype === "dm") {
//         options.push({ value: `RD00${value.kitid}` })
//       }
//       else if (value.Kittype === "pt") {
//         options.push({ value: `${value.prefix}${value.kitid}` })
//       } else {
//         options.push({ value: `${value.kitid}` })
//       }

//     })


//   }





//   const [searchdone, setsearchdone] = useState(false)



//   const clearsearch = () => {
//     const hide = message.loading("Action in progress", 0)
//     if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {

//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



//       var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,

//         redirect: 'follow'
//       };

//       fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions)
//         .then(response => response.json())
//         .then(result => setkit(result))



//       var myHeaders2 = new Headers();
//       myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");



//       var requestOptions2 = {
//         method: 'GET',
//         headers: myHeaders2,

//         redirect: 'follow'
//       };

//       fetch(`{process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions2)
//         .then(response => response.json())
//         .then(result => setpractitioner(result))





//     } else if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {

//       var urlencoded2 = new URLSearchParams();
//       urlencoded2.append("id", id);

//       var requestOptions2 = {
//         method: 'POST',
//         headers: myHeaders,
//         body: urlencoded2,
//         redirect: 'follow'
//       };


//       fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfo`, requestOptions2)
//         .then(response => response.json())
//         .then(result => setkit(result))
//         .catch(error => console.log('error', error));




//     }

//     setsearchdone(false)

//     setTimeout(() => {
//       hide(); // Call hide to stop the loading message
//       message.success("Action completed successfully");
//     }, 2000);
//   }











































//   const [searchTerm2, setSearchTerm2] = useState('');
//   var options2 = [];

//   const dooption2 = () => {
//     practitioner.map((value, index) => {

//       // options = [
//       //   { value: 'Burns Bay Road' },

//       // ];
//       // const newvalue = toString(value.kitid)
//       options2.push({ value: value.name })
//       options2.push({ value: value.email })


//     })


//   }



//   const handleInputChange2 = (e) => {
//     e.preventDefault()






//     const intttt = (searchTerm2)

//     // Filter the Kit array based on the user's input
//     const filteredSuggestions = practitioner.filter((item) =>

//       item.name.toLowerCase().includes(intttt.toLowerCase()) || item.email.toLowerCase().includes(intttt.toLowerCase())



//     );


//     setpractitioner(filteredSuggestions);
//     console.log(filteredSuggestions)
//     setsearchdone2(true)

//   };




//   const [searchdone2, setsearchdone2] = useState(false)

//   const clearsearch2 = () => {
//     const hide = message.loading("Action in progress", 0)
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



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


//     setsearchdone2(false)

//     setTimeout(() => {
//       hide(); // Call hide to stop the loading message
//       message.success("Action completed successfully");
//     }, 2000);
//   }





//   const findpracemail = () => {

//     var emailll
//     practitioner.map((value) => {

//       if (value._id === kitdetails.assignedto) {
//         emailll = value.email

//       }


//     })
//     if (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
//       emailll = loginemail

//     }

//     return emailll



//   }

//   const findpracname = () => {

//     var nameee
//     practitioner.map((value) => {

//       if (value._id === kitdetails.assignedto) {
//         nameee = value.name

//       }


//     })

//     if (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
//       nameee = loginname

//     }
//     return nameee



//   }

//   const Kitsstaus = () => {


//     var kitinfo = []
//     var match = false


//     ackKit.map((item, index) => {



//       if (item.KitId === kitdetails.kitid) {

//         match = true
//       }




//     })












//     var statussss
//     if (!kitdetails.assignedto) {
//       statussss = "Kit Created"
//     } else if (kitdetails.result.length !== 0) {
//       statussss = "Results Published"
//     } else if (match && kitdetails.result.length === 0) {
//       statussss = "Kit received, awaiting results."
//     }
//     else if (!match && kitdetails.result.length === 0) {

//       statussss = "Kit Not received in lab yet."
//     }



//     return statussss
//   }


//   const Kitsstaus2 = (item) => {


//     var kitinfo = []
//     var match = false


//     ackKit.map((item2, index) => {



//       if (item2.KitId === item.kitid) {

//         match = true
//       }




//     })












//     var statussss



//     if (item.Kittype === "100") {

//       if (!item.assignedto) {
//         statussss = "Kit Created"
//       } else if (item.result2.length !== 0) {
//         statussss = "Results Published"
//       } else if (match && item.result2.length === 0) {
//         statussss = "Kit received, awaiting results."
//       }
//       else if (!match && item.result2.length === 0) {

//         statussss = "Kit Not received in lab yet."
//       }

//     } else if (item.Kittype === "210") {
//       if (!item.assignedto) {
//         statussss = "Kit Created"
//       } else if (item.result.length !== 0) {
//         statussss = "Results Published"
//       } else if (match && item.result.length === 0) {
//         statussss = "Kit received, awaiting results."
//       }
//       else if (!match && item.result.length === 0) {

//         statussss = "Kit Not received in lab yet."
//       }
//     } else if (item.Kittype === "pt" || item.Kittype === "dm") {
//       if (!item.assignedto) {
//         statussss = "Kit Created"
//       } else if (item.otherresults !== "nil") {
//         statussss = "Results Published"
//       } else if (match && item.otherresults === "nil") {
//         statussss = "Kit received, awaiting results."
//       }
//       else if (!match && item.otherresults === "nil") {

//         statussss = "Kit Not received in lab yet."
//       }

//     }



//     return statussss
//   }

//   const kitdetailsKitprice = () => {
//     var paymenttt
//     if (kitdetails.Kitprice === "fdgbhjbdgfhjdfgsbf") {
//       paymenttt = kitdetails.Kitprice2
//     } else {
//       paymenttt = kitdetails.Kitprice2
//     }

//     return paymenttt
//   }

//   const kitdetailsKitpricestatus = () => {
//     var paymenttt
//     if (kitdetails.Kitprice === "fdgbhjbdgfhjdfgsbf") {
//       paymenttt = "Payment Completed"
//     } else {
//       paymenttt = "Payment Pending"
//     }

//     return paymenttt
//   }















//   const items = [
//     {
//       key: '1',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" onClick={async () => {

//           const hide = message.loading("Action in progress", 0)
//           const stripe = await loadStripe("pk_live_51MsenqJSzdsymN5jGOTIP3q4qBmD4PDra9chWFQYDC6RCchx2jLlIgdDRrUnhI24QhZeNeAqEo9tc6l3oiR4SWc3000yjqG8qW");

//           var myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//           var urlencoded = new URLSearchParams();
//           urlencoded.append("KitID", kitdetails._id);

//           var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//           };


//           const response = await fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`, requestOptions)

//           const session = await response.json();

//           const result = stripe.redirectToCheckout({
//             sessionId: session.id
//           });

//           if (result.error) {
//             console.log(result.error);
//           }



//           await setTimeout(() => {
//             hide(); // Call hide to stop the loading message
//             message.success("Action completed successfully");
//           }, 2000);
//         }}>
//           Pay The Ammount Of Kit
//         </a>
//       ),
//       icon: <MdOutlinePayment style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },
//     {
//       key: '2',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" onClick={async (e) => {
//           e.preventDefault()
//           const hide = message.loading("Action in progress", 0)
//           var myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


//           var urlencoded2 = new URLSearchParams();
//           urlencoded2.append("id", kitdetails._id);

//           var requestOptions2 = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded2,
//             redirect: 'follow'
//           };


//           await fetch(`${process.env.REACT_APP_API_URL}/kitpricepaymentdoneover`, requestOptions2)
//             .then(response => response.json())
//             .then(result => setkit(result))
//             .catch(error => console.log('error', error));

//           await setpopup(false)
//           await setaddkit([])
//           await setaddkit2("")
//           await setpopup2("addkit")

//           await setTimeout(() => {
//             hide(); // Call hide to stop the loading message
//             message.success("Action completed successfully");
//           }, 2000);
//         }}>


//           Mark as paid

//         </a>


//       ),


//       icon: <MdOutlinePayment style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },
//     {
//       key: '3',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" >


//           Payment is Due

//         </a>


//       ),

//       disabled: true,
//       icon: <AiOutlineMail style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },

//   ];


//   const items1 = [
//     {
//       key: '1',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" onClick={async () => {

//           const hide = message.loading("Action in progress", 0)
//           const stripe = await loadStripe("pk_live_51MsenqJSzdsymN5jGOTIP3q4qBmD4PDra9chWFQYDC6RCchx2jLlIgdDRrUnhI24QhZeNeAqEo9tc6l3oiR4SWc3000yjqG8qW");

//           var myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//           var urlencoded = new URLSearchParams();
//           urlencoded.append("KitID", kitdetails._id);

//           var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//           };


//           const response = await fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`, requestOptions)

//           const session = await response.json();

//           const result = stripe.redirectToCheckout({
//             sessionId: session.id
//           });

//           if (result.error) {
//             console.log(result.error);
//           }



//           await setTimeout(() => {
//             hide(); // Call hide to stop the loading message
//             message.success("Action completed successfully");
//           }, 2000);
//         }}>
//           Pay The Ammount Of Kit
//         </a>
//       ),
//       disabled: kitdetails.Kitprice === "fdgbhjbdgfhjdfgsbf",
//       icon: <MdOutlinePayment style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },


//   ];

//   const items2 = [
//     {
//       key: '1',
//       label: (
//         <a target="_blank" rel="noopener noreferrer"
//         >
//           Pay The Ammount Of Kit
//         </a>
//       ),
//       disabled: true,
//       icon: <MdOutlinePayment style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },
//     {
//       key: '2',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" onClick={async (e) => {
//           e.preventDefault()
//           const hide = message.loading("Action in progress", 0)
//           var myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


//           var urlencoded2 = new URLSearchParams();
//           urlencoded2.append("id", kitdetails._id);

//           var requestOptions2 = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded2,
//             redirect: 'follow'
//           };


//           await fetch(`${process.env.REACT_APP_API_URL}/kitpricepaymentdoneover`, requestOptions2)
//             .then(response => response.json())
//             .then(result => setkit(result))
//             .catch(error => console.log('error', error));

//           await setpopup(false)
//           await setaddkit([])
//           await setaddkit2("")
//           await setpopup2("addkit")
//           await setTimeout(() => {
//             hide(); // Call hide to stop the loading message
//             message.success("Action completed successfully");
//           }, 2000);
//         }}>


//           Mark as paid

//         </a>


//       ),

//       disabled: true,
//       icon: <MdOutlinePayment style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },
//     {
//       key: '3',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" onClick={async (e) => {
//           const hide = message.loading("Action in progress", 0)
//           e.preventDefault()
//           var myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//           var urlencoded = new URLSearchParams();
//           urlencoded.append("_id", kitdetails._id);


//           var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//           };

//           const resp = await fetch(`${process.env.REACT_APP_API_URL}/ackemailpayment`, requestOptions)
//             .then(response => response.json())
//             .then(result => setkit(result))
//             .catch(error => console.log('error', error));

//           await setpopup(false)
//           await setaddkit([])
//           await setaddkit2("")
//           await setpopup2("addkit")
//           await setTimeout(() => {
//             hide(); // Call hide to stop the loading message
//             message.success("Action completed successfully");
//           }, 2000);
//         }}>


//           Send Payment Acknowledgment

//         </a>


//       ),

//       disabled: kitdetails.ackpayment,
//       icon: <AiOutlineMail style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },

//   ];



//   const itemsstatus1 = [
//     {
//       key: '1',
//       label: (
//         <a target="_blank" rel="noopener noreferrer"
//           onClick={async (e) => {
//             e.preventDefault()
//             const hide = message.loading("Action in progress", 0)

//             ackKit.map((item, index) => {



//               if (item.KitId === kitdetails.kitid) {




//                 var myHeaders = new Headers();
//                 myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                 var urlencoded = new URLSearchParams();
//                 urlencoded.append("kitID", item.KitId);
//                 urlencoded.append("patientName", item.Name);
//                 urlencoded.append("_id", item._id);

//                 var requestOptions = {
//                   method: 'POST',
//                   headers: myHeaders,
//                   body: urlencoded,
//                   redirect: 'follow'
//                 };

//                 const resp = fetch(`${process.env.REACT_APP_API_URL}/ackemail`, requestOptions)
//                   .then(response => response.json())
//                   .then(result => setkit(result))
//                   .catch(error => console.log('error', error));

//                 setpopup(false)
//                 setaddkit([])
//                 setaddkit2("")
//                 setpopup2("addkit")

//               }




//             })

//           }}>
//           Send Kit Received Acknowledgment
//         </a>
//       ),
//       disabled: (kitdetails.ack),
//       icon: <AiOutlineMail style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },
//     {
//       key: '2',
//       label: (
//         <a target="_blank" rel="noopener noreferrer"


//           onClick={async (e) => {
//             e.preventDefault()


//             ackKit.map((item, index) => {

//               const hide = message.loading("Action in progress", 0)


//               if (item.KitId === kitdetails.kitid) {



//                 var myHeaders = new Headers();
//                 myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                 var urlencoded = new URLSearchParams();
//                 urlencoded.append("kitID", item.KitId);
//                 urlencoded.append("patientName", item.Name);
//                 urlencoded.append("_id", item._id);

//                 var requestOptions = {
//                   method: 'POST',
//                   headers: myHeaders,
//                   body: urlencoded,
//                   redirect: 'follow'
//                 };

//                 const resp = fetch(`${process.env.REACT_APP_API_URL}/ackemailandmaypent`, requestOptions)
//                   .then(response => response.json())
//                   .then(result => setkit(result))
//                   .catch(error => console.log('error', error));

//                 setpopup(false)
//                 setaddkit([])
//                 setaddkit2("")
//                 setpopup2("addkit")

//               }


//               setTimeout(() => {
//                 hide(); // Call hide to stop the loading message
//                 message.success("Action completed successfully");
//               }, 2000);

//             })

//           }}
//         >


//           Send Kit Received Acknowledgment with Payment information

//         </a>


//       ),
//       disabled: (kitdetails.ack && kitdetails.ackpayment),

//       icon: <AiOutlineMail style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },
//     {
//       key: '3',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" >


//           Results are Pending

//         </a>


//       ),

//       disabled: true,
//       icon: <AiOutlineMail style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },

//   ];


//   const itemsstatus2 = [
//     {
//       key: '1',
//       label: (
//         <a target="_blank" rel="noopener noreferrer"
//           onClick={async (e) => {
//             e.preventDefault()
//             const hide = message.loading("Action in progress", 0)

//             ackKit.map((item, index) => {



//               if (item.KitId === kitdetails.kitid) {




//                 var myHeaders = new Headers();
//                 myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                 var urlencoded = new URLSearchParams();
//                 urlencoded.append("kitID", item.KitId);
//                 urlencoded.append("patientName", item.Name);
//                 urlencoded.append("_id", item._id);

//                 var requestOptions = {
//                   method: 'POST',
//                   headers: myHeaders,
//                   body: urlencoded,
//                   redirect: 'follow'
//                 };

//                 const resp = fetch(`${process.env.REACT_APP_API_URL}/ackemail`, requestOptions)
//                   .then(response => response.json())
//                   .then(result => setkit(result))
//                   .catch(error => console.log('error', error));

//                 setpopup(false)
//                 setaddkit([])
//                 setaddkit2("")
//                 setpopup2("addkit")

//               }




//             })
//             setTimeout(() => {
//               hide(); // Call hide to stop the loading message
//               message.success("Action completed successfully");
//             }, 2000)
//           }}>
//           Send Kit Received Acknowledgment
//         </a>
//       ),
//       disabled: (kitdetails.ack),
//       icon: <AiOutlineMail style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },
//     {
//       key: '2',
//       label: (
//         <a target="_blank" rel="noopener noreferrer"


//           onClick={async (e) => {
//             e.preventDefault()

//             const hide = message.loading("Action in progress", 0)

//             ackKit.map((item, index) => {



//               if (item.KitId === kitdetails.kitid) {



//                 var myHeaders = new Headers();
//                 myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                 var urlencoded = new URLSearchParams();
//                 urlencoded.append("kitID", item.KitId);
//                 urlencoded.append("patientName", item.Name);
//                 urlencoded.append("_id", item._id);

//                 var requestOptions = {
//                   method: 'POST',
//                   headers: myHeaders,
//                   body: urlencoded,
//                   redirect: 'follow'
//                 };

//                 const resp = fetch(`${process.env.REACT_APP_API_URL}/ackemailandmaypent`, requestOptions)
//                   .then(response => response.json())
//                   .then(result => setkit(result))
//                   .catch(error => console.log('error', error));

//                 setpopup(false)
//                 setaddkit([])
//                 setaddkit2("")
//                 setpopup2("addkit")

//               }




//             })
//             setTimeout(() => {
//               hide(); // Call hide to stop the loading message
//               message.success("Action completed successfully");
//             }, 2000);
//           }}
//         >


//           Send Kit Received Acknowledgment with Payment information

//         </a>


//       ),
//       disabled: (kitdetails.ack && kitdetails.ackpayment),

//       icon: <AiOutlineMail style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },
//     {
//       key: '3',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" onClick={async () => {
//           const hide = message.loading("Action in progress", 0)

//           var myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//           var urlencoded = new URLSearchParams();
//           urlencoded.append("_id", kitdetails._id);

//           var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//           };





//           if (kitdetails.Kittype === "210") {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/sentresults210`, requestOptions);
//             const result = await response.json();
//             await setkit(result);
//           } else if (kitdetails.Kittype === "100") {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/sentresults`, requestOptions);
//             const result = await response.json();
//             await setkit(result);
//           } else {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/sentresultsothers`, requestOptions);
//             const result = await response.json();
//             await setkit(result);
//           }



//           setpopup(false)

//           setpopup2("addkit")



//           setTimeout(() => {
//             hide(); // Call hide to stop the loading message
//             message.success("Action completed successfully");
//           }, 2000);

//         }}>
//           Send Results To Practitioner
//         </a>


//       ),

//       disabled: kitdetails.ackresult,
//       icon: <AiOutlineMail style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },

//   ];



//   var sno1 = 1
//   var sno2 = 1

//   return (<>
//     {(token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" || token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") && <>


//       <Navbar />
//       <div className='deshboardmain'>
//         <Sidemanu />
//         <div className='adminkitmainbody'>
//           <div className='header' style={{color:"#19b0e6"}}>
//             <h1 style={{display: 'flex', alignItems: 'center' }}><FaKitMedical style={{ width: '50px', height: '50px' }} />All Kits</h1>
//             {dooption()}
//             {searchdone === false && <>
//               <form onSubmit={handleInputChange}>
//                 {/* <input required

//                 type="text"
//                 value={searchTerm}
//                 onChange={handleInputChange}

//                 placeholder='Search by Kit ID' /> */}

//                 <AutoComplete
//                   type="number"
//                   style={{ width: 200 }}
//                   options={options}
//                   placeholder="Search by Kit ID"
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




//           <div className='addbutton'><button onClick={() => {
//             setpopup(true)
//             setpopup2("addkit")
//           }}><BiSolidAddToQueue style={{ width: '20px', height: '20px' }} />Add Kit</button></div>
//           {popup === true && <>
//             <div onClick={() => {
//               setpopup(false)
//               setaddkit([])
//               setaddkit2("")
//               setpopup2("addkit")
//             }
//             } className='popupbg'></div>
//             <div className='popup'>

//               {popup2 === "addkit" && <>

//                 <form onSubmit={Addkit}>
//                   <input onChange={(e) => setaddkit2(e.target.value)} value={addkit2} required placeholder='Enter the Kit ID' />
//                   <input pattern="(\d).{1,10000}" onChange={(e) => setaddkit2p(e.target.value)} value={addkit2p} required placeholder='Enter the Kit Price' />
//                   <div style={{ display: "flex" }}>
//                     <div style={{ display: 'flex', alignItems: 'center' }}><input checked={kittype === "210"} value="210" onChange={(e) => setkittype(e.target.value)} style={{ width: '40px', height: '100%' }} st type='radio' required id='1' name='same' /><label>FS 210</label></div>

//                     <div style={{ display: 'flex', alignItems: 'center' }} >  <input checked={kittype === "100"} value="100" onChange={(e) => setkittype(e.target.value)} style={{ width: '40px', height: '100%' }} type='radio' required id='1' name='same' /><label>FS 100</label></div>
//                     <div style={{ display: 'flex', alignItems: 'center' }} >  <input checked={kittype === "dm"} value="dm" onChange={(e) => setkittype(e.target.value)} style={{ width: '40px', height: '100%' }} type='radio' required id='1' name='same' /><label>DM</label></div>
//                     <div style={{ display: 'flex', alignItems: 'center' }} >  <input checked={kittype === "pt"} value="pt" onChange={(e) => setkittype(e.target.value)} style={{ width: '40px', height: '100%' }} type='radio' required id='1' name='same' /><label>PT</label></div>

//                   </div>
//                   <button >Add</button>
//                 </form>

//                 {addkit.length !== 0 && <>

//                   <table className='tablep'>
//                     <thead className='tablephead'>
//                       <tr>
//                         <th>S NO.</th>
//                         <th>Kit ID</th>
//                         <th>Kit Price</th>
//                         <th>Kit Type</th>
//                         <th></th>


//                       </tr>
//                     </thead>
//                     <tbody>
//                       {console.log(addkit)}
//                       {addkit.map((kit, index) => (

//                         <tr>
//                           <td>{sno1++}</td>

//                           <td> {kit.Kittype === "pt" && <>{kit.prefix}{kit.Kit} </>}
//                             {kit.Kittype === "dm" && <>RD00{kit.Kit} </>}
//                             {(kit.Kittype !== "pt" && kit.Kittype !== "dm") && <>FS {kit.Kit} </>}

//                           </td>
//                           <td>{kit.Kitprice} </td>
//                           <td>{kit.Kittype === "pt" && <>Parasitology Test </>}
//                             {kit.Kittype === "dm" && <>DNAMap </>}
//                             {(kit.Kittype !== "pt" && kit.Kittype !== "dm") && <>FS {kit.Kittype} </>} </td>


//                           <td className='assignbuttom' ><AiFillDelete className='hovar' onClick={() => RemoveItemByIndex(index)} style={{ width: '30px', height: '30px', color: 'red' }} /></td>

//                         </tr>
//                       ))}










//                     </tbody>
//                   </table>
//                 </>}

//               </>}

//               {popup2 === "assigeto" && <>

//                 <div className='header' >
//                   <h4>Assign ({kitid}) Kits to:</h4>

//                   {dooption2()}

//                   {searchdone2 === false && <>
//                     <form onSubmit={handleInputChange2} style={{ width: "fit-content" }}>
//                       <AutoComplete
//                         type="number"
//                         style={{ width: 200 }}
//                         options={options2}
//                         placeholder="Search by Email/Name"
//                         filterOption={(inputValue, options) =>
//                           options.value.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//                           //  console.log(kitss) 
//                         }
//                         onChange={(inputValue) => setSearchTerm2(inputValue)}
//                       />
//                       <button>Search</button>
//                     </form>

//                   </>}
//                   {searchdone2 === true && <>     <div className='clearsearch'  ><h3>search: {searchTerm2}</h3> <button onClick={clearsearch2}><AiOutlineClose /> Clear</button>  </div>
//                   </>}
//                 </div>


//                 <div className='userbox'>


//                   {practitioner.map((item, index) =>

//                     <div onClick={() => setpractitionerid(item._id)} className='userboxxinside'>

//                       <img alt='' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMOEhIOEBMQDg8QDQ0PDg4ODQ8PEA8NFREWFhUSFhUYHCggGCYlGxMTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKDQ0NDw0NDysZFRktLS0rKystLSsrKysrNy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIFBgQDB//EADMQAQACAAMGBAUEAQUBAAAAAAABAgMEEQUhMTJBURJhcXIigZGhsRNCgsFSM2KS0fAj/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AP1sEVFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAZAAiKgAAAAAAAAAAAAAAAAAAAAAAAAAAMgARFQAAAAAAAAAAAY4mJWvNMV9ZeW208KP3a+lZkHsHijauF3mPWkvRhZml+W1Z8tdJB9QkAAAAAAAAAABkACIqAAAAAAAAl7RWJtM6REazPaAS94rGtp0iOMzwafN7Xm27D+GP8p5p9OzzZ/Oziz2pE/DXy7y8qot7TO+ZmZ7zOqCAAA9uU2lfD3T8desW4/KW7yuarixrWfWsxviXMM8DGthz4qzpP2n1B1Q+GUzMYtfFG6eFq9Yl90UAAAAAAABkACIqAAAAAAANPtvM7/0o6aTf16Q297xWJtPCsTMuUxLzaZtPG0zM+pCsQFQAAAAAB6tn5n9K8TPLOkXjy7uk/8AauRdFsrG8eHGu+afDP8ASUj2ACgAAAAAMgARFQAAAAAAHk2rfTCt56R9Zc4323P9OPfX+2hVKAAAAAAAAra7BvvvXvES1LZbD559k/mCkbwBFAAAAAAZAAiKgAAAAAAPDtiuuFPlasufdXj4Xjran+VZj5uV07/OFiVAAAAAAAAVs9g1+K09qxH3axvdi4Phw/F1vOvyKRsAEUAAAAABkACIqAAAAAAANDtjL+C/jjlvv/l1hvnzzOBGJWaz14TpwnuDlR9Mxgzh2mlo0mPvHeHzVAAAAAF0+fl59gfTL4M4lopHGZ3+UdZdRSsViKxuiIiIePZmS/SjW3PaN/lHZ7UqwAAAAAAABkACIqAAAAAAAAA+GaytcWNJ6cto4w0ObyV8KfiiZr0vEbph0ppru6duijkR0GY2bhzvn/5+loiPpLxYmzKxwxafy01+0mpjWLDYV2bXrjYfymP7l68HZWHxm3j8vFGn2NMafBwZvOlYm0+XTzlvNn7OjC+K3xX+1XsphxWNKx4Y7RGjIUAQAAAAAAAAZAAiKgAAAAAwxMSKx4rTERHWWqze1+mHGn++0b/lANtiYlaRraYrHeZ01eDH2xSOWJt9oaXExJtOtpm095nVguJr34u1sSeGlI8o1n6y8uJmb25r2n+U/h8gDTvvAA0NAB9KYtq8trR6Wl6cLamJHXxe6N/1eIMG6wdsxO69ZjzrvhsMHMVxOS0T5a7/AKOVZRbTfEzExwmN0mGusGjym1rV3X+OO/C0NxgY9cSNaTE+XCY9UxX0AAAAABkACIqAAAPNnM5XBjWd9v21jjP/AEZ7Nxg11nfaeWPPu53FxZtM2tOszxkK+mazNsWdbTr2r+2IfBUVAAAAAAAAAAAAFZYWLNJ8VZms+XX1YAOgyG0YxfhtpW/bpb0e5yVZ68J6THGG+2Znv1I8FueI/wCUdwe8BFAAZAAiKgDHEtFYm08IjWWTVbcx9IjDjr8U+gNZmsxOJabT8o7Q+KoqAAAAAAAAAAAAAAAADOmJNZi0bpid0+bAB0+UzEYtYtHHhaO1ur7tFsXH8N/BPC/D3Q3qKAAyABEVAHObTxfHi3npExWPSHRw5XMc1vdb8rEr5igIKAgoCCgIKAgoCCgIKAgoCCijLDt4Zi3aYn7uqidd/eNfq5KXUZXkp7K/hKR9gEVkACIqAOWzPNb3W/LqXLZnnt7rflYlfIAAAAAAAAAAAAAAAAAAAB1GU5Keyv4cu6jKclPZX8FI+wCKyAAAAcpmee3ut+QWJXyAAAAAAAAAAAAAAAAAAABXU5Pkp7IApH2ARQAH/9k=' width={"30%"} />
//                       <div>
//                         <h5>Name: {item.name}</h5>
//                         <h5>email: {item.email}</h5>
//                         <h5>Address:{item.address}</h5>
//                         <h5>phone:{item.phone}</h5>
//                       </div>
//                     </div>


//                   )}







//                 </div>

//               </>}

//               {popup2 === "kitdetails" && <>

//                 <div className='header' >
//                   <h2>Kits Details</h2>
//                 </div>
//                 <div className='kitdetailsmain' >




//                   <div className='kitdetails'>
//                     <h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <GiFirstAidKit style={{ width: '20px', height: '20px',margin:"0 10px" }} /> KIT ID</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>{kitdetails.Kittype === "dm" && <>RD00</>}{kitdetails.Kittype === "pt" && <>{kitdetails.prefix}</>}{kitdetails.kitid} </h3>
//                   </div>


//                   <div className='kitdetails'><h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <FaUser style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Practitioner Name</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>  {findpracname()}  {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>  <MdEditSquare className='hovar' style={{ width: '20px', height: '20px',margin:"0 10px" }} onClick={() => {
//                     setpopup(true)
//                     setpopup2("assigeto")
//                     setkitid(kitdetails.kitid)
//                     setkitiddb(kitdetails._id)

//                   }} /></>}</h3></div>


//                   <div className='kitdetails'><h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <MdAttachEmail style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Practitioner Email</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>   {findpracemail()} </h3>
//                   </div>


//                   <div className='kitdetails'><h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <MdOutlinePendingActions style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Status</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>  {Kitsstaus()}

//                     {kitdetails.assignedto ? (<>
//                       {Kitsstaus() !== "Kit Not received in lab yet." ? (<>
//                         {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
//                           <Dropdown menu={{
//                             items:

//                               Kitsstaus() === "Results Published" ? itemsstatus2 : itemsstatus1



//                           }} placement="bottomRight" arrow>
//                             <IoIosArrowDropdown className='hovar' style={{ width: '20px', height: '20px',margin:"0 10px" }} />
//                           </Dropdown></>}
//                       </>) : (<></>)}
//                     </>) : (<></>)}

//                   </h3></div>


//                   {/* <div className='kitdetails'><h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <MdOutlinePayments style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Payment</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}> € {kitdetailsKitprice()}

//                     {kitdetails.assignedto ? (<>
//                       <Dropdown menu={{
//                         items:
//                           kitdetails.Kitprice === "fdgbhjbdgfhjdfgsbf" ? token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ? items2 : items1 : token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ? items : items1


//                       }} placement="bottomRight" arrow>
//                         <IoIosArrowDropdown className='hovar' style={{ width: '20px', height: '20px',margin:"0 10px" }} />
//                       </Dropdown>
//                     </>) : (<></>)}

//                   </h3>
//                   </div>


//                   <div className='kitdetails'><h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <TbReportMoney style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Payment Status</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>    {kitdetailsKitpricestatus()}  </h3>
//                   </div> */}




//                   <div className='kitdetails'><h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <TbGitBranchDeleted style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Action </h3><h3 onClick={async () => {
//                     const hide = message.loading("Action in progress", 0)
//                     var myHeaders = new Headers();
//                     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                     var urlencoded = new URLSearchParams();
//                     urlencoded.append("_id", kitdetails._id);

//                     var requestOptions = {
//                       method: 'POST',
//                       headers: myHeaders,
//                       body: urlencoded,
//                       redirect: 'follow'
//                     };

//                     if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
//                       await fetch(`${process.env.REACT_APP_API_URL}/dltkits`, requestOptions)
//                         .then(response => response.json())
//                         .then(result => {
//                           setkit(result)
//                           setpopup(false)
//                           setaddkit2("")
//                         })
//                         .catch(error => console.log('error', error));


//                     }
//                     else if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {
//                       await fetch(`${process.env.REACT_APP_API_URL}/dltkits`, requestOptions)

//                         .catch(error => console.log('error', error));

//                       var urlencoded2 = new URLSearchParams();
//                       urlencoded2.append("id", id);

//                       var requestOptions2 = {
//                         method: 'POST',
//                         headers: myHeaders,
//                         body: urlencoded2,
//                         redirect: 'follow'
//                       };


//                       await fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfo`, requestOptions2)
//                         .then(response => response.json())
//                         .then(result => {
//                           setkit(result)
//                           setpopup(false)
//                           setaddkit2("")
//                         })
//                         .catch(error => console.log('error', error));
//                     }

//                     await setTimeout(() => {
//                       hide(); // Call hide to stop the loading message
//                       message.success("Action completed successfully");
//                     }, 2000);


//                   }} className='hovar' style={{ display: "flex", color: 'red', alignItems: 'center' }}>  Detele This Kit <AiFillDelete style={{ width: '20px', height: '20px',margin:"0 10px" }} /></h3>
//                   </div>


//                 </div>
//               </>}


//               <div className='bownpopupbutton'>
//                 <button onClick={() => {
//                   setpopup(false)
//                   setaddkit([])
//                   setaddkit2("")
//                 }
//                 } style={{ border: '1px solid red', color: 'black' }} >cancel</button>


//                 {popup2 === "addkit" && <>
//                   <button onClick={sendnewkittobackend} style={{ backgroundColor: '#4180b7' }}>Submit</button>
//                 </>}

//                 {popup2 === "assigeto" && <>
//                   <button onClick={assignkittopra} style={{ backgroundColor: '#4180b7' }}>Assign</button>
//                 </>}


//               </div>

//             </div>
//           </>}
























//           {kit.length !== 0 && <>
//             <table border="1" className='tablep'>
//               <thead className='tablephead'>
//                 <tr>
//                   <th>S NO.</th>
//                   <th>Kit ID</th>
//                   <th>Kit Type</th>
//                   {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>     <th>Assigned to</th></>}
//                   {/* <th>Type</th> */}
//                   <th>Status</th>
//                   <th>Action</th>

//                 </tr>
//               </thead>
//               <tbody>


//                 {kit.map((item, index) => (
//                   <tr>
//                     <td>{sno2++}</td>
//                     <td>{item.Kittype === "pt" && <>{item.prefix}</>}{item.Kittype === "dm" && <>RD00</>}{item.kitid}</td>
//                     <td>{item.Kittype === "100" && <>Food Sensitivtiy 100</>}{item.Kittype === "210" && <>Food Sensitivtiy 210</>}{item.Kittype === "pt" && <>Parasitology Test</>}{item.Kittype === "dm" && <>DNAMap</>}</td>

//                     {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
//                       {item.assignedto ? (
//                         <td style={{ display: "flex", flexDirection: 'column', textAlign: 'left', }}>
//                           {practitioner.map((item2, index) => (<>

//                             {item2._id === item.assignedto && <>

//                               <td style={{ border: "none", width: '50%' }}>{item2.name} </td>
//                               <td style={{ border: "none", width: '50%' }}>{item2.email}</td>
//                             </>}


//                           </>))}
//                         </td>
//                       ) : (
//                         <td className='hovar' style={{ color: '#4180B7', display: "flex", alignItems: 'center', justifyContent: "center" }} onClick={() => {
//                           setpopup(true)
//                           setpopup2("assigeto")
//                           setkitid(item.kitid)
//                           setkitiddb(item._id)
//                           const hide = message.loading("Action in progress", 0)
//                           var myHeaders = new Headers();
//                           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



//                           var requestOptions = {
//                             method: 'GET',
//                             headers: myHeaders,

//                             redirect: 'follow'
//                           };

//                           fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
//                             .then(response => response.json())
//                             .then(result => setpractitioner(result))



//                           setTimeout(() => {
//                             hide(); // Call hide to stop the loading message
//                             message.success("Action completed successfully");
//                           }, 2000);
//                         }} >< MdAssignmentReturn style={{ width: '30px', height: '30px', color: '#4180B7' }} /><h5> Assign</h5></td>

//                       )}



//                     </>}


//                     {/* {!item.assignedto ? (<>
//                       {item.result.length === 0 && <>
//                         <td>Kits Created</td>
//                       </>}


//                     </>) : (<>
//                       {item.Kittype === "210" ? (<>

//                         {item.result.length !== 0 && <>
//                           <td><a style={{ textDecoration: "none", fontWeight: 'bold', color: '#6E4E9F' }} href={"/dashboard/view-report/" + item._id} >View result</a></td>
//                         </>}

//                         {item.result.length === 0 && <>
//                           <td>Results Pending</td>
//                         </>}
//                       </>) : (<>

//                         {item.Kittype === "100" ? (<>

//                           {item.result2.length !== 0 && <>
//                             <td><a style={{ textDecoration: "none", fontWeight: 'bold', color: '#6E4E9F' }} href={"/dashboard/view-report100/" + item._id} >View result</a></td>
//                           </>}

//                           {item.result2.length === 0 && <>
//                             <td>Results Pending</td>
//                           </>}

//                         </>) : (<>
//                           {item.otherresults.length !== 0 && <>
//                             <td><a style={{ textDecoration: "none", fontWeight: 'bold', color: '#6E4E9F' }} href={item.otherresults} >View result</a></td>
//                           </>}

//                           {item.otherresults.length === 0 && <>
//                             <td>Results Pending</td>
//                           </>}
//                         </>)}

//                       </>)}

//                     </>)} */}
//                     <td>{Kitsstaus2(item)}</td>


//                     <td>
//                       <button className='button'
//                         onClick={() => {
//                           setpopup(true)
//                           setpopup2("kitdetails")
//                           setkitdetails(item)
//                         }}

//                       > Details</button>
//                     </td>

//                     {/* {item.Kitprice === "fdgbhjbdgfhjdfgsbf" && <> <td>Done</td></>} */}

//                     {/* <td className='assignbuttom' ><AiFillDelete className='hovar' style={{ width: '30px', height: '30px', color: 'red' }}
//                       onClick={async () => {

//                         var myHeaders = new Headers();
//                         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                         var urlencoded = new URLSearchParams();
//                         urlencoded.append("_id", item._id);

//                         var requestOptions = {
//                           method: 'POST',
//                           headers: myHeaders,
//                           body: urlencoded,
//                           redirect: 'follow'
//                         };
//                         if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
//                           await fetch("${process.env.REACT_APP_API_URL}/dltkits", requestOptions)
//                             .then(response => response.json())
//                             .then(result => setkit(result))
//                             .catch(error => console.log('error', error));


//                         } else if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {
//                           await fetch("${process.env.REACT_APP_API_URL}/dltkits", requestOptions)

//                             .catch(error => console.log('error', error));

//                           var urlencoded2 = new URLSearchParams();
//                           urlencoded2.append("id", id);

//                           var requestOptions2 = {
//                             method: 'POST',
//                             headers: myHeaders,
//                             body: urlencoded2,
//                             redirect: 'follow'
//                           };


//                           await fetch("${process.env.REACT_APP_API_URL}/profileKitsinfo", requestOptions2)
//                             .then(response => response.json())
//                             .then(result => setkit(result))
//                             .catch(error => console.log('error', error));



//                         }




//                       }}


//                     /></td> */}

//                   </tr>

//                 ))}






//               </tbody>
//             </table>


//           </>}

//           {kit.length === 0 && <>

//             <img alt='' src='/empty.gif' width={"40%"} />
//           </>}

//         </div>


//       </div>
//     </>} </>)
// }

// export default Adminkit