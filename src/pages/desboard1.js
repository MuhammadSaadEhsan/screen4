import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar';
import Sidemanu from '../components/sidemanu';
import "../css/deshboard.css"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Label, LabelList, Cell } from "recharts"
import Cookies from 'js-cookie';
import { AiFillDelete, AiOutlineClose } from "react-icons/ai"
import { loadStripe } from '@stripe/stripe-js';

import { AutoComplete, message, Button, Divider, InputNumber, notification, Space, Switch } from 'antd';


function Desboard() {


  const loginname = Cookies.get("Name")
  const id = Cookies.get("id")
  const token = Cookies.get("Token")
  const loginemail = Cookies.get("email")
  const [kit, setkit] = useState([])
  const [practitioner, setpractitioner] = useState([])
  const [practitioner2, setpractitioner2] = useState([])
  const [ackKit, setackKit] = useState([])
  const [notificationn, setnotification] = useState([])

  const totalKits = kit.length;
  const assignedKits = kit.filter(item => item.assignedto && item.assignedto.length > 0).length;
  const notassignedKits = kit.filter(item => !item.assignedto || item.assignedto.length === 0).length;
  // const painKits = kit.filter(item => item.Kitprice === "fdgbhjbdgfhjdfgsbf").length;



  const resulKits = kit.filter(item => item.result && item.result.length > 0).length;
  const notresultKits = kit.filter(item => !item.result || item.result.length === 0).length;

  // const notassignedKits = kit.filter((item) => item.assignedto.length === 0).length;
  // const kitsWithResults = kit.filter((item) => item.result.length > 0).length;
  // const kitsWithoutResults = kit.filter((item) => item.result.length === 0).length;




  var rangeDataadmin2 = []



  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(3);
  const [api, contextHolder] = notification.useNotification({
    stack: enabled
      ? {
        threshold,
      }
      : false,
  });
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



        result.forEach(value => {
          if (!value.status) {
            const key = `${value._id}`;
            const btn = (
              <Space>

                <Button type="primary" size="small" onClick={() => {
                  api.destroy(key)
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
                    .then(response => response.text())
                    .then(result => console.log(""))



                }}>
                  Mark as Read
                </Button>
              </Space>
            );
            api.open({
              message: value.title,
              description: value.contant,
              btn,
              key,
              duration: null,

            });
          }

        });
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Handle error (e.g., show error notification)
    }
  };



  useEffect(() => {
    openNotification()


  }, [])





  function kitpracbarchart() {

    practitioner
      .map((item) => {
        return { name: item.name, Value: item.assignedkits.length };
      })
      .sort((a, b) => b.Value - a.Value) // Sort in descending order based on 'Value'
      .slice(0, 10) // Take the top 10 practitioners
      .forEach((practitioner) => {
        rangeDataadmin2.push(practitioner);
      });




  }



  function countPrac() {

  };


  useEffect(() => {



    if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



      var requestOptions = {
        method: 'GET',
        headers: myHeaders,

        redirect: 'follow'
      };
      fetch(`${process.env.REACT_APP_API_URL}/getallnotification`, requestOptions)
        .then(response => response.json())
        .then(result => setnotification(result))


      fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setpractitioner(result)
          setpractitioner2(result)
        })


  



      var myHeaders2 = new Headers();
      myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");



      var requestOptions2 = {
        method: 'GET',
        headers: myHeaders2,

        redirect: 'follow'
      };

      fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
        .then(response => response.json())
        .then(result => setkit(result))


      // fetch(`${process.env.REACT_APP_API_URL}/getallemaidata`, requestOptions2)
      //   .then(response => response.json())
      //   .then(result => setackKit(result))

      kitpracbarchart()
      countPrac();

    } else if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {

      var urlencoded2 = new URLSearchParams();
      urlencoded2.append("id", id);

      var requestOptions2 = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded2,
        redirect: 'follow'
      };


      fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfo`, requestOptions2)
        .then(response => response.json())
        .then(result => setkit(result))
        .catch(error => console.log('error', error));




    }






  }, [])





  const rangeDataadmin =
    [
      { name: 'Total Kits', Value: totalKits },
      { name: 'Assigned Kits', Value: assignedKits },
      { name: 'Not Assigned yet', Value: notassignedKits },
      { name: 'Results', Value: resulKits },
      { name: 'Pending Results', Value: notresultKits },
      // { name: 'Paid Kits', Value: painKits }



    ]











  const rangeData =
    [
      { name: 'Total Kits', Value: totalKits },
      { name: 'Results', Value: resulKits },
      { name: 'Pendding Results', Value: notresultKits },
      // { name: 'Paid Kits', Value: painKits }



    ]

  const rangeData2 =
    [

      { name: 'Results', Value: resulKits },
      { name: 'Pending Results', Value: notresultKits },



    ]
  var match = false

  var fs = 0
  const [mb, setmb] = useState(0)
  var dm = 0
  var pt = 0
  const countkits = () => {

    kit.map((value) => {
      // if (value.Kittype === "210" || value.Kittype === "100") {
        fs = fs + 1
      // }

      // if (value.Kittype === "mb") {
      //   mb = mb + 1
      // }

      // if (value.Kittype === "dm") {
      //   dm = dm + 1
      // }
      // if (value.Kittype === "pt") {
      //   pt = pt + 1
      // }



    })


  }



  const [rangeDataadminn, setrangeDataadminn] = useState([
    { name: 'jan', Value: 0 },
    { name: 'feb', Value: 0 },
    { name: 'mar', Value: 0 },
    { name: 'apr', Value: 0 },
    { name: 'may', Value: 0 },
    { name: 'jun', Value: 0 },
    { name: 'jul', Value: 0 },
    { name: 'aug', Value: 0 },
    { name: 'sep', Value: 0 },
    { name: 'oct', Value: 0 },
    { name: 'nov', Value: 0 },
    { name: 'dec', Value: 0 }
  ]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const newCounts = {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0
    };

    practitioner.forEach((value) => {
      const timestamp = value.timestamp;
      const [year, month] = timestamp.slice(0, 7).split('-');

      if (currentYear.toString() === year) {
        switch (month) {
          case "01":
            newCounts.jan += 1;
            break;
          case "02":
            newCounts.feb += 1;
            break;
          case "03":
            newCounts.mar += 1;
            break;
          case "04":
            newCounts.apr += 1;
            break;
          case "05":
            newCounts.may += 1;
            break;
          case "06":
            newCounts.jun += 1;
            break;
          case "07":
            newCounts.jul += 1;
            break;
          case "08":
            newCounts.aug += 1;
            break;
          case "09":
            newCounts.sep += 1;
            break;
          case "10":
            newCounts.oct += 1;
            break;
          case "11":
            newCounts.nov += 1;
            break;
          case "12":
            newCounts.dec += 1;
            break;
          default:
            break;
        }
      }
    });

    setrangeDataadminn([
      { name: 'jan', Value: newCounts.jan },
      { name: 'feb', Value: newCounts.feb },
      { name: 'mar', Value: newCounts.mar },
      { name: 'apr', Value: newCounts.apr },
      { name: 'may', Value: newCounts.may },
      { name: 'jun', Value: newCounts.jun },
      { name: 'jul', Value: newCounts.jul },
      { name: 'aug', Value: newCounts.aug },
      { name: 'sep', Value: newCounts.sep },
      { name: 'oct', Value: newCounts.oct },
      { name: 'nov', Value: newCounts.nov },
      { name: 'dec', Value: newCounts.dec }
    ]);

  }, [practitioner]);


  // useEffect(() => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };
  //   fetch(`${process.env.REACT_APP_API_URL}/testingss`, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       setmb(result.meta.total)
  //     })
  // }, [])
  const currentYear = new Date().getFullYear();
  const [searchTerm, setSearchTerm] = useState('');
  var options = [];
  const dooption = () => {
    practitioner2.map((value, index) => {
      // options = [
      //   { value: 'Burns Bay Road' },

      // ];
      // const newvalue = toString(value.kitid)
      if (kit.assignedKits && kit.assignedkits.length === 0) {
        options.push({ value: value.name })
        options.push({ value: value.email })
      }
    })
  }
  var sno1 = 1
  var sno2 = 1
  var sno3 = 1
  const handleInputChange = (e) => {
    e.preventDefault()
    const intttt = (searchTerm)
    // Filter the Kit array based on the user's input
    const filteredSuggestions = practitioner.filter((item) =>
      item.name.toLowerCase().includes(intttt.toLowerCase()) || item.email.toLowerCase().includes(intttt.toLowerCase())
    );
    setpractitioner2(filteredSuggestions)
    setsearchdone(true)
  };
  const [searchdone, setsearchdone] = useState(false)

  const clearsearch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const hide = message.loading("Action in progress", 0)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
      .then(response => response.json())
      .then(result => setpractitioner2(result))


    var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");



    var requestOptions2 = {
      method: 'GET',
      headers: myHeaders2,

      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
      .then(response => response.json())
      .then(result => setkit(result))


    setsearchdone(false)
    setTimeout(() => {
      hide(); // Call hide to stop the loading message
      message.success("Action completed successfully");
    }, 2000);
  }


  // const colors = ['#6F4FA0', '#4381B8']; // Define an array of colors
  const colors = ['#4d4b4b', '#19b0e6']; // Define an array of colors

  return (<>
    {contextHolder}
    {(token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" || token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") && <>

      <Navbar />

      <div className='deshboardmain' style={{backgroundColor:"#19b0e6"}}>
        <Sidemanu />

        <div className='mainbody' >

          <div style={{ width: '100%', height: "400px" }}>
            {/* <h2 style={{colors:"#4d4b4b"}}>Kits </h2> */}
            {countkits()}
            <div className='kitscouts' style={{ display:"flex", justifyContent:"center"}}>
              <div className='boxxxx' style={{width:'100%', backgroundColor:"#4d4b4b", padding:"12px"}}><h3>Total Food Sensitivity Kits  <br /> {fs}</h3></div>
              {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>      <div className='boxxxx bbbbg'><h5>Total Microbiome Kits  <br /> {mb}</h5></div></>} */}
              {/* <div className='boxxxx'><h5>Total DNAMap Kits  <br /> {dm}</h5></div> */}
              {/* <div className='boxxxx bbbbg'><h5>Total Parasitology Test Kits  <br /> {pt}</h5></div> */}
            </div>

            {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>  <ResponsiveContainer >
              <BarChart width={500} height={250} data={rangeDataadmin} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Value" fill="#19b0e6" radius={10} barSize={70}/>
              </BarChart>
            </ResponsiveContainer>
           
            </>}

            {token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg" && <>   <ResponsiveContainer >
              <BarChart width={500} height={250} data={rangeData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Value" fill="#19b0e6" radius={10} />
              </BarChart>
            </ResponsiveContainer>
            
           
            </>}

          </div>


          {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
            <div className='piechars'>


              <div className='div1' style={{ height: '400px' }} >
                <h2>Kit's Results</h2>
                <ResponsiveContainer>
                  <PieChart width={500} height={600}>
                    <Pie
                      data={rangeData2}
                      dataKey="Value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      labelLine="name"
                      label="name"
                    >
                      {rangeData2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                      <LabelList dataKey="name" position="inside" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>


              <div className='div1'  >

                <h2> Practitioners who have never purchased a test</h2>

                <div className='header' style={{ marginBottom: '10px' }}>
                  <h1 className='pppheading'> </h1>
                  {dooption()}

                  {searchdone === false && <>
                    <form onSubmit={handleInputChange}>
                      <AutoComplete
                        type="number"
                        style={{ width: 200 }}
                        options={options}
                        placeholder="Search by Email/Name"
                        filterOption={(inputValue, options) =>
                          options.value.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          //  console.log(kitss) 
                        }
                        onChange={(inputValue) => setSearchTerm(inputValue)}
                      />
                      <button style={{backgroundColor:"#19b0e6"}}>Search</button>
                    </form>

                  </>}
                  {searchdone === true && <>     <div className='clearsearch'  ><h3>search: {searchTerm}</h3> <button onClick={clearsearch}><AiOutlineClose /> Clear</button>  </div>
                  </>}
                </div>
                <div className='imp'>
                  <table className='tablep'>
                    <thead className='tablephead'>
                      <tr>
                        <th>S NO.</th>
                        <th>Name</th>
                        <th>email</th>



                      </tr>
                    </thead>
                    <tbody>

                      {practitioner2.map((kit, index) => (<>
                        {(!kit.assignedKits && kit.assignedkits.length === 0   && (!kit.mbkits || kit.mbkits === "0")) && <>
                          <tr>
                            <td>{sno1++}</td>
                            <td>{kit.name} </td>
                            <td>{kit.email} </td>
                           
                          </tr></>}
                      </>))}



                    </tbody>
                  </table>


                </div>




              </div>



            </div>





            <div style={{ width: '100%', height: "400px", marginTop: '100px' }}>
              <h2>Practitioners Sign Up in the Year {currentYear} </h2>

              {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>  <ResponsiveContainer >
                <BarChart width={500} height={250} data={rangeDataadminn} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Value" fill="#19b0e6" radius={10} />
                </BarChart>
              </ResponsiveContainer></>}



            </div>

          </>}






          {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
            <div>

              <div className='header' style={{color:"#4d4b4b", marginTop: "100px" }}><h3>List of Practitioners Who Have Not Bought a Kit in the Last 6 Months</h3></div>
              <div className='imp'>
                <table className='tablep'>
                  <thead className='tablephead'>
                    <tr>
                      <th>S NO.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Assigned Kits</th>
                      {/* <th>Payment Method</th>
                      <th></th> */}



                    </tr>
                  </thead>
                  <tbody>

                    {practitioner.map((item, index) => {

                      var show = false
                      if (!item.assignedKits && item.assignedkits.length > 0) {





                        kit.map((value2, index) => {

                          item.assignedkits.map((value3) => {

                            if (value3 === value2._id) {


                              const today = new Date();
                              const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6);

                              // Get the year and month
                              const year = sixMonthsAgo.getFullYear();
                              const month = String(sixMonthsAgo.getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it's zero-indexed

                              // Format the date in "yyyy-mm" format
                              const formattedDate = `${year}-${month}`;

                              const date = formattedDate.split('-');
                              const timestamp = value2.timestamp

                              // // Extract year and month from timestamp
                              const timestampYearMonth = timestamp.slice(0, 7).split('-');


                              const formattedDateString = formattedDate.replace('-', '');
                              const timestampYearMonthString = timestamp.slice(0, 7).replace('-', '');

                              if (formattedDateString < timestampYearMonthString) {
                                show = true;
                              }
                            }
                          })


                        })

                      } else {
                        show = true
                      }


                      return (<>


                        {show === false && <>
                          <tr>
                            <td>{sno2++}</td>
                            <td>{item.name} </td>
                            <td>{item.email}</td>
                            <td>{item.assignedkits.length}</td>


                            {/* {item.CardID === "nocardneeded" && <>
                          <td>Consignment</td>
                        </>}


                        {item.CardID === "nocardneeded" && <>
                          <td><a href='/' onClick={(e) => {

                            e.preventDefault()


                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                            var urlencoded = new URLSearchParams();
                            urlencoded.append("_id", item._id);

                            var requestOptions = {
                              method: 'POST',
                              headers: myHeaders,
                              body: urlencoded,
                              redirect: 'follow'
                            };

                            fetch("${process.env.REACT_APP_API_URL}/asktoaddcard", requestOptions)
                              .then(response => response.json())
                              .then(result => setpractitioner(result))
                              .catch(error => console.log('error', error));





                          }} >Ask to Add Card</a></td>
                        </>}

                        {(item.CardID && item.CardID.length !== 0 && item.CardID !== "nocardneeded") && <>
                          <td>Card Added</td>
                        </>}

                        {!item.CardID && <>
                          <td>Card not Added yet</td>
                        </>} */}





                          </tr>
                        </>}

                      </>)
                    })}







                  </tbody>
                </table>



              </div>
            </div>


          </>}








          {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
            <div style={{ width: '100%', height: "500px", marginTop: '50px' }} >
              {kitpracbarchart("54")}
              <h2 style={{ color: '#4d4b4b' }}>Top Practitioners By Kits </h2><h2 style={{ color: '#19b0e6' }}>All Time</h2>
              <ResponsiveContainer >
                <BarChart width={730} height={250} data={rangeDataadmin2} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Value" fill="#19b0e6" radius={10} />
                </BarChart>
              </ResponsiveContainer>

            </div>
          </>}



{/* 
          {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
            <div className='header' style={{color:"#4d4b4b", marginTop: "100px" }}><h3>Sample received in Lab by saad ehsan</h3></div>

            <div className="imp">
              <table className='tablep' border={"1"}>
                <thead className='tablephead'>
                  <tr>
                    <th>S NO.</th>
                    <th>Date/Time</th>
                    <th>Patient Name</th>
                    <th>Kit ID</th>
                    <th>Acknowledgment</th>


                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {ackKit.map((item, index) => {
                    var kitinfo = []
                    var match = false
                    kit.map((value) => {

                      if (item.KitId === value.kitid) {
                        kitinfo = value
                        match = true
                      }
                    })




                    return (<>







                      <tr>
                        <td>{sno3++}</td>
                        <td>{item.timestamp}</td>
                        <td>{item.Name} </td>
                        <td>{item.KitId}</td>





                        {match ? (<>


                          {kitinfo.ack ? (<><td>Already Acknowleded</td></>) : (<>
                            <td> <button style={{backgroundColor:"#19b0e6"}} className='button' onClick={async () => {
                              const hide = message.loading("Action in progress", 0)
                              var myHeaders = new Headers();
                              myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                              var urlencoded = new URLSearchParams();
                              urlencoded.append("kitID", item.KitId);
                              urlencoded.append("patientName", item.Name);
                              urlencoded.append("_id", item._id);

                              var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: urlencoded,
                                redirect: 'follow'
                              };

                              const resp = await fetch(`${process.env.REACT_APP_API_URL}/ackemail`, requestOptions)
                                .then(response => response.json())

                                .catch(error => console.log('error', error));


                              window.location.reload();
                              await setackKit(resp)


                              setTimeout(() => {
                                hide(); // Call hide to stop the loading message
                                message.success("Action completed successfully");
                              }, 2000);

                            }} > Sample Receipt Email </button></td>


                          </>)}


                        </>) : (<><td style={{ color: 'red' }}>Kit is not in our Database</td></>)}





                        <td className='assignbuttom' ><AiFillDelete className='hovar' style={{ width: '30px', height: '30px', color: 'red' }}
                          onClick={() => {
                            const hide = message.loading("Action in progress", 0)
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                            var urlencoded = new URLSearchParams();
                            urlencoded.append("_id", item._id);

                            var requestOptions = {
                              method: 'POST',
                              headers: myHeaders,
                              body: urlencoded,
                              redirect: 'follow'
                            };

                            fetch(`${process.env.REACT_APP_API_URL}/deleteemaidata`, requestOptions)
                              .then(response => response.json())
                              .then(result => setackKit(result))
                              .catch(error => console.log('error', error));




                            setTimeout(() => {
                              hide(); // Call hide to stop the loading message
                              message.success("Action completed successfully");
                            }, 2000);
                          }}


                        /></td>
                      </tr>

                    </>)
                  })}







                </tbody>
              </table>
            </div>
          </>} */}


<div className="" style={{height:"100px",width:"100%"}}></div>




        </div>


      </div>
    </>} </>)
}

export default Desboard