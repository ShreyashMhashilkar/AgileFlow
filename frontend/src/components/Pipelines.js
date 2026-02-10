import Layout from "./Layout";
import {
 Card,
 Typography,
 Button,
 Chip,
 Box,
 LinearProgress,
 ToggleButton,
 ToggleButtonGroup,
 IconButton,
 Fade,
 useMediaQuery,
 CircularProgress
} from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import DownloadIcon from "@mui/icons-material/Download";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useState, useEffect, useRef } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";

export default function Pipelines(){

 const [pipes,setP]=useState([]);
 const [filter,setFilter]=useState("ALL");
 const mobile=useMediaQuery("(max-width:900px)");
 const {user}=useAuth();

 const timers = useRef({});
 const runningIds = useRef(new Set()); // 👈 force loader visibility

 /* LOAD SAVED PIPELINES */
 useEffect(()=>{
  if(!user) return;

  api.get("pipelines/")
   .then(r=>setP(r.data||[]))
   .catch(()=>{});
 },[user]);

 /* RUN PIPELINE */
 const runPipeline = async()=>{

  if(!user){
   runDemo();
   return;
  }

  const r = await api.post("pipelines/",{
   name:"🚀 Production Deploy",
   status:"RUNNING",
   progress:0,
   logs:"Booting runner...\n"
  });

  runningIds.current.add(r.data.id); // 👈 mark running

  setP(p=>[r.data,...p]);
  simulate(r.data.id,true);
 };

 /* DEMO RUN */
 const runDemo=()=>{
  const id=Date.now();

  runningIds.current.add(id);

  setP(p=>[{
   id,
   name:"🚀 Production Deploy",
   status:"RUNNING",
   progress:0,
   logs:"Booting runner...\n"
  },...p]);

  simulate(id,false);
 };

 /* 30 SECOND SIMULATION */
 const simulate=(id,persist)=>{

  let progress=0;

  const steps=[
   "Installing deps...\n",
   "Running tests...\n",
   "Building containers...\n",
   "Provisioning cloud...\n",
   "Deploying...\n"
  ];

  timers.current[id]=setInterval(()=>{

   setP(prev=>prev.map(x=>{
    if(x.id!==id) return x;

    if(x.status==="FAILED"){
     clearInterval(timers.current[id]);
     runningIds.current.delete(id);
     return x;
    }

    progress+=4; // ~30s

    const log=steps[Math.floor(progress/20)]||"";

    if(persist){
     api.patch(`pipelines/${id}/`,{progress});
    }

    if(progress>=100){
     clearInterval(timers.current[id]);
     runningIds.current.delete(id);

     if(persist){
      api.patch(`pipelines/${id}/`,{
       status:"SUCCESS",
       progress:100,
       logs:"Deployment Success 🚀"
      });
     }

     return {
      ...x,
      progress:100,
      status:"SUCCESS",
      logs:x.logs+"\nDeployment Success 🚀"
     };
    }

    return {...x,progress,logs:x.logs+log};
   }));

  },1000);
 };

 /* STOP */
 const cancel=async id=>{

  clearInterval(timers.current[id]);
  runningIds.current.delete(id);

  setP(p=>p.map(x=>
   x.id===id
    ? {...x,status:"FAILED",progress:100,logs:x.logs+"\nCanceled ❌"}
    : x
  ));

  if(user){
   await api.patch(`pipelines/${id}/`,{
    status:"FAILED",
    progress:100,
    logs:"Canceled ❌"
   });
  }
 };

 /* DOWNLOAD */
 const download=p=>{
  const b=new Blob([p.logs],{type:"text/plain"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(b);
  a.download="pipeline.log";
  a.click();
 };

 const color=s=>s==="SUCCESS"?"success":s==="RUNNING"?"warning":"error";
 const filtered=filter==="ALL"?pipes:pipes.filter(x=>x.status===filter);

 return(
 <Layout>

 <Card sx={{
  p:mobile?3:4,
  mb:3,
  borderRadius:5,
  color:"white",
  background:"linear-gradient(135deg,#7c3aed,#2563eb,#06b6d4)",
  boxShadow:"0 25px 50px rgba(0,0,0,.35)"
 }}>
  <Typography variant={mobile?"h5":"h4"} fontWeight={800}>
   ⚡ CI/CD Pipelines
  </Typography>

  <Typography fontSize={mobile?13:14}>
   Build • Test • Deploy in real-time
  </Typography>

  <Button
   fullWidth={mobile}
   sx={{mt:3,px:4,py:1.5,borderRadius:99}}
   variant="contained"
   startIcon={<RocketLaunchIcon/>}
   onClick={runPipeline}
  >
   Run Pipeline
  </Button>
 </Card>

 <ToggleButtonGroup
  value={filter}
  exclusive
  fullWidth={mobile}
  onChange={(_,v)=>v&&setFilter(v)}
  sx={{mb:3}}
 >
  <ToggleButton value="ALL">All</ToggleButton>
  <ToggleButton value="RUNNING">Running</ToggleButton>
  <ToggleButton value="SUCCESS">Success</ToggleButton>
  <ToggleButton value="FAILED">Failed</ToggleButton>
 </ToggleButtonGroup>

 {filtered.map((p,i)=>{

 const isRunning = runningIds.current.has(p.id) || p.status==="RUNNING";

 return(
 <Fade in timeout={600+i*200} key={p.id}>
 <Card sx={{
  p:mobile?2:3,
  mb:3,
  borderRadius:4,
  background:"linear-gradient(180deg,#fff,#f0f9ff)",
  boxShadow:"0 20px 40px rgba(37,99,235,.25)"
 }}>

 <Box sx={{display:"flex",justifyContent:"space-between",flexDirection:mobile?"column":"row"}}>
  <Typography fontWeight={700}>{p.name}</Typography>

  <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
   <Chip label={p.status} color={color(p.status)}/>

   {isRunning && (
    <>
     <CircularProgress
      size={22}
      thickness={5}
      sx={{
       color:"#ffffff",
       filter:"drop-shadow(0 0 6px #22d3ee)"
      }}
     />

     <IconButton size="small" onClick={()=>cancel(p.id)}>
      <StopIcon sx={{color:"#ef4444"}}/>
     </IconButton>
    </>
   )}

   <IconButton size="small" onClick={()=>download(p)}>
    <DownloadIcon/>
   </IconButton>
  </Box>
 </Box>

 {isRunning && (
 <LinearProgress
  variant="determinate"
  value={p.progress}
  sx={{
   mt:2,
   height:10,
   borderRadius:5,
   "& .MuiLinearProgress-bar":{
    background:"linear-gradient(90deg,#7c3aed,#22d3ee)"
   }
  }}
 />
 )}

 <Box sx={{
  mt:2,
  p:2,
  borderRadius:2,
  background:"#020617",
  color:"#22d3ee",
  fontFamily:"monospace",
  maxHeight:mobile?140:200,
  overflow:"auto",
  fontSize:mobile?11:13
 }}>
  <pre style={{margin:0}}>{p.logs}</pre>
 </Box>

 </Card>
 </Fade>
 );
 })}

 </Layout>
 );
}
