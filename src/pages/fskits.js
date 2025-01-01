import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../css/adminreport.css";
import Sidemanu from "../components/sidemanu";
import "../css/deshboard.css";
import { ImUpload2 } from "react-icons/im";
import { BiSolidAddToQueue } from "react-icons/bi";
import {
  AiFillDelete,
  AiOutlineMail,
  AiTwotoneInteraction,
} from "react-icons/ai";
import {
  MdAssignmentReturn,
  MdAttachEmail,
  MdEditSquare,
  MdOutlinePayment,
  MdOutlinePayments,
  MdOutlinePendingActions,
} from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import Cookies from "js-cookie";
import axios from "axios";
import { Alert, AutoComplete, Button, Dropdown, message } from "antd";
import Item from "antd/es/list/Item";
import { FaKitMedical } from "react-icons/fa6";
import { GiFirstAidKit } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { TbGitBranchDeleted, TbReportMoney } from "react-icons/tb";
import { SiSemaphoreci } from "react-icons/si";
import Papa from "papaparse";
import { useRef } from "react";

function Fskits() {
  const fileInputRef = useRef(null);
  const loginemail = Cookies.get("email");
  const loginname = Cookies.get("Name");
  const id = Cookies.get("id");
  const token = Cookies.get("Token");

  const [csvData, setCsvData] = useState([]);
  const [csvFile, setCSVFile] = useState(null);
  const [popup, setpopup] = useState(false);
  const [csvpopup, setCsvpopup] = useState(false);
  const [popup2, setpopup2] = useState("addkit");
  const [addkit2, setaddkit2] = useState("");
  const [addkit2p, setaddkit2p] = useState("");
  const [addkit, setaddkit] = useState([]);
  const [kit, setkit] = useState([]);
  const [kitid, setkitid] = useState("");
  const [kitiddb, setkitiddb] = useState("");
  const [kittype, setkittype] = useState("");
  const [kitdetails, setkitdetails] = useState([]);
  const [practitioner2, setpractitioner2] = useState([]);
  const [clickedId,setClickedId] = useState(null);
  const [practitioner, setpractitioner] = useState([]);
  const [practitionerid, setpractitionerid] = useState("");
  const [ackKit, setackKit] = useState([]);
  const urlTest = "https://report.test4.life/";
  const urlSupply = "https://report-sl.test4.life/";

  const Addkit = async (e) => {
    await e.preventDefault();

    await setaddkit([
      ...addkit,
      { Kit: addkit2, Kitprice: addkit2p, Kittype: kittype },
    ]);
    setaddkit2("");
    setaddkit2p("");
    setkittype("");
    console.log(addkit);
  };

  const RemoveItemByIndex = async (index) => {
    const hide = message.loading("Action in progress", 0);
    // Create a new array without the item at the specified index
    const updatedAddkit = addkit.filter((_, i) => i !== index);
    await setaddkit(updatedAddkit);
    await setTimeout(() => {
      hide(); // Call hide to stop the loading message
      message.success("Action completed successfully");
    }, 2000);
  };

  //   const datauploaded = () => {
  //     console.log(csvData)
  //         Alert(csvData);
  //     if (csvFile) {
  //         const hide = message.loading("Processing CSV file...", 0);

  //         // Process each row in the CSV

  //         csvData.map((item) => {
  //             const kitId = item['ID']; // Parse the Kit ID
  //             const practitioner = item['Practitioner']; // Get the Practitioner

  //             // Validate the inputs
  //             if (!kitId || !practitioner) {
  //                 message.error(`Invalid data in CSV. ID: ${kitId}, Practitioner: ${practitioner}`);
  //                 return;
  //             }

  //             // Prepare request headers and body
  //             const myHeaders = new Headers();
  //             myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //             const urlencoded = new URLSearchParams();
  //             urlencoded.append("kitid", kitId);
  //             urlencoded.append("practitioner", practitioner);

  //             const requestOptions = {
  //                 method: 'POST',
  //                 headers: myHeaders,
  //                 body: urlencoded,
  //                 redirect: 'follow'
  //             };

  //             // Make API call to store the data
  //             fetch(`${process.env.REACT_APP_API_URL}/assignPractitionerToKit`, requestOptions)
  //                 .then((response) => response.json())
  //                 .then((result) => {
  //                     if (result === "Kit not found.") {
  //                         alert(`The Kit ID (${kitId}) was not found in the database. Please ensure the Kit ID is available.`);
  //                     } else {
  //                         message.success(`Practitioner assigned successfully for Kit ID: ${kitId}`);
  //                     }
  //                 })
  //                 .catch((error) => {
  //                     console.error('Error:', error);
  //                     message.error(`Failed to assign practitioner for Kit ID: ${kitId}`);
  //                 });
  //         });

  //         setCsvpopup(false);

  //         // Stop loading message and display success
  //         setTimeout(() => {
  //             hide();
  //             message.success("All practitioners assigned successfully!");
  //         }, 2000);
  //     } else {
  //         message.error("Please upload a file first");
  //     }
  // };

  // const datauploaded = async () => {
  //   console.log("CSV Data:", csvData);

  //   if (!csvFile) {
  //       message.error("Please upload a file first");
  //       return;
  //   }

  //   const hide = message.loading("Processing CSV file...", 0);

  //   // Process each row in the CSV
  //   for (const item of csvData) {
  //       const kitId = item['ID']; // Parse the Kit ID
  //       const practitioner = item['Practitioner']; // Get the Practitioner

  //       // Validate the inputs
  //       if (!kitId || !practitioner) {
  //           message.error(`Invalid data in CSV. ID: ${kitId}, Practitioner: ${practitioner}`);
  //           continue; // Skip this iteration and move to the next row
  //       }

  //       try {
  //           // Prepare request headers and body
  //           const response = await fetch("/addKitAndAssignPractitioner", {
  //               method: "POST",
  //               headers: {
  //                   "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({
  //                   kitid: kitId,
  //                   practitionerName: practitioner,
  //               }),
  //           });

  //           const result = await response.json();

  //           if (response.ok) {
  //               message.success(`Successfully added Kit ID: ${kitId} assigned to ${practitioner}.`);
  //           } else {
  //               message.error(result.message || `Failed to process Kit ID: ${kitId}.`);
  //           }
  //       } catch (error) {
  //           console.error(`Error assigning Kit ID: ${kitId}`, error);
  //           message.error(`Failed to assign Kit ID: ${kitId} due to server error.`);
  //       }
  //   }

  //   // Stop loading message
  //   hide();
  //   setCsvpopup(false);
  //   setCSVFile(null);
  // };

  const datauploaded = async () => {
    console.log("CSV Data:", csvData);

    if (!csvFile) {
      message.error("Please upload a file first");
      return;
    }

    const hide = message.loading("Processing CSV file...", 0);

    // Process each row in the CSV
    for (const item of csvData) {
      // const kitId = item['ID']; // Parse the Kit ID
      const kitId =
        item["ID"] ||
        item["id"] ||
        item["kitId"] ||
        item["KitId"] ||
        item["KITID"] ||
        item["KitID"] ||
        item["kitid"] ||
        item["sampleid"] ||
        item["SampleId"] ||
        item["sampleId"];
      // const practitionerEmail = item['Practitioner']; // Get the Practitioner Email
      const practitionerEmail =
        item["Practitioner"] ||
        item["practitioner"] ||
        item["practitionerEmail"] ||
        item["practitioneremail"] ||
        item["Email"] ||
        item["email"];

      // Validate the inputs
      if (!kitId || !practitionerEmail) {
        message.error(
          `Invalid data in CSV. ID: ${kitId}, Practitioner: ${practitionerEmail}`
        );
        continue; // Skip this iteration and move to the next row
      }

      try {
        // Prepare request headers and body
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/addKitAndAssignPractitioner`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              kitid: kitId,
              practitionerEmail: practitionerEmail,
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          message.success(
            `Successfully added Kit ID: ${kitId} assigned to ${practitionerEmail}.`
          );
        } else {
          message.error(
            result.message || `Failed to process Kit ID: ${kitId}.`
          );
        }
      } catch (error) {
        console.error(`Error assigning Kit ID: ${kitId}`, error);
        message.error(`Failed to assign Kit ID: ${kitId} due to server error.`);
      }
    }

    // Stop loading message
    hide();
    setCsvpopup(false);
    setCSVFile(null);
    // Fetch the updated kit data
    fetchKitsData();
  };

  const fetchKitsData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions);
    const result = await response.json();
    setkit(result.kit || []);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    // console.log(event.target.files)
    // console.log(csvFile)
    setCSVFile(file);

    await Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleClearInput = () => {
    // setFiles([]); // Clear the files state
    fileInputRef.current.value = ""; // Clear the file input value
    setCSVFile(null);
  };
  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setCSVFile(droppedFile);
      Papa.parse(droppedFile, {
        complete: (result) => {
          setCsvData(result.data);
        },
        header: true,
        skipEmptyLines: true,
      });
    } else {
      alert("Please drop a valid CSV file.");
    }
  };

  const sendnewkittobackend = async () => {
    const hide = message.loading("Action in progress", 0);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json"); // Change the content type to JSON

    // Create an array

    // Convert the array to a JSON string
    var jsonData = JSON.stringify(addkit);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: jsonData, // Send the JSON data
      redirect: "follow",
    };

    await fetch(`${process.env.REACT_APP_API_URL}/addkit`, requestOptions)
      .then((response) => response.json())
      .then(
        (result) => setkit(result),

        setpopup(false),
        setaddkit([]),
        setaddkit2("")
      )
      .catch((error) => console.log("error", error));

    await setTimeout(() => {
      hide(); // Call hide to stop the loading message
      message.success("Action completed successfully");
    }, 2000);
  };

  const assignkittopra = async () => {
    const hide = message.loading("Action in progress", 0);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("kitID", kitiddb);
    urlencoded.append("userid", practitionerid);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_URL}/assignkittopra`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (result) => setkit(result),

        setpopup(false),
        setaddkit([]),
        setaddkit2("")
      )
      .catch((error) => console.log("error", error));
    await setTimeout(() => {
      hide(); // Call hide to stop the loading message
      message.success("Action completed successfully");
    }, 2000);
  };

  useEffect(() => {
    if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,

        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions)
        .then((response) => response.json())
        .then((result) => setkit(result));

      var myHeaders2 = new Headers();
      myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

      var requestOptions2 = {
        method: "GET",
        headers: myHeaders2,

        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/getallpractitioner`,
        requestOptions2
      )
        .then((response) => response.json())
        .then((result) => {
          setpractitioner(result);
          setpractitioner2(result);
        });

      // fetch(`${process.env.REACT_APP_API_URL}/getallemaidata`, requestOptions2)
      //   .then(response => response.json())
      //   .then(result => setackKit(result))
    } else if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {
      var urlencoded2 = new URLSearchParams();
      urlencoded2.append("id", id);

      var requestOptions2 = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded2,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfo`, requestOptions2)
        .then((response) => response.json())
        .then((result) => setkit(result))
        .catch((error) => console.log("error", error));
    }
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const intttt = searchTerm.toString();
    // Filter the Kit array based on the user's input
    const filteredSuggestions = kit.filter((item) => item.kitid === intttt);
    // setSuggestions(filteredSuggestions);
    setkit(filteredSuggestions);
    setsearchdone(true);
  };

  var options = [];

  const dooption = () => {
    // kit.map((value, index) => {
    //   // options = [
    //   //   { value: 'Burns Bay Road' },

    //   // ];
    //   // const newvalue = toString(value.kitid)
    //   if (value.Kittype === "100" || value.Kittype === "210") {
    //     options.push({ value: `${value.kitid}` });
    //   }
    // });
  };

  const [searchdone, setsearchdone] = useState(false);

  const clearsearch = async () => {
    if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
      const hide = message.loading("Action in progress", 0);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,

        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions)
        .then((response) => response.json())
        .then((result) => setkit(result.kit || []));

      var myHeaders2 = new Headers();
      myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

      var requestOptions2 = {
        method: "GET",
        headers: myHeaders2,

        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/getallpractitioner`,
        requestOptions2
      )
        .then((response) => response.json())
        .then((result) => {
          setpractitioner(result);
          setpractitioner2(result);
        });

      await setTimeout(() => {
        hide(); // Call hide to stop the loading message
        message.success("Action completed successfully");
      }, 2000);
    } else if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {
      const hide = message.loading("Action in progress", 0);
      var urlencoded2 = new URLSearchParams();
      urlencoded2.append("id", id);

      var requestOptions2 = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded2,
        redirect: "follow",
      };

      fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfo`, requestOptions2)
        .then((response) => response.json())
        .then((result) => setkit(result))
        .catch((error) => console.log("error", error));

      await setTimeout(() => {
        hide(); // Call hide to stop the loading message
        message.success("Action completed successfully");
      }, 2000);
    }

    setsearchdone(false);
  };
  const [searchTerm2, setSearchTerm2] = useState("");
  var options2 = [];

  const dooption2 = () => {
    practitioner.map((value, index) => {
      // options = [
      //   { value: 'Burns Bay Road' },

      // ];
      // const newvalue = toString(value.kitid)
      options2.push({ value: value.name });
      options2.push({ value: value.email });
    });
  };

  const handleInputChange2 = (e) => {
    e.preventDefault();

    const intttt = searchTerm2;

    // Filter the Kit array based on the user's input
    const filteredSuggestions = practitioner2.filter(
      (item) =>
        item.name.toLowerCase().includes(intttt.toLowerCase()) ||
        item.email.toLowerCase().includes(intttt.toLowerCase())
    );

    setpractitioner2(filteredSuggestions);
    console.log(filteredSuggestions);
    setsearchdone2(true);
  };

  const [searchdone2, setsearchdone2] = useState(false);

  const clearsearch2 = async () => {
    const hide = message.loading("Action in progress", 0);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
      .then((response) => response.json())
      .then((result) => setpractitioner2(result));

    var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions2 = {
      method: "GET",
      headers: myHeaders2,

      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
      .then((response) => response.json())
      .then((result) => setkit(result));

    setsearchdone2(false);
    await setTimeout(() => {
      hide(); // Call hide to stop the loading message
      message.success("Action completed successfully");
    }, 2000);
  };

  const findpracemail = () => {
    var emailll;
    practitioner.map((value) => {
      if (value._id === kitdetails.assignedto) {
        emailll = value.email;
      }
    });
    if (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
      emailll = loginemail;
    }

    return emailll;
  };

  const findpracname = () => {
    var nameee;
    practitioner.map((value) => {
      if (value._id === kitdetails.assignedto) {
        nameee = value.name;
      }
    });

    if (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
      nameee = loginname;
    }
    return nameee;
  };

  const Kitsstaus = () => {
    var kitinfo = [];
    var match = false;

    (ackKit || []).map((item, index) => {
      if (item.KitId === kitdetails.kitid) {
        match = true;
      }
    });

    var statussss;
    if (!kitdetails.assignedto) {
      statussss = "Kit Created";
    } else if (kitdetails.result.length !== 0) {
      statussss = "Results Published";
    } else if (match && kitdetails.result.length === 0) {
      statussss = "Kit received, awaiting results.";
    } else if (!match && kitdetails.result.length === 0) {
      statussss = "Kit Not received in lab yet.";
    }

    return statussss;
  };

  const kitdetailsKitprice = () => {
    var paymenttt;
    if (kitdetails.Kitprice === "fdgbhjbdgfhjdfgsbf") {
      paymenttt = kitdetails.Kitprice2;
    } else {
      paymenttt = kitdetails.Kitprice2;
    }

    return paymenttt;
  };

  const kitdetailsKitpricestatus = () => {
    var paymenttt;
    if (kitdetails.Kitprice === "fdgbhjbdgfhjdfgsbf") {
      paymenttt = "Payment Completed";
    } else {
      paymenttt = "Payment Pending";
    }

    return paymenttt;
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={async () => {
            const hide = message.loading("Action in progress", 0);
            const stripe = await loadStripe(
              "pk_live_51MsenqJSzdsymN5jGOTIP3q4qBmD4PDra9chWFQYDC6RCchx2jLlIgdDRrUnhI24QhZeNeAqEo9tc6l3oiR4SWc3000yjqG8qW"
            );

            var myHeaders = new Headers();
            myHeaders.append(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );

            var urlencoded = new URLSearchParams();
            urlencoded.append("KitID", kitdetails._id);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded,
              redirect: "follow",
            };

            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/create-checkout-session`,
              requestOptions
            );

            const session = await response.json();

            const result = stripe.redirectToCheckout({
              sessionId: session.id,
            });

            if (result.error) {
              console.log(result.error);
            }
          }}
        >
          Pay The Ammount Of Kit
        </a>
      ),
      icon: (
        <MdOutlinePayment
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={async (e) => {
            e.preventDefault();
            const hide = message.loading("Action in progress", 0);
            var myHeaders = new Headers();
            myHeaders.append(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );

            var urlencoded2 = new URLSearchParams();
            urlencoded2.append("id", kitdetails._id);

            var requestOptions2 = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded2,
              redirect: "follow",
            };

            await fetch(
              `${process.env.REACT_APP_API_URL}/kitpricepaymentdoneover`,
              requestOptions2
            )
              .then((response) => response.json())
              .then((result) => setkit(result))
              .catch((error) => console.log("error", error));

            await setpopup(false);
            await setaddkit([]);
            await setaddkit2("");
            await setpopup2("addkit");
            await setTimeout(() => {
              hide(); // Call hide to stop the loading message
              message.success("Action completed successfully");
            }, 2000);
          }}
        >
          Mark as paid
        </a>
      ),

      icon: (
        <MdOutlinePayment
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Payment is Due
        </a>
      ),

      disabled: true,
      icon: (
        <AiOutlineMail
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
  ];

  const items1 = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={async () => {
            const hide = message.loading("Action in progress", 0);
            const stripe = await loadStripe(
              "pk_live_51MsenqJSzdsymN5jGOTIP3q4qBmD4PDra9chWFQYDC6RCchx2jLlIgdDRrUnhI24QhZeNeAqEo9tc6l3oiR4SWc3000yjqG8qW"
            );

            var myHeaders = new Headers();
            myHeaders.append(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );

            var urlencoded = new URLSearchParams();
            urlencoded.append("KitID", kitdetails._id);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded,
              redirect: "follow",
            };

            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/create-checkout-session`,
              requestOptions
            );

            const session = await response.json();

            const result = stripe.redirectToCheckout({
              sessionId: session.id,
            });

            if (result.error) {
              console.log(result.error);
            }

            await setTimeout(() => {
              hide(); // Call hide to stop the loading message
              message.success("Action completed successfully");
            }, 2000);
          }}
        >
          Pay The Ammount Of Kit
        </a>
      ),
      disabled: kitdetails.Kitprice === "fdgbhjbdgfhjdfgsbf",
      icon: (
        <MdOutlinePayment
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
  ];

  const items2 = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Pay The Ammount Of Kit
        </a>
      ),
      disabled: true,
      icon: (
        <MdOutlinePayment
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={async (e) => {
            e.preventDefault();

            var myHeaders = new Headers();
            myHeaders.append(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );

            var urlencoded2 = new URLSearchParams();
            urlencoded2.append("id", kitdetails._id);

            var requestOptions2 = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded2,
              redirect: "follow",
            };

            await fetch(
              `${process.env.REACT_APP_API_URL}/kitpricepaymentdoneover`,
              requestOptions2
            )
              .then((response) => response.json())
              .then((result) => setkit(result))
              .catch((error) => console.log("error", error));

            await setpopup(false);
            await setaddkit([]);
            await setaddkit2("");
            await setpopup2("addkit");
          }}
        >
          Mark as paid
        </a>
      ),

      disabled: true,
      icon: (
        <MdOutlinePayment
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={async (e) => {
            const hide = message.loading("Action in progress", 0);
            e.preventDefault();
            var myHeaders = new Headers();
            myHeaders.append(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );

            var urlencoded = new URLSearchParams();
            urlencoded.append("_id", kitdetails._id);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded,
              redirect: "follow",
            };

            const resp = await fetch(
              `${process.env.REACT_APP_API_URL}/ackemailpayment`,
              requestOptions
            )
              .then((response) => response.json())
              .then((result) => setkit(result))
              .catch((error) => console.log("error", error));

            await setpopup(false);
            await setaddkit([]);
            await setaddkit2("");
            await setpopup2("addkit");
            await setTimeout(() => {
              hide(); // Call hide to stop the loading message
              message.success("Action completed successfully");
            }, 2000);
          }}
        >
          Send Payment Acknowledgment
        </a>
      ),

      disabled: kitdetails.ackpayment,
      icon: (
        <AiOutlineMail
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
  ];

  const itemsstatus1 = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={async (e) => {
            e.preventDefault();

            const hide = message.loading("Action in progress", 0);
            (ackKit || []).map((item, index) => {
              if (item.KitId === kitdetails.kitid) {
                var myHeaders = new Headers();
                myHeaders.append(
                  "Content-Type",
                  "application/x-www-form-urlencoded"
                );

                var urlencoded = new URLSearchParams();
                urlencoded.append("kitID", item.KitId);
                urlencoded.append("patientName", item.Name);
                urlencoded.append("_id", item._id);

                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: urlencoded,
                  redirect: "follow",
                };

                const resp = fetch(
                  `${process.env.REACT_APP_API_URL}/ackemail`,
                  requestOptions
                )
                  .then((response) => response.json())
                  .then((result) => {
                    setkit(result);
                    fetchKitsData(); // Fetch the updated kit data
                    window.location.reload(); // Reload the page
                  })
                  .catch((error) => console.log("error", error));

                setpopup(false);
                setaddkit([]);
                setaddkit2("");
                setpopup2("addkit");
              }

              
            });
            await setTimeout(() => {
              hide(); // Call hide to stop the loading message
              message.success("Action completed successfully");
            }, 2000);
          }}
        >
          Send Kit Recieved Acknowledgment
        </a>
      ),
      disabled: kitdetails.ack,
      icon: (
        <AiOutlineMail
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
  
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Results are Pending
        </a>
      ),

      disabled: true,
      icon: (
        <AiOutlineMail
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
  ];

  const itemsstatus2 = [
    // {
    //   key: "1",
    //   label: (
    //     <a
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       onClick={async (e) => {
    //         e.preventDefault();
    //         const hide = message.loading("Action in progress", 0);

    //         ackKit.map((item, index) => {
    //           if (item.KitId === kitdetails.kitid) {
    //             var myHeaders = new Headers();
    //             myHeaders.append(
    //               "Content-Type",
    //               "application/x-www-form-urlencoded"
    //             );

    //             var urlencoded = new URLSearchParams();
    //             urlencoded.append("kitID", item.KitId);
    //             urlencoded.append("patientName", item.Name);
    //             urlencoded.append("_id", item._id);

    //             var requestOptions = {
    //               method: "POST",
    //               headers: myHeaders,
    //               body: urlencoded,
    //               redirect: "follow",
    //             };

    //             const resp = fetch(
    //               `${process.env.REACT_APP_API_URL}/ackemail`,
    //               requestOptions
    //             )
    //               .then((response) => response.json())
    //               .then((result) => setkit(result))
    //               .catch((error) => console.log("error", error));

    //             setpopup(false);
    //             setaddkit([]);
    //             setaddkit2("");
    //             setpopup2("addkit");
    //           }
    //         });
    //         await setTimeout(() => {
    //           hide(); // Call hide to stop the loading message
    //           message.success("Action completed successfully");
    //         }, 2000);
    //       }}
    //     >
    //       Send Kit Recieved Acknowledgment
    //     </a>
    //   ),
    //   disabled: kitdetails.ack,
    //   icon: (
    //     <AiOutlineMail
    //       style={{ width: "20px", height: "20px", color: "#4885B9" }}
    //     />
    //   ),
    // },
  
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={async (e) => {
            e.preventDefault();
  
            // Display a loading message
            const hide = message.loading("Action in progress...", 0);
  
            try {
              // Debugging: Log kitdetails
              console.log("Kitdetails:", kitdetails);
  
              // Ensure kitdetails has a kitid
              if (!kitdetails || !kitdetails.kitid) {
                message.error("Kit details are missing or incomplete.");
                return;
              }
  
              // Prepare the request headers and body
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
  
              const requestBody = JSON.stringify({
                qrCode: kitdetails.kitid,
              });
  
              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: requestBody,
              };
  
              // Call the /kitrecbyqr API
              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/kitrecbyqr`,
                requestOptions
              );
  
              const result = await response.json();
              window.location.reload();
              if (response.ok) {
                // Successfully retrieved kit
                message.success(result.message || "Action completed successfully");
                setkit(result.kit); // Update state with the updated kit data
              } else {
                // Handle error response
                message.error(result.message || "Failed to process kit.");
              }
  
              // Additional state updates
              setpopup(false);
              setaddkit([]);
              setaddkit2("");
              setpopup2("addkit");
            } catch (error) {
              console.error("Error:", error);
              message.error("An unexpected error occurred.");
            } finally {
      //         var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      // var requestOptions = {
      //   method: "GET",
      //   headers: myHeaders,

      //   redirect: "follow",
      // };

      // fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions)
      //   .then((response) => response.json())
      //   .then((result) => setkit(result.kit || []));
              // Hide the loading message
              hide();
            }
          }}
        >
          Send Kit Received Acknowledgment
        </a>
      ),
      disabled: kitdetails?.ack,
      icon: (
        <AiOutlineMail
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={async () => {
            const hide = message.loading("Action in progress", 0);

            var myHeaders = new Headers();
            myHeaders.append(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );

            var urlencoded = new URLSearchParams();
            urlencoded.append("_id", kitdetails._id);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded,
              redirect: "follow",
            };

            if (kitdetails.Kittype === "210") {
              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/sentresults210`,
                requestOptions
              );
              const result = await response.json();
              await setkit(result);
            } else {
              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/sentresults`,
                requestOptions
              );
              const result = await response.json();
              await setkit(result);
            }

            setpopup(false);

            setpopup2("addkit");

            await setTimeout(() => {
              hide(); // Call hide to stop the loading message
              message.success("Action completed successfully");
            }, 2000);
          }}
        >
          Send Results To Practitioner
        </a>
      ),

      disabled: kitdetails.ackresult,
      icon: (
        <AiOutlineMail
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
  ];

  var sno1 = 1;
  var sno2 = 1;
  var sno3 = 1;

  return (
    <>
      {(token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ||
        token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") && (
        <>
          <Navbar />
          <div className="deshboardmain">
            <Sidemanu />
            <div className="adminkitmainbody">
              <div className="header" style={{ color: "#19afe6" }}>
                {/* //<FaKitMedical style={{ width: '50px', height: '50px' }} /> */}
                <h1 style={{ display: "flex", alignItems: "center" }}>
                  Food Sensitivtiy Kits
                </h1>
                {dooption()}
                {searchdone === false && (
                  <>
                    <form onSubmit={handleInputChange}>

                      <AutoComplete
                        type="number"
                        style={{ width: 200 }}
                        options={options}
                        placeholder="Search by Kit ID"
                        filterOption={
                          (inputValue, options) =>
                            options.value
                              .toString()
                              .toUpperCase()
                              .indexOf(inputValue.toUpperCase()) !== -1
                          //  console.log(kitss)
                        }
                        onChange={(inputValue) => setSearchTerm(inputValue)}
                      />
                      <button>Search</button>
                    </form>
                  </>
                )}
                {searchdone === true && (
                  <>
                    {" "}
                    <div className="clearsearch">
                      <h3>search: {searchTerm}</h3>{" "}
                      <button onClick={clearsearch}>
                        <AiOutlineClose /> Clear
                      </button>{" "}
                    </div>
                  </>
                )}
              </div>

              {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
                <>
                  <div className="addbutton">
                    <button
                      onClick={() => {
                        setpopup(true);
                        setpopup2("addkit");
                      }}
                    >
                      <BiSolidAddToQueue
                        style={{ width: "20px", height: "20px" }}
                      />
                      Add Kit
                    </button>
                  </div>{" "}
                </>
              )}

              {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
                <>
                  <div className="addbutton">
                    <button onClick={() => setCsvpopup(true)}>
                      <ImUpload2 style={{ width: "20px", height: "20px" }} />
                      Upload CSV
                    </button>
                  </div>
                  {csvpopup === true && (
                    <>
                      <div
                        onClick={() => {
                          setCsvpopup(false);
                          setCSVFile(null);
                        }}
                        className="popupbg"
                      ></div>
                      <div className="popup">
                        <div
                          className="file-drop-zone"
                          onDrop={handleFileDrop}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <label className="custom-file-upload">
                            <div className="clickablediv">
                              <ImUpload2
                                style={{ width: "100px", height: "100px" }}
                              />
                              <h4>Click or drag file to this area to upload</h4>
                            </div>
                            <input
                              multiple="off"
                              ref={fileInputRef}
                              className="inputbuttontouploadfile"
                              type="file"
                              accept=".csv"
                              onChange={handleFileUpload}
                            />
                          </label>
                        </div>
                        <div className="filename">
                          {" "}
                          {csvFile && (
                            <>
                              {" "}
                              <p>Selected CSV File: {csvFile.name}</p>
                              <AiFillDelete
                                onClick={handleClearInput}
                                className="hovar"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  color: "red",
                                }}
                              />
                            </>
                          )}
                        </div>
                        <div className="bownpopupbutton">
                          <button
                            onClick={() => {
                              setCsvpopup(false);
                              setCSVFile(null);
                            }}
                            style={{ border: "1px solid red", color: "black" }}
                          >
                            cancel
                          </button>
                          <button
                            onClick={datauploaded}
                            style={{ backgroundColor: "#4180b7" }}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {popup === true && (
                <>
                  <div
                    onClick={() => {
                      setpopup(false);
                      setaddkit([]);
                      setaddkit2("");
                      setpopup2("addkit");
                    }}
                    className="popupbg"
                  ></div>
                  <div className="popup">
                    {popup2 === "addkit" && (
                      <>
                        <form onSubmit={Addkit}>
                          <input
                            onChange={(e) => setaddkit2(e.target.value)}
                            value={addkit2}
                            required
                            placeholder="Enter the Kit ID"
                          />
                         
                          <button>Add</button>
                        </form>

                        {addkit.length !== 0 && (
                          <>
                            <div className="imp">
                              <table className="tablep">
                                <thead className="tablephead">
                                  <tr>
                                    <th>S NO.</th>
                                    <th>Kit ID</th>

                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {addkit.map((kit, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{kit.Kit}</td>
                                      <td className="assignbuttom">
                                        <AiFillDelete
                                          className="hovar"
                                          onClick={() => RemoveItemByIndex(index)}
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            color: "red",
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {popup2 === "assigeto" && (
                      <>
                        <div className="header">
                          <h4>Assign ({kitid}) Kits to:</h4>

                          {dooption2()}

                          {searchdone2 === false && (
                            <>
                              <form
                                onSubmit={handleInputChange2}
                                style={{ width: "fit-content" }}
                              >
                                <AutoComplete
                                  type="number"
                                  style={{ width: 200 }}
                                  options={options2}
                                  placeholder="Search by Email/Name"
                                  filterOption={
                                    (inputValue, options) =>
                                      options.value
                                        .toString()
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                      -1
                                    //  console.log(kitss)
                                  }
                                  onChange={(inputValue) =>
                                    setSearchTerm2(inputValue)
                                  }
                                />
                                <button>Search</button>
                              </form>
                            </>
                          )}
                          {searchdone2 === true && (
                            <>
                              {" "}
                              <div className="clearsearch">
                                <h3>search: {searchTerm2}</h3>{" "}
                                <button onClick={clearsearch2}>
                                  <AiOutlineClose /> Clear
                                </button>{" "}
                              </div>
                            </>
                          )}
                        </div>

                        <div className={`userbox`}>
                          {practitioner2.map((item, index) => (
                            <div
                            key={item._id}
                              onClick={() => {setpractitionerid(item._id);
                                setClickedId(item._id); // Set the user box click state to true
                                console.log("helo");
                              }}
                              className={`userboxxinside ${clickedId === item._id ? 'clicked' : ''}`}
                            >
                              <img
                              style={{marginLeft: '7px',marginRight:"2px"}}
                                alt="profile"
                                // src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMOEhIOEBMQDg8QDQ0PDg4ODQ8PEA8NFREWFhUSFhUYHCggGCYlGxMTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKDQ0NDw0NDysZFRktLS0rKystLSsrKysrNy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIFBgQDB//EADMQAQACAAMGBAUEAQUBAAAAAAABAgMEEQUhMTJBURJhcXIigZGhsRNCgsFSM2KS0fAj/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AP1sEVFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAZAAiKgAAAAAAAAAAAAAAAAAAAAAAAAAAMgARFQAAAAAAAAAAAY4mJWvNMV9ZeW208KP3a+lZkHsHijauF3mPWkvRhZml+W1Z8tdJB9QkAAAAAAAAAABkACIqAAAAAAAAl7RWJtM6REazPaAS94rGtp0iOMzwafN7Xm27D+GP8p5p9OzzZ/Oziz2pE/DXy7y8qot7TO+ZmZ7zOqCAAA9uU2lfD3T8desW4/KW7yuarixrWfWsxviXMM8DGthz4qzpP2n1B1Q+GUzMYtfFG6eFq9Yl90UAAAAAAABkACIqAAAAAAANPtvM7/0o6aTf16Q297xWJtPCsTMuUxLzaZtPG0zM+pCsQFQAAAAAB6tn5n9K8TPLOkXjy7uk/8AauRdFsrG8eHGu+afDP8ASUj2ACgAAAAAMgARFQAAAAAAHk2rfTCt56R9Zc4323P9OPfX+2hVKAAAAAAAAra7BvvvXvES1LZbD559k/mCkbwBFAAAAAAZAAiKgAAAAAAPDtiuuFPlasufdXj4Xjran+VZj5uV07/OFiVAAAAAAAAVs9g1+K09qxH3axvdi4Phw/F1vOvyKRsAEUAAAAABkACIqAAAAAAANDtjL+C/jjlvv/l1hvnzzOBGJWaz14TpwnuDlR9Mxgzh2mlo0mPvHeHzVAAAAAF0+fl59gfTL4M4lopHGZ3+UdZdRSsViKxuiIiIePZmS/SjW3PaN/lHZ7UqwAAAAAAABkACIqAAAAAAAAA+GaytcWNJ6cto4w0ObyV8KfiiZr0vEbph0ppru6duijkR0GY2bhzvn/5+loiPpLxYmzKxwxafy01+0mpjWLDYV2bXrjYfymP7l68HZWHxm3j8vFGn2NMafBwZvOlYm0+XTzlvNn7OjC+K3xX+1XsphxWNKx4Y7RGjIUAQAAAAAAAAZAAiKgAAAAAwxMSKx4rTERHWWqze1+mHGn++0b/lANtiYlaRraYrHeZ01eDH2xSOWJt9oaXExJtOtpm095nVguJr34u1sSeGlI8o1n6y8uJmb25r2n+U/h8gDTvvAA0NAB9KYtq8trR6Wl6cLamJHXxe6N/1eIMG6wdsxO69ZjzrvhsMHMVxOS0T5a7/AKOVZRbTfEzExwmN0mGusGjym1rV3X+OO/C0NxgY9cSNaTE+XCY9UxX0AAAAABkACIqAAAPNnM5XBjWd9v21jjP/AEZ7Nxg11nfaeWPPu53FxZtM2tOszxkK+mazNsWdbTr2r+2IfBUVAAAAAAAAAAAAFZYWLNJ8VZms+XX1YAOgyG0YxfhtpW/bpb0e5yVZ68J6THGG+2Znv1I8FueI/wLUdwe8BFAAZAAiKgDHEtFYm08IjWWTVbcx9IjDjr8U+gNZmsxOJabT8o7Q+KoqAAAAAAAAAAAAAAAADOmJNZi0bpid0+bAB0+UzEYtYtHHhaO1ur7tFsXH8N/BPC/D3Q3qKAAyABEVAHObTxfHi3npExWPSHRw5XMc1vdb8rEr5igIKAgoCCgIKAgoCCgIKAgoCCijLDt4Zi3aYn7uqidd/eNfq5KXUZXkp7K/hKR9gEVkACIqAOWzPNb3W/LqXLZnnt7rflYlfIAAAAAAAAAAAAAAAAAAAB1GU5Keyv4cu6jKclPZX8FI+wCKyAAAAcpmee3ut+QWJXyAAAAAAAAAAAAAAAAAAABXU5Pkp7IApH2ARQAH/9k="
                                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiwCZVWgRhO3dJTI2i0SIhW0XSgN0vYILtFQ&s"
                                src="/profile2.png"
                                // src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LTNkc29saWQtcG8tMDI5LnBuZw.png"
                                // width={"90%"}
                              />

                              <div>
                                <h5>Name: {item.name}</h5>
                                <h6 style={{margin:"0px",fontSize:"11px"}}>email: {item.email}</h6>
                                <h6 style={{margin:"0px"}}>Address:{item.address}</h6>
                                <h6 style={{margin:"0px"}}>phone:{item.phone}</h6>
                                {/* <h5></h5> */}
                                {/* <h5></h5> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {popup2 === "kitdetails" && (
                      <>
                        <div className="header">
                          <h2>Kits Details</h2>
                        </div>
                        <div className="kitdetailsmain">
                          <div className="kitdetails">
                            <h3
                              style={{
                                display: "flex",
                                color: "#4180b7",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              <GiFirstAidKit
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  margin: "0 10px",
                                }}
                              />{" "}
                              KIT ID
                            </h3>
                            <h3
                              style={{
                                display: "flex",
                                color: "#6E4E9F",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              {kitdetails.kitid}{" "}
                            </h3>
                          </div>

                          <div className="kitdetails">
                            <h3
                              style={{
                                display: "flex",
                                color: "#4180b7",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              <FaUser
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  margin: "0 10px",
                                }}
                              />{" "}
                              Practitioner Name
                            </h3>
                            <h3
                              style={{
                                display: "flex",
                                color: "#6E4E9F",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              {findpracname()}{" "}
                              {token ===
                                "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
                                <>
                                  {" "}
                                  <MdEditSquare
                                    className="hovar"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      margin: "0 10px",
                                    }}
                                    onClick={() => {
                                      setpopup(true);
                                      setpopup2("assigeto");
                                      setkitid(kitdetails.kitid);
                                      setkitiddb(kitdetails._id);
                                    }}
                                  />
                                </>
                              )}
                            </h3>
                          </div>

                          <div className="kitdetails">
                            <h3
                              style={{
                                display: "flex",
                                color: "#4180b7",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              <MdAttachEmail
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  margin: "0 10px",
                                }}
                              />{" "}
                              Practitioner Email
                            </h3>
                            <h3
                              style={{
                                display: "flex",
                                color: "#6E4E9F",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              {findpracemail()}{" "}
                            </h3>
                          </div>

                          <div className="kitdetails">
                            <h3
                              style={{
                                display: "flex",
                                color: "#4180b7",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              <MdOutlinePendingActions
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  margin: "0 10px",
                                }}
                              />{" "}
                              Status
                            </h3>
                            <h3
                              style={{
                                display: "flex",
                                color: "#6E4E9F",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              {Kitsstaus()}
                              {kitdetails.assignedto ? (
                                <>
                                  {Kitsstaus() !==
                                  "Kit Not received in lab yet." ? (
                                    <>
                                      {token ===
                                        "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
                                        <>
                                          <Dropdown
                                            menu={{
                                              items:
                                                Kitsstaus() ===
                                                "Results Published"
                                                  ? itemsstatus2
                                                  : itemsstatus1,
                                            }}
                                            placement="bottomRight"
                                            arrow
                                          >
                                            <IoIosArrowDropdown
                                              className="hovar"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                                margin: "0 10px",
                                              }}
                                            />
                                          </Dropdown>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </h3>
                          </div>


                          <div className="kitdetails">
                            <h3
                              style={{
                                display: "flex",
                                color: "#4180b7",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              <TbGitBranchDeleted
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  margin: "0 10px",
                                }}
                              />{" "}
                              Action{" "}
                            </h3>
                            <h3
                              onClick={async () => {
                                const hide = message.loading(
                                  "Action in progress",
                                  0
                                );
                                var myHeaders = new Headers();
                                myHeaders.append(
                                  "Content-Type",
                                  "application/x-www-form-urlencoded"
                                );

                                var urlencoded = new URLSearchParams();
                                urlencoded.append("_id", kitdetails._id);

                                var requestOptions = {
                                  method: "POST",
                                  headers: myHeaders,
                                  body: urlencoded,
                                  redirect: "follow",
                                };

                                if (
                                  token ===
                                  "dskgfsdgfkgsdfkjg35464154845674987dsf@53"
                                ) {
                                  await fetch(
                                    `${process.env.REACT_APP_API_URL}/dltkits`,
                                    requestOptions
                                  )
                                    .then((response) => response.json())
                                    .then((result) => {
                                      setkit(result);
                                      setpopup(false);
                                      setaddkit2("");
                                    })
                                    .catch((error) =>
                                      console.log("error", error)
                                    );
                                } else if (
                                  token ===
                                  "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg"
                                ) {
                                  await fetch(
                                    `${process.env.REACT_APP_API_URL}/dltkits`,
                                    requestOptions
                                  ).catch((error) =>
                                    console.log("error", error)
                                  );

                                  var urlencoded2 = new URLSearchParams();
                                  urlencoded2.append("id", id);

                                  var requestOptions2 = {
                                    method: "POST",
                                    headers: myHeaders,
                                    body: urlencoded2,
                                    redirect: "follow",
                                  };

                                  await fetch(
                                    `${process.env.REACT_APP_API_URL}/profileKitsinfo`,
                                    requestOptions2
                                  )
                                    .then((response) => response.json())
                                    .then((result) => {
                                      setkit(result);
                                      setpopup(false);
                                      setaddkit2("");
                                    })
                                    .catch((error) =>
                                      console.log("error", error)
                                    );
                                }

                                await setTimeout(() => {
                                  hide(); // Call hide to stop the loading message
                                  message.success(
                                    "Action completed successfully"
                                  );
                                }, 2000);
                              }}
                              className="hovar"
                              style={{
                                display: "flex",
                                color: "red",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              Detele This Kit{" "}
                              <AiFillDelete
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  margin: "0 10px",
                                }}
                              />
                            </h3>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="bownpopupbutton">
                      <button
                        onClick={() => {
                          setpopup(false);
                          setaddkit([]);
                          setaddkit2("");
                        }}
                        style={{ border: "1px solid red", color: "black" }}
                      >
                        cancel
                      </button>

                      {popup2 === "addkit" && (
                        <>
                          <button
                            onClick={sendnewkittobackend}
                            style={{ backgroundColor: "#4180b7" }}
                          >
                            Submit
                          </button>
                        </>
                      )}

                      {popup2 === "assigeto" && (
                        <>
                          <button
                            onClick={assignkittopra}
                            style={{ backgroundColor: "#4180b7" }}
                          >
                            Assign
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}

         

              {kit.length !== 0 && (
                <>
                  {/* <h3 style={{color:"#4d4b4b"}}>Food Sensitivity</h3> */}
                  <div className="imp">
                    <table className="tablep" style={{ marginTop: "0px" }}>
                      <thead className="tablephead">
                        <tr>
                          <th>S NO.</th>
                          <th>Kit ID</th>
                          {token ===
                            "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
                            <>
                              {" "}
                              <th>Assigned to</th>
                            </>
                          )}

                          {/* <th>Type</th> */}
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                          {/* {console.log(kit)} */}
                      





{Array.isArray(kit) && (kit || []).map((item, index) => (
  <tr key={index}>
    <td>{sno2++}</td>
    <td>{item.kitid}</td>

    {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
      <td style={{ display: "flex", justifyContent:"center" }}>
        {item.assignedto ? (
          practitioner.map((item2, index) => (
            item2._id === item.assignedto && (
              <React.Fragment key={item2._id}>
                <td style={{ border: "none", width: "30%" }}>{item2.name}</td>
                <td style={{ border: "none", width: "70%" }}>{item2.email}</td>
              </React.Fragment>
            )
          ))
        ) : (
          <td
            className="hovar"
            style={{
              // color: "#4180B7",
              border:"none",
              width:"100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setpopup(true);
              setpopup2("assigeto");
              setkitid(item.kitid);
              setkitiddb(item._id);

              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

              var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
              };

              fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
                .then((response) => response.json())
                .then((result) => setpractitioner(result));
            }}
          >
            <MdAssignmentReturn
              style={{
                width: "30px",
                height: "30px",
                // color: "#4180B7",
              }}
            />
            <h4> Assign</h4>
          </td>
        )}
      </td>
    )}

    {!item.assignedto ? (
      item.result.length === 0 ? (
        <td>Kits Created</td>
      ) : null
    ) : (
      <>
        {item.result.length !== 0 && (
          <td>
            <a
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "#6E4E9F",
              }}
              href={(() => {
                const myPractitioner = practitioner.find(
                  (practitioners) => practitioners._id === item.assignedto
                );

                const baseUrl =
                  item.kitid.includes("SL")
                    ? urlSupply
                    : myPractitioner?.reportType
                    ? myPractitioner.reportType
                    : urlTest;

                return baseUrl + item._id;
              })()}
            >
              View result
            </a>
          </td>
        )}

        {item.result.length === 0 && <td>Results Pending</td>}
      </>
    )}

    <td>
      <button
        className="button"
        onClick={() => {
          setpopup(true);
          setpopup2("kitdetails");
          setkitdetails(item);
        }}
      >
        Details
      </button>
    </td>
  </tr>
),
)}


                      </tbody>
                    </table>
                  </div>
                </>
              )}
              <div style={{ margin: "50px" }}></div>
              {kit.length === 0 && (
                <>
                  <img alt="" src="/empty.gif" width={"40%"} />
                </>
              )}
            </div>
          </div>
        </>
      )}{" "}
    </>
  );
}

export default Fskits;
