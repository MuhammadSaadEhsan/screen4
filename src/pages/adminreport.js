// import React, { useState, useRef, useEffect } from 'react'
// import Navbar from '../components/navbar';
// import "../css/adminreport.css"
// import Sidemanu from '../components/sidemanu';
// import "../css/adminkit.css"
// import { ImUpload2, ImUserTie } from "react-icons/im"
// import { BsCalendar2DateFill, BsCloudDownload } from "react-icons/bs"
// import { AiFillDelete, AiOutlineClose, AiOutlineInteraction } from "react-icons/ai"
// // import Papa from 'papaparse';
// import { AutoComplete, Dropdown, message } from 'antd';
// import { CSVLink } from 'react-csv';
// import { FaDownload, FaRegUser } from "react-icons/fa"
// import html2pdf from 'html2pdf.js';
// import Cookies from 'js-cookie';
// import { AiOutlineMail } from "react-icons/ai"
// import { GiFirstAidKit } from 'react-icons/gi';
// import { IoIosArrowDropdown } from 'react-icons/io';
// import { MdOutlinePendingActions, MdOutlineUpdate, MdOutlineViewDay } from 'react-icons/md';
// import { TbUserShare } from 'react-icons/tb';
// import Papa from 'papaparse';

// function Adminreport() {

//   const loginemail = Cookies.get("email")
//   const loginname = Cookies.get("Name")
//   const id = Cookies.get("id")
//   const token = Cookies.get("Token")

//   const [popup, setpopup] = useState(false)

//   const fileInputRef = useRef(null);

//   const [csvFile, setCSVFile] = useState(null);
//   const [csvData, setCsvData] = useState([]);
//   const [kit, setkit] = useState([])
//   const [practitioner, setpractitioner] = useState([])

//   const [kit2, setkit2] = useState([]);

//   const [Result2, setResult2] = useState([]);
//   const [Result222, setResult222] = useState([]);

//   const sortkits = () => {
//     if (kit.length !== 0) {
//       const sortedKits = [...kit].sort((a, b) => {
//         // Check if resultDate is available for both items
//         if (a.resultDate && b.resultDate) {
//           const dateA = new Date(a.resultDate.split('/').reverse().join('-'));
//           const dateB = new Date(b.resultDate.split('/').reverse().join('-'));
//           return dateB - dateA;
//         }

//         // Handle cases where resultDate might be missing
//         if (!a.resultDate) return 1; // Place a at the end if it has no resultDate
//         if (!b.resultDate) return -1; // Place b at the end if it has no resultDate

//         return 0; // If both are missing resultDate, consider them equal
//       });

//       setkit(sortedKits);
//     }
//   }

//   useEffect(() => {
//     sortkits()
//   }, [kit])

//   // const downloadCSV = (data) => {
//   //   const csv = Papa.unparse(data);  // Convert JSON data to CSV

//   //   // Create a temporary link element to trigger the download
//   //   const link = document.createElement('a');
//   //   link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
//   //   link.target = '_blank';
//   //   link.download = `${userinfo.patientName}_report.csv`;  // Specify file name

//   //   // Trigger the download by clicking the link
//   //   document.body.appendChild(link);
//   //   link.click();
//   //   document.body.removeChild(link);
//   // };

//   const getName = (key) => {
//     const data = {
//         "GD1": "GD1",
//         "GD2": "GD2",
//         "GD3": "GD3",
//         "Ach d": "House cricket",
//         "Aci spp.": "Caviar",
//         "Act d": "Kiwi",
//         "Ada d": "Baobab",
//         "Aga": "Agar Agar",
//         "Aga b": "White mushroom",
//         "All a": "Shallot",
//         "All c": "Onion",
//         "All p": "Leek",
//         "All s": "Garlic",
//         "All sc": "Chives",
//         "All u": "Wild garlic",
//         "Alo v": "Aloe",
//         "Ama t": "Amaranth",
//         "Ame a": "Tea, black",
//         "Ana c": "Pineapple",
//         "Ana o": "Cashew",
//         "Ana p": "Duck",
//         "Ane g": "Dill",
//         "Ang a": "Eel",
//         "Api g": "Celery Bulb",
//         "Api g_stalk": "Celery Stalk",
//         "Api m_honey": "Honey",
//         "Ara h": "Peanut",
//         "Arc l": "Greater burdock root",
//         "Arm r": "Horseradish",
//         "Aro spp.": "Aronia",
//         "Art d": "Tarragon",
//         "Asp n": "Aspergillus niger",
//         "Asp o": "White asparagus",
//         "Ast a": "Noble crayfish",
//         "Ave s": "Oat",
//         "Bam v": "Bamboo sprouts",
//         "Ber e": "Brazil nut",
//         "Bet vu": "Chard",
//         "Bet vul": "Red beet",
//         "Bol e": "Boletus",
//         "Bos d 4": "Cow's milk Bos d 4 * (Alpha-Lactalbumin)",
//         "Bos d 5": "Cow's milk Bos d 5 * (Beta-Lactoglobulin)",
//         "Bos d 8": "Cow's milk Bos d 8 * (Casein)",
//         "Bos d_but": "Buttermilk",
//         "Bos d_Ca": "Camembert",
//         "Bos d_Em": "Emmental",
//         "Bos d_Go": "Gouda",
//         "Bos d_Hue": "Cottage cheese",
//         "Bos d_meat": "Beef",
//         "Bos d_milk": "Cow's milk",
//         "Bos d_Mo": "Mozzarella",
//         "Bos d_Pa": "Parmesan",
//         "Bos d_veal_meat": "Veal",
//         "Bra n": "Rapeseed",
//         "Bra o": "Cabbage",
//         "Bra o_bot": "Cauliflower",
//         "Bra o_cap": "White cabbage",
//         "Bra o_gem": "Brussels sprouts",
//         "Bra o_gon": "Kohlrabi",
//         "Bra o_ita": "Broccoli",
//         "Bra o_rom": "Romanesco",
//         "Bra o_rub": "Red cabbage",
//         "Bra o_sab": "Green cabbage",
//         "Bra o_saba": "Savoy",
//         "Bra r": "Turnip",
//         "Bra ra_chi": "Pok-Choi",
//         "Bra ra_pek": "Chinese cabbage",
//         "Bub b_milk": "Buffalo milk",
//         "Cam d": "Camel milk",
//         "Cam s": "Tea, green",
//         "Can c": "Chanterelle",
//         "Can s_seed": "Hempseed",
//         "Cap a": "Paprika",
//         "Cap c": "Venison",
//         "Cap f": "Cayenne pepper",
//         "Cap f_chi": "Chili (red)",
//         "Cap h_cheese": "Goat cheese",
//         "Cap h_meat": "Goat",
//         "Cap h_milk": "Goat milk",
//         "Cap s": "Caper",
//         "Car c": "Caraway",
//         "Car i": "Pecan nut",
//         "Car p": "Papaya",
//         "Car spp.": "Cockle",
//         "Car t": "Safflower oil",
//         "Cas s": "Sweet chestnut",
//         "Cer e": "Stag",
//         "Che q": "Quinoa",
//         "Chi spp.": "Crab",
//         "Chl spp.": "Chlorella",
//         "Cic a": "Chickpea",
//         "Cic e": "Endive",
//         "Cic if": "Chicorée",
//         "Cic i_fol": "Radicchio",
//         "Cin v": "Cinnamon",
//         "Cit a": "Lime",
//         "Cit l": "Lemon",
//         "Cit la": "Watermelon",
//         "Cit p": "Grapefruit",
//         "Cit r": "Tangerine",
//         "Cit s": "Orange",
//         "Clu h": "Atlantic herring",
//         "Coc n": "Coconut milk",
//         "Coc n_nut": "Coconut",
//         "Cof a": "Coffee",
//         "Col_spp": "Kola nut",
//         "Con spp.": "Curry",
//         "Cor a_hazel": "Hazelnut",
//         "Cor s": "Coriander",
//         "Cot c": "Quail egg",
//         "Cuc m": "Melon",
//         "Cuc met": "Kiwano",
//         "Cuc m_butternut": "Pumpkin Butternut",
//         "Cuc m_hoc": "Pumpkin Hokkaido",
//         "Cuc p": "Pumpkin seed",
//         "Cuc pe": "Zucchini",
//         "Cuc s": "Cucumber",
//         "Cum c": "Cumin",
//         "Cur l": "Turmeric",
//         "Cym c": "Lemongrass",
//         "Cyn c": "Artichoke",
//         "Cyp c": "Carp",
//         "Cyp e": "Tigernut",
//         "Dau c": "Carrot",
//         "Ele c": "Cardamom",
//         "Eng e": "European anchovy",
//         "Equ c_meat": "Horse",
//         "Eru s": "Arugula",
//         "Eso l": "Northern pike",
//         "Fag e": "Buckwheat",
//         "Fic c": "Fig",
//         "Fla v": "Enoki",
//         "Foe v": "Fennel (bulb)",
//         "Fra a": "Strawberry",
//         "Gad m": "Atlantic cod",
//         "Gal d_meat": "Chicken",
//         "Gal d_white": "Egg white",
//         "Gal d_yolk": "Egg yolk",
//         "Gin b": "Ginkgo",
//         "Gly m": "Soy",
//         "Hal g": "Abalone",
//         "Hel a": "Sunflower",
//         "Hib s": "Hibiscus",
//         "Hom g": "Lobster",
//         "Hom s LF": "Human Lactoferrin",
//         "Hor v": "Barley",
//         "Hor v_malt": "Malt (barley)",
//         "Hum l": "Hops",
//         "IgG_Std1": "IgG_Std1",
//         "IgG_Std2": "IgG_Std2",
//         "IgG_Std3": "IgG_Std3",
//         "IgG_Std4": "IgG_Std4",
//         "IgG_Std5": "IgG_Std5",
//         "Ipo b": "Sweet potato",
//         "Jas o": "Jasmine",
//         "Jug r_nut": "Walnut",
//         "Jun c": "Juniper berry",
//         "Lau n": "Bay leaf",
//         "Len c": "Lentil",
//         "Lep m": "Maca root",
//         "Lep s": "Watercress",
//         "Lin u": "Linseed",
//         "Lit c": "Lychee",
//         "Lit s": "Shrimp mix",
//         "Loc m": "Migratory locust",
//         "Lol spp.": "Squid",
//         "Lop p": "Monkfish",
//         "Lup a": "Lupine seed",
//         "Mac inte": "Macadamia",
//         "Mal d": "Apple",
//         "Man e": "Tapioca",
//         "Man i": "Mango",
//         "Mat c": "Chamomile",
//         "Mel a": "Haddock",
//         "Mel g": "Turkey",
//         "Men p": "Peppermint",
//         "Mer c": "Hake",
//         "Mor o": "Moringa",
//         "Mor spp._berry": "Mulberry",
//         "Mus a": "Banana",
//         "Myr f": "Nutmeg",
//         "Myt e": "Common mussel",
//         "Nep c": "Mint",
//         "Oci b": "Basil",
//         "Oct v": "Octopus",
//         "Ole_fruit": "Olive",
//         "Onc m": "Trout",
//         "Ori m": "Majoram",
//         "Ori v": "Oregano",
//         "Ory s": "Rice",
//         "Ory_meat": "Rabbit",
//         "Ost e": "Oyster",
//         "Ovi a_cheese": "Sheep cheese",
//         "Ovi a_meat": "Lamb",
//         "Ovi a_milk": "Sheep milk",
//         "Pan b": "Northern prawn",
//         "Pan g": "Ginseng",
//         "Pan m": "Millet",
//         "Pap s": "Poppyseed",
//         "Pas e": "Passion fruit",
//         "Pas s": "Parsnip",
//         "Pau c": "Guarana",
//         "Pec spp.": "Scallop",
//         "Pers a": "Avocado",
//         "Pet c": "Parsley",
//         "Pha spp.": "Razor shell",
//         "Pha v": "White bean",
//         "Pha v_green": "Green bean",
//         "Pho d_fruit": "Date",
//         "Phy p": "Physalis",
//         "Pim a": "Anise",
//         "Pin k": "Pine nut",
//         "Pip n": "Pepper ⚫⚪🟢🔴🟡",
//         "Pis s": "Pea",
//         "Pis s_conv": "Sugar pea",
//         "Pis v": "Pistachio",
//         "Ple e": "French horn mushroom",
//         "Ple o": "Oyster mushroom",
//         "Ple p": "European plaice",
//         "Pru ar": "Apricot",
//         "Pru av": "Cherry",
//         "Pru do": "Plum",
//         "Pru du": "Almond",
//         "Pru du_milk": "Almond milk",
//         "Pru p": "Peach",
//         "Pru p_nuc": "Nectarine",
//         "Pun g": "Pomegranate",
//         "Pyr c": "Pear",
//         "Pyr y": "Nori",
//         "Raj c": "Thornback Ray",
//         "Rap s": "Radish",
//         "Rib g": "Gooseberry",
//         "Rib r": "Red currant",
//         "Ros o": "Rosmary",
//         "Rub f": "Blackberry",
//         "Rub i": "Raspberry",
//         "Rud spp.": "Venus clam",
//         "Sac c": "Baker's yeast",
//         "Sac o": "Cane sugar",
//         "Sac u": "Brewer's yeast",
//         "Sal h": "Chia seed",
//         "Sal o": "Sage",
//         "Sal s": "Salmon",
//         "Sam f": "Elderflower",
//         "Sam n": "Elderberry",
//         "Sar p": "European pilchard",
//         "Sco m": "Turbot",
//         "Sco s": "Mackerel",
//         "Seb m": "Atlantic redfish",
//         "Sec c_flour": "Rye",
//         "Sep spp.": "Sepia",
//         "Ses i": "Sesame",
//         "Sin": "Mustard",
//         "Sma s": "Yacón root",
//         "Sol m": "Eggplant",
//         "Sol s": "Sole",
//         "Sol t": "Potato",
//         "Sola l": "Tomato",
//         "Spa a": "Gilt-head bream",
//         "Spi o": "Spinach",
//         "Spi spp.": "Spirulina",
//         "Str c": "Ostrich",
//         "Str m": "M-Transglutaminase, meat glue",
//         "Sus d_meat": "Pork",
//         "Sus s_meat": "Boar",
//         "Syz a": "Clove",
//         "Tam i": "Tamarind",
//         "Tar v": "Dandelion root",
//         "Ten m": "Mealworm",
//         "The c": "Cocoa",
//         "Thu a": "Tuna",
//         "Thy v": "Thyme",
//         "Tri a": "Wheat",
//         "Tri a Gliadin": "Wheat gliadin",
//         "Tri ae": "Gluten",
//         "Tri a_bran": "Wheat bran",
//         "Tri a_grass": "Wheatgrass",
//         "Tri d": "Emmer",
//         "Tri du": "Durum",
//         "Tri fo": "Fenugreek",
//         "Tri m": "Einkorn",
//         "Tri p": "Polish wheat",
//         "Tri s": "Spelt",
//         "Und p": "Wakame",
//         "Urt d_leaf": "Nettle leaves",
//         "Vac m": "Blueberry",
//         "Vac m_cra": "Cranberry",
//         "Val l": "Lamb's lettuce",
//         "Van p": "Vanilla",
//         "Vig r": "Mung bean",
//         "Vit v": "Grape",
//         "Vit v_ros": "Raisin",
//         "Xip g": "Swordfish",
//         "Zea m": "Corn",
//         "Zin o": "Ginger",
//     }

