import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Prayers } from "./Prayers";
import { Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img1 from "../assets/Images/79966c401e.png";
import img2 from "../assets/Images/hadith-on-qiyam-ul-layl-1024x576.jpg";
import img3 from "../assets/Images/images.jpg";
import img4 from "../assets/Images/Tahajjud-time.png";
import img5 from "../assets/Images/the-qiyam-al-layl-prayer-1.jpg";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";
moment.locale("ar");
export const MainComponent = () => {
  const [nextPrayerIndex, setNextPrayerIndex] = useState(1);
  const [remaningTime,setRemaningTime]=useState("")
  const [timing, setTiming] = useState({
    Asr: "14:36",
    Dhuhr: "11:45",
    Fajr: "05:04",
    Isha: "18:17",
    Maghrib: "16:54",
  });
  const [selectedCity, setSelectedCity] = useState({
    apiCityName: "cairo",
    displayedNAme: "القاهرة",
  });
  const availableCity = [
    {
      apiCityName: "cairo",
      displayedNAme: "القاهرة",
    },
    {
      apiCityName: "alex",
      displayedNAme: "الاسكندرية",
    },
    {
      apiCityName: "aswan",
      displayedNAme: "اسوان",
    },
    {
      apiCityName: "luxer",
      displayedNAme: "الاقصر",
    },
  ];
  // change prayers name to arabic
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const [today, setToday] = useState("");
  // const [timer,setTimer]=useState("10")
  //to handle the city
  const handleCityChange = (event) => {
    const cityObject = availableCity.find((city) => {
      return city.apiCityName == event.target.value;
    });
    setSelectedCity(cityObject);
  };
  //Async function to help to get the timings correct
  const getPrayerTimings = async () => {
    // console.log("JJJJJJJJ")
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity/05-12-2024?country=EGP&city=${selectedCity.apiCityName}`
    );
    setTiming(data.data.data.timings);
  };
  const setCountDownTimer = () => {
    // console.log("Timing:", timing);

    const momentNow = moment();
    let nextPrayer = 1;

    // check what is the next Prayer
    if (
      momentNow.isAfter(moment(timing["Fajr"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Dhuhr"], "HH:mm"))
    ) {
      nextPrayer = 1;
    } else if (
      momentNow.isAfter(moment(timing["Dhuhr"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Asr"], "HH:mm"))
    ) {
      nextPrayer = 2;
    } else if (
      momentNow.isAfter(moment(timing["Asr"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Maghrib"], "HH:mm"))
    ) {
      nextPrayer = 3;
    } else if (
      momentNow.isAfter(moment(timing["Maghrib"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Isha"], "HH:mm"))
    ) {
      nextPrayer = 4;
    } else {
      nextPrayer = 0;
    } 
    setNextPrayerIndex(nextPrayer);
    
    // countDown Timer for next prayer
    const nextPrayerObject = prayersArray[nextPrayer];
    console.log(nextPrayerObject)

    const nextPrayerTime = timing[nextPrayerObject.key];
    console.log(nextPrayerObject.key)
    const nextPrayerMoment = moment(nextPrayerTime, "HH:mm");
    let remaningTime = moment(nextPrayerTime, "HH:mm").diff(momentNow);
    
    if (remaningTime < 0) {
      const midnightDiff = moment("23:59:59", "HH:mm:ss").diff(momentNow);
			const fajrToMidnightDiff = nextPrayerMoment.diff(
        moment("00:00:00", "HH:mm:ss")
			);
      
      console.log("Next Prayer Time:", moment(timing[nextPrayerObject.key], "HH:mm").toString());
			const totalDiffernce = midnightDiff + fajrToMidnightDiff;

			remaningTime = totalDiffernce;
    }
    const durationRemainingTime = moment.duration(remaningTime);
    setRemaningTime(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()} `)

    console.log(durationRemainingTime.hours(),remaningTime);
  };
  // to get the api in the first time
  useEffect(() => {
    
    getPrayerTimings();
  }, [selectedCity]);
  
  useEffect(() => {
    
   let interval= setInterval(()=>{
      setCountDownTimer();
  },1000)
    const t = moment();
    setToday(t.format("Do MMMM YYYY | h:mm:ss "));
    return () => {
			clearInterval(interval);
		};
  }, [timing]);
  return (
    <>
      <Container>
        <Grid container xs={12}>
          <Grid xs={6}>
            {" "}
            {/* Ensures each grid item takes 50% of the width */}
            <p>{today}</p>
            <h2>{selectedCity.displayedNAme}</h2>
            {/* <p>{timer}</p> */}
          </Grid>
          <Grid xs={6}>
            {" "}
            {/* Ensures each grid item takes 50% of the width */}
            <p>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</p>
            <h2>{remaningTime}</h2>
          </Grid>
        </Grid>
        <Divider
          variant="middle"
          style={{ borderColor: "white", opacity: 0.3 }}
        />
        <Stack
          marginBlock={10}
          direction={"row"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          gap={2}
        >
          <Prayers prayerName={"الفجر"} time={timing.Fajr} img={img1} />
          <Prayers prayerName={"الظهر"} time={timing.Dhuhr} img={img2} />
          <Prayers prayerName={"العصر"} time={timing.Asr} img={img3} />
          <Prayers prayerName={"المغرب"} time={timing.Maghrib} img={img4} />
          <Prayers prayerName={"العشاء"} time={timing.Isha} img={img5} />
        </Stack>
        <Stack direction={"row"} justifyContent={"center"}>
          <FormControl style={{ width: 200, borderColor: "#fff" }}>
            <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleCityChange}
            >
              {availableCity.map((city) => {
                return (
                  <MenuItem key={city.apiCityName} value={city.apiCityName}>
                    {city.displayedNAme}
                  </MenuItem>
                );
              })}

              {/* <MenuItem value={"alex"}>الاسكندرية</MenuItem>
              <MenuItem value={"aswan"}>اسوان</MenuItem> */}
            </Select>
          </FormControl>
        </Stack>
      </Container>
    </>
  );
};