//     const value = data[key];
//     return value;
// }

//   const downloadCSV = (newdata) => {
//     // Extract only the 'name' and 'value' fields
//     // const filteredData = data.map((item) => ({
//     //   name: getName(item.name),
//     //   value: item.value,
//     // }));

//     // // Convert the filtered data to CSV format
//     // const csvRows = [
//     //   "name,value", // Header row
//     //   ...filteredData.map((row) => `${row.name},${row.value}`),
//     // ];

//     const data = newdata.result
//     const categories = {
//       "Dairy Products & Egg": ["Buffalo milk", "Buttermilk", "Camel milk", "Camembert", "Cottage cheese", "Cow's milk", "Cow's milk Bos d 4 * (Alpha-Lactalbumin)", "Cow's milk Bos d 5 * (Beta-Lactoglobulin)", "Cow's milk Bos d 8 * (Casein)", "Egg white", "Egg yolk", "Emmental", "Goat cheese", "Goat milk", "Gouda", "Mozzarella", "Parmesan", "Quail egg", "Sheep cheese", "Sheep milk"],
//       "Cereals & Seeds": ["Amaranth", "Barley", "Buckwheat", "Corn", "Durum", "Einkorn", "Emmer", "Gluten", "Hempseed", "Linseed", "Lupine seed", "Malt (barley)", "Millet", "Oat", "Pine nut", "Polish wheat", "Poppyseed", "Pumpkin seed", "Quinoa", "Rapeseed", "Rice", "Rye", "Sesame", "Spelt", "Sunflower", "Wheat", "Wheat bran", "Wheat gliadin", "Wheatgrass"],
//       "Meat": ["Beef", "Boar", "Chicken", "Duck", "Goat", "Horse", "Lamb", "Ostrich", "Pork", "Rabbit", "Stag", "Turkey", "Veal", "Venison"],
//       "Fish & Seafood": ["Abalone", "Atlantic cod", "Atlantic herring", "Atlantic redfish", "Carp", "Caviar", "Cockle", "Common mussel", "Crab", "Eel", "European anchovy", "European pilchard", "European plaice", "Gilt-head bream", "Haddock", "Hake", "Lobster", "Mackerel", "Monkfish", "Noble crayfish", "Northern pike", "Northern prawn", "Oyster", "Octopus", "Razor shell", "Salmon", "Scallop", "Sepia", "Shrimp mix", "Sole", "Squid", "Swordfish", "Thornback Ray", "Trout", "Tuna", "Turbot", "Venus clam"],
//       "Vegetables": ["Artichoke", "Arugula", "Asparagus", "Avocado", "Bamboo sprouts", "Broccoli", "Brussels sprouts", "Cabbage", "Caper", "Carrot", "Cauliflower", "Celery Bulb", "Celery Stalk", "Chard", "Chicorée", "Chinese cabbage", "Chives", "Cucumber", "Eggplant", "Endive", "Fennel (bulb)", "Green bean", "Green cabbage", "Horseradish", "Kiwano", "Kohlrabi", "Lamb's lettuce", "Leek", "Nettle leaves", "Olive", "Onion", "Parsnip", "Pea", "Pok-Choi", "Pumpkin Butternut", "Pumpkin Hokkaido", "Radicchio", "Radish", "Red beet", "Red cabbage", "Romanesco", "Savoy", "Shallot", "Spinach", "Sweet potato", "Tomato", "Turnip", "Watercress", "White cabbage", "Wild garlic", "Zucchini"],
//       "Edible Mushrooms": ["Boletus", "Chanterelle", "Enoki", "French horn mushroom", "Oyster mushroom", "White mushroom"],
//       "Legumes": ["Chickpea", "Green bean", "Lentil", "Mung bean", "Pea", "Peanut", "Soy", "Sugar pea", "Tamarind", "White bean"],
//       "Fruits": ["Apple", "Apricot", "Banana", "Blackberry", "Blueberry", "Cherry", "Cranberry", "Date", "Elderberry", "Fig", "Grape", "Grapefruit", "Gooseberry", "Kiwi", "Lemon", "Lime", "Lychee", "Mango", "Melon", "Mulberry", "Nectarine", "Orange", "Papaya", "Passion fruit", "Peach", "Pear", "Physalis", "Pineapple", "Plum", "Pomegranate", "Raisin", "Raspberry", "Red currant", "Strawberry", "Tangerine", "Watermelon"],
//       "Nuts": ["Almond", "Brazil nut", "Cashew", "Coconut", "Coconut milk", "Hazelnut", "Kola nut", "Macadamia", "Pecan nut", "Pistachio", "Sweet chestnut", "Tigernut", "Walnut"],
//       "Spices": ["Anise", "Basil", "Bay leaf", "Caraway", "Cardamom", "Cayenne pepper", "Chili (red)", "Cinnamon", "Clove", "Coriander", "Mustard", "Cumin", "Curry", "Dill", "Fenugreek", "Ginger", "Juniper berry", "Lemongrass", "Majoram", "Mint", "Nutmeg", "Oregano", "Paprika", "Parsley", "Pepper ⚫⚪🟢🔴🟡", "Rosmary", "Sage", "Tarragon", "Thyme", "Turmeric", "Vanilla"],
//       "Herbal Tees & Coffee": ["Chamomile", "Cocoa", "Coffee", "Hibiscus", "Jasmine", "Moringa", "Peppermint", "Tea black", "Tea green"],
//       "Novel Foods": ["Almond milk", "Aloe", "Aronia", "Baobab", "Chia seed", "Chlorella", "Dandelion root", "Ginkgo", "Ginseng", "Greater burdock root", "Guarana", "House cricket", "Maca root", "Mealworm", "Migratory locust", "Nori", "Safflower oil", "Spirulina", "Tapioca", "Wakame", "Yacón root"],
//       "Others": ["Agar Agar", "Aspergillus niger", "Baker's yeast", "Brewer's yeast", "Cane sugar", "Elderflower", "Honey", "Hops", "M-Transglutaminase, meat glue"],
//       "CCD": ["Human Lactoferrin"]
//   }

//     // Begin constructing CSV rows
//     const csvRows = [""];
//     const sum = data.reduce((accumulator, currentValue) => {
//       return accumulator + Math.round(currentValue.value);
//   }, 0);
//     // Add static header information
//     csvRows.push(`KIT ID : ${newdata.kitid}`);
//     // csvRows.push(`Practitioner Name${newdata}`);
//     // csvRows.push(`Practitioner Email${newdata}`);
//     csvRows.push(`Patient Name : ${newdata.patientName}`);
//     csvRows.push(`Sample Date : ${newdata.SampleDate}`);
//     csvRows.push(`Total Immune Load : ${sum}`);
//     csvRows.push("");  // Empty line for spacing
//     csvRows.push("YourGutMap IgG Food Sensitivity Screen");
//     csvRows.push("");  // Empty line for spacing

//     // Add categories and their data
//     // Object.keys(categories).forEach((category) => {
//       for (let i = 0; i < Object.keys(categories).length; i++) {
//         const category = Object.keys(categories)[i];
//       // Add category name, "FOODS", and "SCORE" headers
//       csvRows.push(category);
//       csvRows.push(`FOODS, SCORE`);

//       // Add data for each item in the category
//       // categories[category].forEach((item) => {
//       //   csvRows.push(`${item}, ${item.value}`);
//       // });
//       {data.map((mydata, index) => (
//         <>
//             {(categories[Object.keys(categories)[i]] || {}).includes(getName(mydata.name)) ? csvRows.push(`${getName(mydata.name)},${mydata.value.toFixed(2)}`): null}
//         </>
//     ))}

//       // Add an empty line after each category
//       csvRows.push("");
//     };

//     // Begin constructing CSV rows
//     // const csvRows = [];

//     // Add static header information
//     csvRows.push("KIT ID, PRAC NAME, PRAC EMAIL");
//     csvRows.push("PATAINT NAME, SAMPLE DATE");
//     csvRows.push("TOTAL IMMUN LOAD");
//     csvRows.push("");  // Empty line for spacing
//     csvRows.push("YourGutMap IgG Food Sensitivity Screen");
//     csvRows.push("");  // Empty line for spacing

//     // Add categories and their data
//     Object.keys(categories).forEach((category) => {
//       // Add category name, "FOODS", and "SCORE" headers
//       csvRows.push(`${category}, FOODS, SCORE`);

//       // Add data for each item in the category
//       categories[category].forEach((item) => {
//         csvRows.push(`${item.name}, ${item.value}`);
//       });

//       // Add an empty line after each category
//       csvRows.push("");
//     });
//     const csvContent = csvRows.join("\n");

//     // Create and trigger the download
//     const link = document.createElement("a");
//     link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
//     link.target = "_blank";
//     link.download = `fs_report_${newdata.kitid}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

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

//   var cout = 0;
//   var cout2 = 0;

//   var data = [];
//   var data222 = [];

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

//     kit.map((value, index) => {

//       if (value.result && value.result.length !== 0) {
//         options.push({ value: value.kitid })
//         options.push({ value: value.patientName })
//         options.push({ value: value.resultDate })
//         options.push({ value: value.SampleDate })
//         options.push({ value: value.DOB })

//       }

//     })

//   }

//   const handleInputChange = async (e) => {
//   e.preventDefault();

//   // Ensure `searchTerm` is a string and convert to lowercase
//   const searchQuery = searchTerm?.toString().toLowerCase() || '';

//   // Filter `practitioner` safely
//   const filteredSuggestionspra = practitioner.filter((item) => {
//     const name = item?.name?.toString().toLowerCase() || '';
//     const email = item?.email?.toString().toLowerCase() || '';
//     return name.includes(searchQuery) || email.includes(searchQuery);
//   });

//   // Convert `searchTerm` to integer (if needed)
//   const intttt2 = parseInt(searchTerm, 10) || searchTerm;

//   // Filter `kit` safely
//   const filteredSuggestions = kit.filter((item) => {
//     const resullll = item.result;

//     if (resullll && resullll.length !== 0) {
//       const DOB = item.DOB?.toLowerCase() || '';
//       const patientName = item.patientName?.toLowerCase() || '';
//       const sampleDate = item.SampleDate?.toLowerCase() || '';
//       const resultDate = item.resultDate?.toLowerCase() || '';
//       const assignedTo = item.assignedto?.toLowerCase() || '';

//       return (
//         DOB.includes(searchQuery) ||
//         patientName.includes(searchQuery) ||
//         sampleDate.includes(searchQuery) ||
//         resultDate.includes(searchQuery) ||
//         item.kitid === intttt2 ||
//         filteredSuggestionspra.some((itemmm) => itemmm._id.toLowerCase() === assignedTo)
//       );
//     }
//     return false; // Return false if `resullll` is invalid
//   });

//   // Update the state with the filtered data
//   setkit(filteredSuggestions);
//   setsearchdone(true);
// };

//   const [searchdone, setsearchdone] = useState(false)

//   const clearsearch = async () => {
//     const hide = message.loading("Action in progress", 0)

//     if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//       var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,

//         redirect: 'follow'
//       };

//       await fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions)
//         .then(response => response.json())
//         .then(result => setkit(result))

//       var myHeaders2 = new Headers();
//       myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

//       var requestOptions2 = {
//         method: 'GET',
//         headers: myHeaders2,

//         redirect: 'follow'
//       };

//       await fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions2)
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

//       await fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfo`, requestOptions2)
//         .then(response => response.json())
//         .then(result => setkit(result))
//         .catch(error => console.log('error', error));

//     }

//     await setsearchdone(false)
//     setTimeout(() => {
//       hide(); // Call hide to stop the loading message
//       message.success("Action completed successfully");
//     }, 2000);
//   }

//   const [userinfo, setuserinfo] = useState([])
//   const [popupdetails, setpopupdetails] = useState(false)

//   const urlTest   = "https://report.test4.life/";
//   const urlSupply = "https://report-sl.test4.life/";

//   const items = [
//     {
//       key: '1',
//       label: (
//         // <a href={"https://report.test4.life/" + userinfo._id} target="_blank" rel="noopener noreferrer" onClick={async () => {
//         <a href={(userinfo && userinfo.kitid && userinfo._id.includes("SL")
//           ? urlSupply
//           : userinfo.reportType)+ userinfo._id} target="_blank" rel="noopener noreferrer" onClick={async () => {
//         }}>
//           View result
//         </a>
//       ),
//       icon: <MdOutlineViewDay style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },
//     {
//       key: '2',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" onClick={async () => {

//           const hide = message.loading("Action in progress", 0)

//           var myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//           var urlencoded = new URLSearchParams();
//           urlencoded.append("_id", userinfo._id);

//           var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//           };

//           try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/viewwholereport`, requestOptions);
//             const result = await response.json();
//             setkit2(result);
//             setResult2(result.result);

//             // Wait for 2 seconds
//             await new Promise(resolve => setTimeout(resolve, 500));

//             // Call the DownloadPDF function after waiting
//             // DownloadPDF(userinfo.patientName);
//           } catch (error) {
//             console.log('error', error);
//           }

//           setTimeout(() => {
//             hide(); // Call hide to stop the loading message
//             message.success("Action completed successfully");
//           }, 2000);

//         }}>
//           Download Results
//         </a>
//       ),
//       icon: <BsCloudDownload style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },

//     {
//       key: '3',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" onClick={async () => {
//           const hide = message.loading("Action in progress", 0)

//           var myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//           var urlencoded = new URLSearchParams();
//           urlencoded.append("_id", userinfo._id);

//           var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//           };
//           const response = await fetch(`${process.env.REACT_APP_API_URL}/sentresults210`, requestOptions);
//           const result = await response.json();
//           await setkit(result);
//           await setpopupdetails(false)
//           setTimeout(() => {
//             hide(); // Call hide to stop the loading message
//             message.success("Action completed successfully");
//           }, 2000);
//         }}>
//           Send Results
//         </a>
//       ),
//       disabled: userinfo.ackresult,

//       icon: <AiOutlineMail style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },

//   ];

//   const items2 = [
//     {
//       key: '1',
//       label: (
//         <a
//   href={
//     (() => {
//       // Find the practitioner with matching ID
//       const myPractitioner = practitioner.find(
//         (practitioners) => practitioners._id === userinfo.assignedto
//       );

//       // Determine the base URL
//       const baseUrl =
//         userinfo && userinfo.kitid && userinfo.kitid.includes("SL")
//           ? urlSupply
//           : myPractitioner && myPractitioner.reportType
//           ? myPractitioner.reportType
//           : urlTest;

//       // Return the full URL
//       return baseUrl + userinfo._id;
//     })()
//   }
//   target="_blank"
//   rel="noopener noreferrer"
//   onClick={async () => {
//     console.log(practitioner);
//   }}
// >
//   View Result
// </a>

//       ),
//       icon: <MdOutlineViewDay style={{ width: '20px', height: '20px', color: '#4885B9' }} />,

//     },

//     // {
//     //    key: '2',
//     //    label: (
//     //      <a target="_blank" rel="noopener noreferrer" onClick={async () => {

//     //        const hide = message.loading("Action in progress", 0)

//     //        var myHeaders = new Headers();
//     //        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     //        var urlencoded = new URLSearchParams();
//     //        urlencoded.append("_id", userinfo._id);

//     //        var requestOptions = {
//     //          method: 'POST',
//     //          headers: myHeaders,
//     //          body: urlencoded,
//     //          redirect: 'follow'
//     //        };

//     //        try {
//     //          const response = await fetch(`${process.env.REACT_APP_API_URL}/viewwholereport`, requestOptions);
//     //          const result = await response.json();
//     //          setkit2(result);
//     //          setResult2(result.result);

//     //          // Wait for 2 seconds
//     //          await new Promise(resolve => setTimeout(resolve, 500));

//     //          // Call the function to download CSV
//     //          console.log(result.result["name"])
//     //          console.log(result.result["value"])
//     //          downloadCSV(result.result);

//     //          // Call the DownloadPDF function after waiting
//     //         //  DownloadPDF(userinfo.patientName);
//     //        } catch (error) {
//     //          console.log('error', error);
//     //        }

//     //        setTimeout(() => {
//     //          hide(); // Call hide to stop the loading message
//     //          message.success("Action completed successfully");
//     //        }, 2000);

//     //      }}>
//     //        Download Results
//     //      </a>
//     //    ),
//     //    icon: <BsCloudDownload style={{ width: '20px', height: '20px', color: '#4885B9' }} />,
//     // },

//     {
//       key: '2',
//       label: (
//         <a
//           target="_blank"
//           rel="noopener noreferrer"
//           onClick={async () => {
//             const hide = message.loading("Action in progress", 0);

//             var myHeaders = new Headers();
//             myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//             var urlencoded = new URLSearchParams();
//             urlencoded.append("_id", userinfo._id);

//             var requestOptions = {
//               method: 'POST',
//               headers: myHeaders,
//               body: urlencoded,
//               redirect: 'follow',
//             };

//             try {
//               const response = await fetch(
//                 `${process.env.REACT_APP_API_URL}/viewwholereport`,
//                 requestOptions
//               );
//               const result = await response.json();
//               setkit2(result);
//               setResult2(result.result);

//               // Wait for 2 seconds
//               await new Promise((resolve) => setTimeout(resolve, 500));

//               // Call the function to download CSV with filtered fields
//               downloadCSV(result);
//             } catch (error) {
//               console.log("error", error);
//             }

//             setTimeout(() => {
//               hide(); // Call hide to stop the loading message
//               message.success("Action completed successfully");
//             }, 2000);
//           }}
//         >
//           Download Results
//         </a>
//       ),
//       icon: (
//         <BsCloudDownload
//           style={{ width: '20px', height: '20px', color: '#4885B9' }}
//         />
//       ),
//     },

//     // Function to download the CSV file

//     {
//       key: '3',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" onClick={async () => {

//           const hide = message.loading("Action in progress", 0)
//           var myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//           var urlencoded = new URLSearchParams();
//           urlencoded.append("_id", userinfo._id);

//           var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//           };

//           const response = await fetch(`${process.env.REACT_APP_API_URL}/sentresults`, requestOptions);
//           const result = await response.json();
//           await setkit(result);

//           await setpopupdetails(false)

//           setTimeout(() => {
//             hide(); // Call hide to stop the loading message
//             message.success("Action completed successfully");
//           }, 2000);

//         }}>
//           Send Results
//         </a>
//       ),
//       disabled: userinfo.ackresult,

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
//           <div className='header'>
//             <h1>Food Sensitivity Reports</h1>
//             {dooption()}
//             {searchdone === false && <>
//               <form onSubmit={handleInputChange}>
//                 <AutoComplete
//                   type="number"
//                   style={{ width: 200 }}
//                   options={options}
//                   placeholder="Email/Name/Patient Name/Sample Date/upload/practitioner/NamePractitioner Email "
//                   filterOption={(inputValue, options) =>{
//                     const value = options?.value || '';
//                     // options?.value?.toString().toUpperCase().indexOf(inputValue.toUpperCase().toString()) !== -1
//                     return value.toString().toUpperCase().includes(inputValue?.toUpperCase() || '');
//                     //  console.log(kitss)
//                   }
//                   }
//                   onChange={(inputValue) => setSearchTerm(inputValue)}
//                 />
//                 <button>Search</button>
//               </form>
//             </>}
//             {searchdone === true && <>     <div className='clearsearch'  ><h3>search: {searchTerm}</h3> <button onClick={clearsearch}><AiOutlineClose /> Clear</button>  </div>
//             </>}
//           </div>

//           {popupdetails === true && <>
//             <div onClick={() => {
//               setpopupdetails(false)
//               setCSVFile(null)
//             }
//             } className='popupbg'></div>
//             <div className='popup'>

//               <div className='header' >
//                 <h2>Kits Result Details</h2>
//               </div>
//               <div className='kitdetailsmain' >

//                 <div className='kitdetails'>
//                   <h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <GiFirstAidKit style={{ width: '20px', height: '20px',margin:"0 10px" }} /> KIT ID</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>  {userinfo.kitid} </h3>
//                 </div>
//                 <div className='kitdetails'>
//                   <h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <FaRegUser style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Practitioner Name</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>

//                     {practitioner.map((item2, index) => (<>

//                       {item2._id === userinfo.assignedto && <>

//                         <td>{item2.name}</td>

//                         {/* <td>{item2.email}</td> */}
//                       </>}</>))}

//                   </h3>
//                 </div>
//                 <div className='kitdetails'>

//                   <h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <TbUserShare style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Practitioner Email</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>

//                     {practitioner.map((item2, index) => (<>

//                       {item2._id === userinfo.assignedto && <>

//                         <td>{item2.email}</td>
//                       </>}</>))}

//                   </h3>
//                 </div>

//                 <div className='kitdetails'>
//                   <h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <ImUserTie style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Patient Name</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>  {userinfo.patientName} </h3>
//                 </div>
//                 <div className='kitdetails'>
//                   <h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <BsCalendar2DateFill style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Date of birth</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>  {userinfo.DOB} </h3>
//                 </div>
//                 <div className='kitdetails'>
//                   <h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <MdOutlinePendingActions style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Sample Date</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>  {userinfo.SampleDate} </h3>
//                 </div>
//                 <div className='kitdetails'>
//                   <h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <MdOutlineUpdate style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Result upload on</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>  {userinfo.resultDate} </h3>
//                 </div>
//                 <div className='kitdetails'><h3 style={{ display: "flex", color: '#4180b7', alignItems: 'center' }}> <AiOutlineInteraction style={{ width: '20px', height: '20px',margin:"0 10px" }} /> Action</h3><h3 style={{ display: "flex", color: '#6E4E9F', alignItems: 'center' }}>

//                   <Dropdown menu={{ items: userinfo.Kittype === "210" ? items : items2 }} placement="bottomRight" arrow>
//                     <IoIosArrowDropdown className='hovar' style={{ width: '20px', height: '20px',margin:"0 10px" }} />
//                   </Dropdown>

//                 </h3></div>

//               </div>

//               <div className='bownpopupbutton'>
//                 <button onClick={() => {
//                   setpopupdetails(false)

//                 }
//                 } style={{ border: '1px solid red', color: 'black' }} >cancel</button>

//               </div>

//             </div>
//           </>}

//           {kit.length !== 0 && <>

//             <div className='header'><h3>Food Sensitivity</h3></div>
//             <div className='imp'>
//               <table className='tablep'>
//                 <thead className='tablephead'>
//                   <tr>
//                     <th>S NO.</th>

//                     <th>Kit ID</th>

//                     <th>Sample Date</th>

//                     {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>      <th>Practitioner Name</th></>}
//                     {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>       <th>Practitioner Email</th></>}
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>

//                   {kit.map((item, index) =>

//                     <>
//                       {item.result.length !== 0 &&  <>

//                         <tr>
//                           <td>{sno1++}</td>

//                           <td>{item.kitid}</td>

//                           <td>{item.SampleDate}</td>

//                           {practitioner.map((item2, index) => (<>

//                             {item2._id === item.assignedto && <>
//                              <td>{item2.name}</td>

//                               <td>{item2.email}</td>
//                             </>}</>))}

//                           {/* <td className='assignbuttom' ><BsCloudDownload onClick={async () => {

//                           var myHeaders = new Headers();
//                           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                           var urlencoded = new URLSearchParams();
//                           urlencoded.append("_id", item._id);

//                           var requestOptions = {
//                             method: 'POST',
//                             headers: myHeaders,
//                             body: urlencoded,
//                             redirect: 'follow'
//                           };

//                           try {
//                             const response = await fetch("${process.env.REACT_APP_API_URL}/viewwholereport", requestOptions);
//                             const result = await response.json();
//                             setkit2(result);
//                             setResult2(result.result);

//                             // Wait for 2 seconds
//                             await new Promise(resolve => setTimeout(resolve, 500));

//                             // Call the DownloadPDF function after waiting
//                             DownloadPDF(item.patientName);
//                           } catch (error) {
//                             console.log('error', error);
//                           }

//                         }} className='hovar' style={{ width: '30px', height: '30px', color: '#4180b7' }} /></td> */}

//                           {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
//                           {item.ackresult ? (<><td>Result Already Sent</td></>) : (<>
//                             <td  ><AiOutlineMail onClick={async () => {

//                               var myHeaders = new Headers();
//                               myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//                               var urlencoded = new URLSearchParams();
//                               urlencoded.append("_id", item._id);

//                               var requestOptions = {
//                                 method: 'POST',
//                                 headers: myHeaders,
//                                 body: urlencoded,
//                                 redirect: 'follow'
//                               };

//                               const response = await fetch("${process.env.REACT_APP_API_URL}/sentresults210", requestOptions);
//                               const result = await response.json();
//                               await setkit(result);

//                             }} className='hovar' style={{ width: '30px', height: '30px', color: '#4180b7' }} /></td>

//                           </>)}
//                         </>} */}

//                           <td  >
//                             <button className='button' onClick={() => {
//                               setpopupdetails(true)
//                               setuserinfo(item)
//                             }}>Detail</button>
//                           </td>
//                         </tr>

//                       </>}

//                     </>
//                   )}

//                 </tbody>
//               </table>

//             </div>

//             {/* <a onClick={downloadCSV} style={{ display: 'flex', textAlign: 'right', justifyContent: 'end', width: '100%' }} href='/'>Download this data as CSV</a > */}

//           </>}

//           {kit.length === 0 && <>

//             <img alt='' src='/empty.gif' width={"40%"} />
//           </>}

//         </div>

//       </div>

//     </>} </>)
// }
// export default Adminreport

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/navbar";
import "../css/adminreport.css";
import Sidemanu from "../components/sidemanu";
import "../css/adminkit.css";
import { ImUpload2, ImUserTie } from "react-icons/im";
import { BsCalendar2DateFill, BsCloudDownload } from "react-icons/bs";
import {
  AiFillDelete,
  AiOutlineClose,
  AiOutlineInteraction,
} from "react-icons/ai";
// import Papa from 'papaparse';
import { AutoComplete, Dropdown, message } from "antd";
import { CSVLink } from "react-csv";
import { FaDownload, FaRegUser } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import Cookies from "js-cookie";
import { AiOutlineMail } from "react-icons/ai";
import { GiFirstAidKit } from "react-icons/gi";
import { IoIosArrowDropdown } from "react-icons/io";
import {
  MdOutlinePendingActions,
  MdOutlineUpdate,
  MdOutlineViewDay,
} from "react-icons/md";
import { TbUserShare } from "react-icons/tb";
import Papa from "papaparse";

function Adminreport() {
  const loginemail = Cookies.get("email");
  const loginname = Cookies.get("Name");
  const id = Cookies.get("id");
  const token = Cookies.get("Token");

  const [popup, setpopup] = useState(false);

  const fileInputRef = useRef(null);

  const [csvFile, setCSVFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [kit, setkit] = useState([]);
  const [practitioner, setpractitioner] = useState([]);

  const [kit2, setkit2] = useState([]);

  const [Result2, setResult2] = useState([]);
  const [Result222, setResult222] = useState([]);

  const sortkits = () => {
    if (kit.length !== 0) {
      const sortedKits = [...kit].sort((a, b) => {
        // Check if resultDate is available for both items
        if (a.resultDate && b.resultDate) {
          const dateA = new Date(a.resultDate.split("/").reverse().join("-"));
          const dateB = new Date(b.resultDate.split("/").reverse().join("-"));
          return dateB - dateA;
        }

        // Handle cases where resultDate might be missing
        if (!a.resultDate) return 1; // Place a at the end if it has no resultDate
        if (!b.resultDate) return -1; // Place b at the end if it has no resultDate

        return 0; // If both are missing resultDate, consider them equal
      });

      setkit(sortedKits);
    }
  };

  useEffect(() => {
    sortkits();
  }, [kit]);

  // const downloadCSV = (data) => {
  //   const csv = Papa.unparse(data);  // Convert JSON data to CSV

  //   // Create a temporary link element to trigger the download
  //   const link = document.createElement('a');
  //   link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
  //   link.target = '_blank';
  //   link.download = `${userinfo.patientName}_report.csv`;  // Specify file name

  //   // Trigger the download by clicking the link
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const getName = (key) => {
    const data = {
      GD1: "GD1",
      GD2: "GD2",
      GD3: "GD3",
      "Ach d": "House cricket",
      "Aci spp.": "Caviar",
      "Act d": "Kiwi",
      "Ada d": "Baobab",
      Aga: "Agar Agar",
      "Aga b": "White mushroom",
      "All a": "Shallot",
      "All c": "Onion",
      "All p": "Leek",
      "All s": "Garlic",
      "All sc": "Chives",
      "All u": "Wild garlic",
      "Alo v": "Aloe",
      "Ama t": "Amaranth",
      "Ame a": "Tea, black",
      "Ana c": "Pineapple",
      "Ana o": "Cashew",
      "Ana p": "Duck",
      "Ane g": "Dill",
      "Ang a": "Eel",
      "Api g": "Celery Bulb",
      "Api g_stalk": "Celery Stalk",
      "Api m_honey": "Honey",
      "Ara h": "Peanut",
      "Arc l": "Greater burdock root",
      "Arm r": "Horseradish",
      "Aro spp.": "Aronia",
      "Art d": "Tarragon",
      "Asp n": "Aspergillus niger",
      "Asp o": "White asparagus",
      "Ast a": "Noble crayfish",
      "Ave s": "Oat",
      "Bam v": "Bamboo sprouts",
      "Ber e": "Brazil nut",
      "Bet vu": "Chard",
      "Bet vul": "Red beet",
      "Bol e": "Boletus",
      "Bos d 4": "Cow's milk Bos d 4 * (Alpha-Lactalbumin)",
      "Bos d 5": "Cow's milk Bos d 5 * (Beta-Lactoglobulin)",
      "Bos d 8": "Cow's milk Bos d 8 * (Casein)",
      "Bos d_but": "Buttermilk",
      "Bos d_Ca": "Camembert",
      "Bos d_Em": "Emmental",
      "Bos d_Go": "Gouda",
      "Bos d_Hue": "Cottage cheese",
      "Bos d_meat": "Beef",
      "Bos d_milk": "Cow's milk",
      "Bos d_Mo": "Mozzarella",
      "Bos d_Pa": "Parmesan",
      "Bos d_veal_meat": "Veal",
      "Bra n": "Rapeseed",
      "Bra o": "Cabbage",
      "Bra o_bot": "Cauliflower",
      "Bra o_cap": "White cabbage",
      "Bra o_gem": "Brussels sprouts",
      "Bra o_gon": "Kohlrabi",
      "Bra o_ita": "Broccoli",
      "Bra o_rom": "Romanesco",
      "Bra o_rub": "Red cabbage",
      "Bra o_sab": "Green cabbage",
      "Bra o_saba": "Savoy",
      "Bra r": "Turnip",
      "Bra ra_chi": "Pok-Choi",
      "Bra ra_pek": "Chinese cabbage",
      "Bub b_milk": "Buffalo milk",
      "Cam d": "Camel milk",
      "Cam s": "Tea, green",
      "Can c": "Chanterelle",
      "Can s_seed": "Hempseed",
      "Cap a": "Paprika",
      "Cap c": "Venison",
      "Cap f": "Cayenne pepper",
      "Cap f_chi": "Chili (red)",
      "Cap h_cheese": "Goat cheese",
      "Cap h_meat": "Goat",
      "Cap h_milk": "Goat milk",
      "Cap s": "Caper",
      "Car c": "Caraway",
      "Car i": "Pecan nut",
      "Car p": "Papaya",
      "Car spp.": "Cockle",
      "Car t": "Safflower oil",
      "Cas s": "Sweet chestnut",
      "Cer e": "Stag",
      "Che q": "Quinoa",
      "Chi spp.": "Crab",
      "Chl spp.": "Chlorella",
      "Cic a": "Chickpea",
      "Cic e": "Endive",
      "Cic if": "Chicorée",
      "Cic i_fol": "Radicchio",
      "Cin v": "Cinnamon",
      "Cit a": "Lime",
      "Cit l": "Lemon",
      "Cit la": "Watermelon",
      "Cit p": "Grapefruit",
      "Cit r": "Tangerine",
      "Cit s": "Orange",
      "Clu h": "Atlantic herring",
      "Coc n": "Coconut milk",
      "Coc n_nut": "Coconut",
      "Cof a": "Coffee",
      Col_spp: "Kola nut",
      "Con spp.": "Curry",
      "Cor a_hazel": "Hazelnut",
      "Cor s": "Coriander",
      "Cot c": "Quail egg",
      "Cuc m": "Melon",
      "Cuc met": "Kiwano",
      "Cuc m_butternut": "Pumpkin Butternut",
      "Cuc m_hoc": "Pumpkin Hokkaido",
      "Cuc p": "Pumpkin seed",
      "Cuc pe": "Zucchini",
      "Cuc s": "Cucumber",
      "Cum c": "Cumin",
      "Cur l": "Turmeric",
      "Cym c": "Lemongrass",
      "Cyn c": "Artichoke",
      "Cyp c": "Carp",
      "Cyp e": "Tigernut",
      "Dau c": "Carrot",
      "Ele c": "Cardamom",
      "Eng e": "European anchovy",
      "Equ c_meat": "Horse",
      "Eru s": "Arugula",
      "Eso l": "Northern pike",
      "Fag e": "Buckwheat",
      "Fic c": "Fig",
      "Fla v": "Enoki",
      "Foe v": "Fennel (bulb)",
      "Fra a": "Strawberry",
      "Gad m": "Atlantic cod",
      "Gal d_meat": "Chicken",
      "Gal d_white": "Egg white",
      "Gal d_yolk": "Egg yolk",
      "Gin b": "Ginkgo",
      "Gly m": "Soy",
      "Hal g": "Abalone",
      "Hel a": "Sunflower",
      "Hib s": "Hibiscus",
      "Hom g": "Lobster",
      "Hom s LF": "Human Lactoferrin",
      "Hor v": "Barley",
      "Hor v_malt": "Malt (barley)",
      "Hum l": "Hops",
      IgG_Std1: "IgG_Std1",
      IgG_Std2: "IgG_Std2",
      IgG_Std3: "IgG_Std3",
      IgG_Std4: "IgG_Std4",
      IgG_Std5: "IgG_Std5",
      "Ipo b": "Sweet potato",
      "Jas o": "Jasmine",
      "Jug r_nut": "Walnut",
      "Jun c": "Juniper berry",
      "Lau n": "Bay leaf",
      "Len c": "Lentil",
      "Lep m": "Maca root",
      "Lep s": "Watercress",
      "Lin u": "Linseed",
      "Lit c": "Lychee",
      "Lit s": "Shrimp mix",
      "Loc m": "Migratory locust",
      "Lol spp.": "Squid",
      "Lop p": "Monkfish",
      "Lup a": "Lupine seed",
      "Mac inte": "Macadamia",
      "Mal d": "Apple",
      "Man e": "Tapioca",
      "Man i": "Mango",
      "Mat c": "Chamomile",
      "Mel a": "Haddock",
      "Mel g": "Turkey",
      "Men p": "Peppermint",
      "Mer c": "Hake",
      "Mor o": "Moringa",
      "Mor spp._berry": "Mulberry",
      "Mus a": "Banana",
      "Myr f": "Nutmeg",
      "Myt e": "Common mussel",
      "Nep c": "Mint",
      "Oci b": "Basil",
      "Oct v": "Octopus",
      Ole_fruit: "Olive",
      "Onc m": "Trout",
      "Ori m": "Majoram",
      "Ori v": "Oregano",
      "Ory s": "Rice",
      Ory_meat: "Rabbit",
      "Ost e": "Oyster",
      "Ovi a_cheese": "Sheep cheese",
      "Ovi a_meat": "Lamb",
      "Ovi a_milk": "Sheep milk",
      "Pan b": "Northern prawn",
      "Pan g": "Ginseng",
      "Pan m": "Millet",
      "Pap s": "Poppyseed",
      "Pas e": "Passion fruit",
      "Pas s": "Parsnip",
      "Pau c": "Guarana",
      "Pec spp.": "Scallop",
      "Pers a": "Avocado",
      "Pet c": "Parsley",
      "Pha spp.": "Razor shell",
      "Pha v": "White bean",
      "Pha v_green": "Green bean",
      "Pho d_fruit": "Date",
      "Phy p": "Physalis",
      "Pim a": "Anise",
      "Pin k": "Pine nut",
      "Pip n": "Pepper ⚫⚪🟢🔴🟡",
      "Pis s": "Pea",
      "Pis s_conv": "Sugar pea",
      "Pis v": "Pistachio",
      "Ple e": "French horn mushroom",
      "Ple o": "Oyster mushroom",
      "Ple p": "European plaice",
      "Pru ar": "Apricot",
      "Pru av": "Cherry",
      "Pru do": "Plum",
      "Pru du": "Almond",
      "Pru du_milk": "Almond milk",
      "Pru p": "Peach",
      "Pru p_nuc": "Nectarine",
      "Pun g": "Pomegranate",
      "Pyr c": "Pear",
      "Pyr y": "Nori",
      "Raj c": "Thornback Ray",
      "Rap s": "Radish",
      "Rib g": "Gooseberry",
      "Rib r": "Red currant",
      "Ros o": "Rosmary",
      "Rub f": "Blackberry",
      "Rub i": "Raspberry",
      "Rud spp.": "Venus clam",
      "Sac c": "Baker's yeast",
      "Sac o": "Cane sugar",
      "Sac u": "Brewer's yeast",
      "Sal h": "Chia seed",
      "Sal o": "Sage",
      "Sal s": "Salmon",
      "Sam f": "Elderflower",
      "Sam n": "Elderberry",
      "Sar p": "European pilchard",
      "Sco m": "Turbot",
      "Sco s": "Mackerel",
      "Seb m": "Atlantic redfish",
      "Sec c_flour": "Rye",
      "Sep spp.": "Sepia",
      "Ses i": "Sesame",
      Sin: "Mustard",
      "Sma s": "Yacón root",
      "Sol m": "Eggplant",
      "Sol s": "Sole",
      "Sol t": "Potato",
      "Sola l": "Tomato",
      "Spa a": "Gilt-head bream",
      "Spi o": "Spinach",
      "Spi spp.": "Spirulina",
      "Str c": "Ostrich",
      "Str m": "M-Transglutaminase, meat glue",
      "Sus d_meat": "Pork",
      "Sus s_meat": "Boar",
      "Syz a": "Clove",
      "Tam i": "Tamarind",
      "Tar v": "Dandelion root",
      "Ten m": "Mealworm",
      "The c": "Cocoa",
      "Thu a": "Tuna",
      "Thy v": "Thyme",
      "Tri a": "Wheat",
      "Tri a Gliadin": "Wheat gliadin",
      "Tri ae": "Gluten",
      "Tri a_bran": "Wheat bran",
      "Tri a_grass": "Wheatgrass",
      "Tri d": "Emmer",
      "Tri du": "Durum",
      "Tri fo": "Fenugreek",
      "Tri m": "Einkorn",
      "Tri p": "Polish wheat",
      "Tri s": "Spelt",
      "Und p": "Wakame",
      "Urt d_leaf": "Nettle leaves",
      "Vac m": "Blueberry",
      "Vac m_cra": "Cranberry",
      "Val l": "Lamb's lettuce",
      "Van p": "Vanilla",
      "Vig r": "Mung bean",
      "Vit v": "Grape",
      "Vit v_ros": "Raisin",
      "Xip g": "Swordfish",
      "Zea m": "Corn",
      "Zin o": "Ginger",
    };

    const value = data[key];
    return value;
  };

  const downloadCSV = (newdata) => {
    // Extract only the 'name' and 'value' fields
    // const filteredData = data.map((item) => ({
    //   name: getName(item.name),
    //   value: item.value,
    // }));

    // // Convert the filtered data to CSV format
    // const csvRows = [
    //   "name,value", // Header row
    //   ...filteredData.map((row) => `${row.name},${row.value}`),
    // ];

    const data = newdata.result;
    const categories = {
      "Dairy Products & Egg": [
        "Buffalo milk",
        "Buttermilk",
        "Camel milk",
        "Camembert",
        "Cottage cheese",
        "Cow's milk",
        "Cow's milk Bos d 4 * (Alpha-Lactalbumin)",
        "Cow's milk Bos d 5 * (Beta-Lactoglobulin)",
        "Cow's milk Bos d 8 * (Casein)",
        "Egg white",
        "Egg yolk",
        "Emmental",
        "Goat cheese",
        "Goat milk",
        "Gouda",
        "Mozzarella",
        "Parmesan",
        "Quail egg",
        "Sheep cheese",
        "Sheep milk",
      ],
      "Cereals & Seeds": [
        "Amaranth",
        "Barley",
        "Buckwheat",
        "Corn",
        "Durum",
        "Einkorn",
        "Emmer",
        "Gluten",
        "Hempseed",
        "Linseed",
        "Lupine seed",
        "Malt (barley)",
        "Millet",
        "Oat",
        "Pine nut",
        "Polish wheat",
        "Poppyseed",
        "Pumpkin seed",
        "Quinoa",
        "Rapeseed",
        "Rice",
        "Rye",
        "Sesame",
        "Spelt",
        "Sunflower",
        "Wheat",
        "Wheat bran",
        "Wheat gliadin",
        "Wheatgrass",
      ],
      Meat: [
        "Beef",
        "Boar",
        "Chicken",
        "Duck",
        "Goat",
        "Horse",
        "Lamb",
        "Ostrich",
        "Pork",
        "Rabbit",
        "Stag",
        "Turkey",
        "Veal",
        "Venison",
      ],
      "Fish & Seafood": [
        "Abalone",
        "Atlantic cod",
        "Atlantic herring",
        "Atlantic redfish",
        "Carp",
        "Caviar",
        "Cockle",
        "Common mussel",
        "Crab",
        "Eel",
        "European anchovy",
        "European pilchard",
        "European plaice",
        "Gilt-head bream",
        "Haddock",
        "Hake",
        "Lobster",
        "Mackerel",
        "Monkfish",
        "Noble crayfish",
        "Northern pike",
        "Northern prawn",
        "Oyster",
        "Octopus",
        "Razor shell",
        "Salmon",
        "Scallop",
        "Sepia",
        "Shrimp mix",
        "Sole",
        "Squid",
        "Swordfish",
        "Thornback Ray",
        "Trout",
        "Tuna",
        "Turbot",
        "Venus clam",
      ],
      Vegetables: [
        "Artichoke",
        "Arugula",
        "Asparagus",
        "Avocado",
        "Bamboo sprouts",
        "Broccoli",
        "Brussels sprouts",
        "Cabbage",
        "Caper",
        "Carrot",
        "Cauliflower",
        "Celery Bulb",
        "Celery Stalk",
        "Chard",
        "Chicorée",
        "Chinese cabbage",
        "Chives",
        "Cucumber",
        "Eggplant",
        "Endive",
        "Fennel (bulb)",
        "Green bean",
        "Green cabbage",
        "Horseradish",
        "Kiwano",
        "Kohlrabi",
        "Lamb's lettuce",
        "Leek",
        "Nettle leaves",
        "Olive",
        "Onion",
        "Parsnip",
        "Pea",
        "Pok-Choi",
        "Pumpkin Butternut",
        "Pumpkin Hokkaido",
        "Radicchio",
        "Radish",
        "Red beet",
        "Red cabbage",
        "Romanesco",
        "Savoy",
        "Shallot",
        "Spinach",
        "Sweet potato",
        "Tomato",
        "Turnip",
        "Watercress",
        "White cabbage",
        "Wild garlic",
        "Zucchini",
      ],
      "Edible Mushrooms": [
        "Boletus",
        "Chanterelle",
        "Enoki",
        "French horn mushroom",
        "Oyster mushroom",
        "White mushroom",
      ],
      Legumes: [
        "Chickpea",
        "Green bean",
        "Lentil",
        "Mung bean",
        "Pea",
        "Peanut",
        "Soy",
        "Sugar pea",
        "Tamarind",
        "White bean",
      ],
      Fruits: [
        "Apple",
        "Apricot",
        "Banana",
        "Blackberry",
        "Blueberry",
        "Cherry",
        "Cranberry",
        "Date",
        "Elderberry",
        "Fig",
        "Grape",
        "Grapefruit",
        "Gooseberry",
        "Kiwi",
        "Lemon",
        "Lime",
        "Lychee",
        "Mango",
        "Melon",
        "Mulberry",
        "Nectarine",
        "Orange",
        "Papaya",
        "Passion fruit",
        "Peach",
        "Pear",
        "Physalis",
        "Pineapple",
        "Plum",
        "Pomegranate",
        "Raisin",
        "Raspberry",
        "Red currant",
        "Strawberry",
        "Tangerine",
        "Watermelon",
      ],
      Nuts: [
        "Almond",
        "Brazil nut",
        "Cashew",
        "Coconut",
        "Coconut milk",
        "Hazelnut",
        "Kola nut",
        "Macadamia",
        "Pecan nut",
        "Pistachio",
        "Sweet chestnut",
        "Tigernut",
        "Walnut",
      ],
      Spices: [
        "Anise",
        "Basil",
        "Bay leaf",
        "Caraway",
        "Cardamom",
        "Cayenne pepper",
        "Chili (red)",
        "Cinnamon",
        "Clove",
        "Coriander",
        "Mustard",
        "Cumin",
        "Curry",
        "Dill",
        "Fenugreek",
        "Ginger",
        "Juniper berry",
        "Lemongrass",
        "Majoram",
        "Mint",
        "Nutmeg",
        "Oregano",
        "Paprika",
        "Parsley",
        "Pepper ⚫⚪🟢🔴🟡",
        "Rosmary",
        "Sage",
        "Tarragon",
        "Thyme",
        "Turmeric",
        "Vanilla",
      ],
      "Herbal Tees & Coffee": [
        "Chamomile",
        "Cocoa",
        "Coffee",
        "Hibiscus",
        "Jasmine",
        "Moringa",
        "Peppermint",
        "Tea black",
        "Tea green",
      ],
      "Novel Foods": [
        "Almond milk",
        "Aloe",
        "Aronia",
        "Baobab",
        "Chia seed",
        "Chlorella",
        "Dandelion root",
        "Ginkgo",
        "Ginseng",
        "Greater burdock root",
        "Guarana",
        "House cricket",
        "Maca root",
        "Mealworm",
        "Migratory locust",
        "Nori",
        "Safflower oil",
        "Spirulina",
        "Tapioca",
        "Wakame",
        "Yacón root",
      ],
      Others: [
        "Agar Agar",
        "Aspergillus niger",
        "Baker's yeast",
        "Brewer's yeast",
        "Cane sugar",
        "Elderflower",
        "Honey",
        "Hops",
        "M-Transglutaminase, meat glue",
      ],
      CCD: ["Human Lactoferrin"],
    };

    // Begin constructing CSV rows
    const csvRows = [];
    const sum = data.reduce((accumulator, currentValue) => {
      return accumulator + Math.round(currentValue.value);
    }, 0);
    // Add static header information
    csvRows.push(`KIT ID : ${newdata.kitid}`);
    // csvRows.push(`Practitioner Name${newdata}`);
    // csvRows.push(`Practitioner Email${newdata}`);
    csvRows.push(`Patient Name : ${newdata.patientName}`);
    csvRows.push(`Sample Date : ${newdata.SampleDate}`);
    csvRows.push(`Total Immune Load : ${sum}`);
    csvRows.push(""); // Empty line for spacing
    csvRows.push("YourGutMap IgG Food Sensitivity Screen");
    csvRows.push(""); // Empty line for spacing

    // Add categories and their data
    // Object.keys(categories).forEach((category) => {
    for (let i = 0; i < Object.keys(categories).length; i++) {
      const category = Object.keys(categories)[i];
      // Add category name, "FOODS", and "SCORE" headers
      csvRows.push(category);
      csvRows.push(`FOODS, SCORE`);

      // Add data for each item in the category
      // categories[category].forEach((item) => {
      //   csvRows.push(`${item}, ${item.value}`);
      // });
      {
        data.map((mydata, index) => (
          <>
            {(categories[Object.keys(categories)[i]] || {}).includes(
              getName(mydata.name)
            )
              ? csvRows.push(
                  `${getName(mydata.name)},${mydata.value.toFixed(2)}`
                )
              : null}
          </>
        ));
      }

      // Add an empty line after each category
      csvRows.push("");
    }

    const csvContent = csvRows.join("\n");

    // Create and trigger the download
    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    link.target = "_blank";
    link.download = `fs_report_${newdata.kitid}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        .then((result) => setpractitioner(result));
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

  var cout = 0;
  var cout2 = 0;

  var data = [];
  var data222 = [];

  const [searchTerm, setSearchTerm] = useState("");
  var options = [];

  const dooption = () => {
    practitioner.map((value, index) => {
      // options = [
      //   { value: 'Burns Bay Road' },

      // ];
      // const newvalue = toString(value.kitid)
      options.push({ value: value.name });
      options.push({ value: value.email });
    });

    kit.map((value, index) => {
      if (value.result && value.result.length !== 0) {
        options.push({ value: value.kitid });
        options.push({ value: value.patientName });
        options.push({ value: value.resultDate });
        options.push({ value: value.SampleDate });
        options.push({ value: value.DOB });
      }
    });
  };

  const handleInputChange = async (e) => {
    e.preventDefault();

    // Ensure `searchTerm` is a string and convert to lowercase
    const searchQuery = searchTerm?.toString().toLowerCase() || "";

    // Filter `practitioner` safely
    const filteredSuggestionspra = practitioner.filter((item) => {
      const name = item?.name?.toString().toLowerCase() || "";
      const email = item?.email?.toString().toLowerCase() || "";
      return name.includes(searchQuery) || email.includes(searchQuery);
    });

    // Convert `searchTerm` to integer (if needed)
    const intttt2 = parseInt(searchTerm, 10) || searchTerm;

    // Filter `kit` safely
    const filteredSuggestions = kit.filter((item) => {
      const resullll = item.result;

      if (resullll && resullll.length !== 0) {
        const DOB = item.DOB?.toLowerCase() || "";
        const patientName = item.patientName?.toLowerCase() || "";
        const sampleDate = item.SampleDate?.toLowerCase() || "";
        const resultDate = item.resultDate?.toLowerCase() || "";
        const assignedTo = item.assignedto?.toLowerCase() || "";

        return (
          DOB.includes(searchQuery) ||
          patientName.includes(searchQuery) ||
          sampleDate.includes(searchQuery) ||
          resultDate.includes(searchQuery) ||
          item.kitid === intttt2 ||
          filteredSuggestionspra.some(
            (itemmm) => itemmm._id.toLowerCase() === assignedTo
          )
        );
      }
      return false; // Return false if `resullll` is invalid
    });

    // Update the state with the filtered data
    setkit(filteredSuggestions);
    setsearchdone(true);
  };

  const [searchdone, setsearchdone] = useState(false);

  const clearsearch = async () => {
    const hide = message.loading("Action in progress", 0);

    if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,

        redirect: "follow",
      };

      await fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions)
        .then((response) => response.json())
        .then((result) => setkit(result));

      var myHeaders2 = new Headers();
      myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");

      var requestOptions2 = {
        method: "GET",
        headers: myHeaders2,

        redirect: "follow",
      };

      await fetch(
        `${process.env.REACT_APP_API_URL}/getallpractitioner`,
        requestOptions2
      )
        .then((response) => response.json())
        .then((result) => setpractitioner(result));
    } else if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {
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
        .then((result) => setkit(result))
        .catch((error) => console.log("error", error));
    }

    await setsearchdone(false);
    setTimeout(() => {
      hide(); // Call hide to stop the loading message
      message.success("Action completed successfully");
    }, 2000);
  };

  const [userinfo, setuserinfo] = useState([]);
  const [popupdetails, setpopupdetails] = useState(false);

  const urlTest = "https://report.test4.life/";
  const urlSupply = "https://report-sl.test4.life/";

  const items = [
    {
      key: "1",
      label: (
        // <a href={"https://report.test4.life/" + userinfo._id} target="_blank" rel="noopener noreferrer" onClick={async () => {
        <a
          href={
            (userinfo && userinfo.kitid && userinfo._id.includes("SL")
              ? urlSupply
              : userinfo.reportType) + userinfo._id
          }
          target="_blank"
          rel="noopener noreferrer"
          onClick={async () => {}}
        >
          View result
        </a>
      ),
      icon: (
        <MdOutlineViewDay
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
          onClick={async () => {
            const hide = message.loading("Action in progress", 0);

            var myHeaders = new Headers();
            myHeaders.append(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );

            var urlencoded = new URLSearchParams();
            urlencoded.append("_id", userinfo._id);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded,
              redirect: "follow",
            };

            try {
              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/viewwholereport`,
                requestOptions
              );
              const result = await response.json();
              setkit2(result);
              setResult2(result.result);

              // Wait for 2 seconds
              await new Promise((resolve) => setTimeout(resolve, 500));

              // Call the DownloadPDF function after waiting
              // DownloadPDF(userinfo.patientName);
            } catch (error) {
              console.log("error", error);
            }

            setTimeout(() => {
              hide(); // Call hide to stop the loading message
              message.success("Action completed successfully");
            }, 2000);
          }}
        >
          Download Results as CSV
        </a>
      ),
      icon: (
        <BsCloudDownload
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
            urlencoded.append("_id", userinfo._id);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded,
              redirect: "follow",
            };
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/sentresults210`,
              requestOptions
            );
            const result = await response.json();
            await setkit(result);
            await setpopupdetails(false);
            setTimeout(() => {
              hide(); // Call hide to stop the loading message
              message.success("Action completed successfully");
            }, 2000);
          }}
        >
          Send Results
        </a>
      ),
      disabled: userinfo.ackresult,

      icon: (
        <AiOutlineMail
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
  ];

  const items2 = [
    {
      key: "1",
      label: (
        <a
          href={(() => {
            // Find the practitioner with matching ID
            const myPractitioner = practitioner.find(
              (practitioners) => practitioners._id === userinfo.assignedto
            );

            // Determine the base URL
            const baseUrl =
              userinfo && userinfo.kitid && userinfo.kitid.includes("SL")
                ? urlSupply
                : myPractitioner && myPractitioner.reportType
                ? myPractitioner.reportType
                : urlTest;

            // Return the full URL
            return baseUrl + userinfo._id;
          })()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={async () => {
            console.log(practitioner);
          }}
        >
          View Result
        </a>
      ),
      icon: (
        <MdOutlineViewDay
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },

    // {
    //    key: '2',
    //    label: (
    //      <a target="_blank" rel="noopener noreferrer" onClick={async () => {

    //        const hide = message.loading("Action in progress", 0)

    //        var myHeaders = new Headers();
    //        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    //        var urlencoded = new URLSearchParams();
    //        urlencoded.append("_id", userinfo._id);

    //        var requestOptions = {
    //          method: 'POST',
    //          headers: myHeaders,
    //          body: urlencoded,
    //          redirect: 'follow'
    //        };

    //        try {
    //          const response = await fetch(`${process.env.REACT_APP_API_URL}/viewwholereport`, requestOptions);
    //          const result = await response.json();
    //          setkit2(result);
    //          setResult2(result.result);

    //          // Wait for 2 seconds
    //          await new Promise(resolve => setTimeout(resolve, 500));

    //          // Call the function to download CSV
    //          console.log(result.result["name"])
    //          console.log(result.result["value"])
    //          downloadCSV(result.result);

    //          // Call the DownloadPDF function after waiting
    //         //  DownloadPDF(userinfo.patientName);
    //        } catch (error) {
    //          console.log('error', error);
    //        }

    //        setTimeout(() => {
    //          hide(); // Call hide to stop the loading message
    //          message.success("Action completed successfully");
    //        }, 2000);

    //      }}>
    //        Download Results
    //      </a>
    //    ),
    //    icon: <BsCloudDownload style={{ width: '20px', height: '20px', color: '#4885B9' }} />,
    // },

    {
      key: "2",
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
            urlencoded.append("_id", userinfo._id);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded,
              redirect: "follow",
            };

            try {
              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/viewwholereport`,
                requestOptions
              );
              const result = await response.json();
              setkit2(result);
              setResult2(result.result);

              // Wait for 2 seconds
              await new Promise((resolve) => setTimeout(resolve, 500));

              // Call the function to download CSV with filtered fields
              downloadCSV(result);
            } catch (error) {
              console.log("error", error);
            }

            setTimeout(() => {
              hide(); // Call hide to stop the loading message
              message.success("Action completed successfully");
            }, 2000);
          }}
        >
          Download Results as CSV
        </a>
      ),
      icon: (
        <BsCloudDownload
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },

    // Function to download the CSV file

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
            urlencoded.append("_id", userinfo._id);

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: urlencoded,
              redirect: "follow",
            };

            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/sentresults`,
              requestOptions
            );
            const result = await response.json();
            await setkit(result);

            await setpopupdetails(false);

            setTimeout(() => {
              hide(); // Call hide to stop the loading message
              message.success("Action completed successfully");
            }, 2000);
          }}
        >
          Send Results
        </a>
      ),
      disabled: userinfo.ackresult,

      icon: (
        <AiOutlineMail
          style={{ width: "20px", height: "20px", color: "#4885B9" }}
        />
      ),
    },
  ];

  var sno1 = 1;
  var sno2 = 1;

  return (
    <>
      {(token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ||
        token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") && (
        <>
          <Navbar />
          <div className="deshboardmain">
            <Sidemanu />
            <div className="adminkitmainbody">
              <div className="header">
                <h1>Food Sensitivity Reports</h1>
                {dooption()}
                {searchdone === false && (
                  <>
                    <form onSubmit={handleInputChange}>
                      <AutoComplete
                        type="number"
                        style={{ width: 200 }}
                        options={options}
                        placeholder="Email/Name/Patient Name/Sample Date/upload/practitioner/NamePractitioner Email "
                        filterOption={(inputValue, options) => {
                          const value = options?.value || "";
                          // options?.value?.toString().toUpperCase().indexOf(inputValue.toUpperCase().toString()) !== -1
                          return value
                            .toString()
                            .toUpperCase()
                            .includes(inputValue?.toUpperCase() || "");
                          //  console.log(kitss)
                        }}
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

              {popupdetails === true && (
                <>
                  <div
                    onClick={() => {
                      setpopupdetails(false);
                      setCSVFile(null);
                    }}
                    className="popupbg"
                  ></div>
                  <div className="popup">
                    <div className="header">
                      <h2>Kits Result Details</h2>
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
                          {userinfo.kitid}{" "}
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
                          <FaRegUser
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
                          {practitioner.map((item2, index) => (
                            <>
                              {item2._id === userinfo.assignedto && (
                                <>
                                  <td>{item2.name}</td>

                                  {/* <td>{item2.email}</td> */}
                                </>
                              )}
                            </>
                          ))}
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
                          <TbUserShare
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
                          {practitioner.map((item2, index) => (
                            <>
                              {item2._id === userinfo.assignedto && (
                                <>
                                  <td>{item2.email}</td>
                                </>
                              )}
                            </>
                          ))}
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
                          <ImUserTie
                            style={{
                              width: "20px",
                              height: "20px",
                              margin: "0 10px",
                            }}
                          />{" "}
                          Patient Name
                        </h3>
                        <h3
                          style={{
                            display: "flex",
                            color: "#6E4E9F",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          {userinfo.patientName}{" "}
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
                          <BsCalendar2DateFill
                            style={{
                              width: "20px",
                              height: "20px",
                              margin: "0 10px",
                            }}
                          />{" "}
                          Date of birth
                        </h3>
                        <h3
                          style={{
                            display: "flex",
                            color: "#6E4E9F",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          {userinfo.DOB}{" "}
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
                          Sample Date
                        </h3>
                        <h3
                          style={{
                            display: "flex",
                            color: "#6E4E9F",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          {userinfo.SampleDate}{" "}
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
                          <MdOutlineUpdate
                            style={{
                              width: "20px",
                              height: "20px",
                              margin: "0 10px",
                            }}
                          />{" "}
                          Result upload on
                        </h3>
                        <h3
                          style={{
                            display: "flex",
                            color: "#6E4E9F",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          {userinfo.resultDate}{" "}
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
                          <AiOutlineInteraction
                            style={{
                              width: "20px",
                              height: "20px",
                              margin: "0 10px",
                            }}
                          />{" "}
                          Action
                        </h3>
                        <h3
                          style={{
                            display: "flex",
                            color: "#6E4E9F",
                            alignItems: "center",
                          }}
                        >
                          <Dropdown
                            menu={{
                              items:
                                userinfo.Kittype === "210" ? items : items2,
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
                        </h3>
                      </div>
                    </div>

                    <div className="bownpopupbutton">
                      <button
                        onClick={() => {
                          setpopupdetails(false);
                        }}
                        style={{ border: "1px solid red", color: "black" }}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                </>
              )}

              {kit.length !== 0 && (
                <>
                  <div className="header">
                    <h3>Food Sensitivity</h3>
                  </div>
                  <div className="imp">
                    <table className="tablep">
                      <thead className="tablephead">
                        <tr>
                          <th>S NO.</th>

                          <th>Kit ID</th>

                          <th>Sample Date</th>

                          {token ===
                            "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
                            <>
                              {" "}
                              <th>Practitioner Name</th>
                            </>
                          )}
                          {token ===
                            "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
                            <>
                              {" "}
                              <th>Practitioner Email</th>
                            </>
                          )}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kit.map((item, index) => (
                          <>
                            {item.result.length !== 0 && (
                              <>
                                <tr>
                                  <td>{sno1++}</td>

                                  <td>{item.kitid}</td>

                                  <td>{item.SampleDate}</td>

                                  {practitioner.map((item2, index) => (
                                    <>
                                      {item2._id === item.assignedto && (
                                        <>
                                          <td>{item2.name}</td>

                                          <td>{item2.email}</td>
                                        </>
                                      )}
                                    </>
                                  ))}

                                  {/* <td className='assignbuttom' ><BsCloudDownload onClick={async () => {


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





                          try {
                            const response = await fetch("${process.env.REACT_APP_API_URL}/viewwholereport", requestOptions);
                            const result = await response.json();
                            setkit2(result);
                            setResult2(result.result);

                            // Wait for 2 seconds
                            await new Promise(resolve => setTimeout(resolve, 500));

                            // Call the DownloadPDF function after waiting
                            DownloadPDF(item.patientName);
                          } catch (error) {
                            console.log('error', error);
                          }











                        }} className='hovar' style={{ width: '30px', height: '30px', color: '#4180b7' }} /></td> */}

                                  {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
                          {item.ackresult ? (<><td>Result Already Sent</td></>) : (<>
                            <td  ><AiOutlineMail onClick={async () => {



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






                              const response = await fetch("${process.env.REACT_APP_API_URL}/sentresults210", requestOptions);
                              const result = await response.json();
                              await setkit(result);












                            }} className='hovar' style={{ width: '30px', height: '30px', color: '#4180b7' }} /></td>

                          </>)}
                        </>} */}

                                  <td>
                                    <button
                                      className="button"
                                      onClick={() => {
                                        setpopupdetails(true);
                                        setuserinfo(item);
                                      }}
                                    >
                                      Detail
                                    </button>
                                  </td>
                                </tr>
                              </>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* <a onClick={downloadCSV} style={{ display: 'flex', textAlign: 'right', justifyContent: 'end', width: '100%' }} href='/'>Download this data as CSV</a > */}
                </>
              )}

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
export default Adminreport;
