import Layout from "./Layout";
import {
 Box,
 Card,
 Typography,
 Button,
 Dialog,
 TextField,
 Divider,
 Badge,
 useMediaQuery,
 Stack,
 Chip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useState, useEffect } from "react";
import { useDemo } from "../demoStore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api";

export default function Dashboard(){

 const { demoProjects, demoSprints } = useDemo();
 const { user } = useAuth();
 const nav = useNavigate();
 const mobile = useMediaQuery("(max-width:900px)");

 const [projects,setProjects]=useState([]);
 const [sprints,setSprints]=useState([]);

 const [open,setOpen]=useState(false);
 const [sprintOpen,setSprintOpen]=useState(false);
 const [guestOpen,setGuestOpen]=useState(false);

 const [name,setName]=useState("");
 const [sprintName,setSprintName]=useState("");
 const [selected,setSelected]=useState(null);

 useEffect(()=>{
  if(!user) return;
  api.get("projects/").then(r=>setProjects(r.data||[]));
  api.get("sprints/").then(r=>setSprints(r.data||[]));
 },[user]);

 const visible = user ? projects : demoProjects;

 return(
 <Layout>

 {/* HERO */}
 <Card sx={{
  p:mobile?3:4,
  mb:5,
  borderRadius:6,
  color:"white",
  background:"linear-gradient(135deg,#6366f1,#22d3ee)",
  boxShadow:"0 30px 60px rgba(0,0,0,.25)"
 }}>
  <Stack spacing={1.5}>
   <Typography variant={mobile?"h5":"h4"} fontWeight={900}>
    🚀 AgileFlow Workspace
   </Typography>

   <Typography opacity={.9} fontSize={14}>
    Plan smarter • Execute faster • Ship with confidence
   </Typography>

   <Stack direction="row" spacing={2}>
    <Button
     startIcon={<RocketLaunchIcon/>}
     variant="contained"
     sx={{
      px:3,
      py:1,
      borderRadius:99,
      background:"white",
      color:"#4f46e5",
      fontWeight:700
     }}
     onClick={()=>user?setOpen(true):setGuestOpen(true)}
    >
     Create Project
    </Button>

    {!user && (
     <Chip label="Demo Mode" sx={{background:"#fde047",fontWeight:700}}/>
    )}
   </Stack>
  </Stack>
 </Card>

 {/* SECTION TITLE */}
 <Box sx={{
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  mb:3
 }}>
  <Typography variant="h6" fontWeight={900}>
   {user?"Your Projects":"Demo Projects"}
  </Typography>

  <Button startIcon={<AddIcon/>} variant="outlined"
   onClick={()=>user?setOpen(true):setGuestOpen(true)}>
   New Project
  </Button>
 </Box>

 {/* PROJECT GRID */}
 <Box sx={{
  display:"grid",
  gridTemplateColumns:mobile?"1fr":"repeat(auto-fill,minmax(360px,1fr))",
  gap:4
 }}>

 {visible.map(p=>{

  const ps = user
   ? sprints.filter(s=>s.project===p.id)
   : demoSprints.filter(s=>s.project===p.id);

  return(

<Card
 key={p.id}
 sx={{
  position:"relative",
  p:3,
  borderRadius:5,
  background:"#ffffff",
  boxShadow:"0 18px 40px rgba(15,23,42,.08)",
  overflow:"hidden"
 }}
>

 {/* LEFT ACCENT BAR */}
 <Box sx={{
  position:"absolute",
  left:0,
  top:0,
  height:"100%",
  width:6,
  background:"linear-gradient(180deg,#6366f1,#22d3ee)"
 }}/>

 {/* HEADER */}
 <Stack spacing={1} mb={2}>
  <Typography fontWeight={900}>{p.name}</Typography>

  <Chip
   size="small"
   label={`${ps.length} sprints`}
   sx={{
    width:"fit-content",
    background:"#eef2ff",
    color:"#4f46e5",
    fontWeight:700
   }}
  />
 </Stack>

 <Divider sx={{mb:2}}/>

 {/* SPRINTS */}
 <Stack spacing={1.5}>
 {ps.map(s=>(
  <Card
   key={s.id}
   onClick={()=>nav(`/sprint/${s.id}`)}
   sx={{
    p:2,
    borderRadius:3,
    cursor:"pointer",
    background:"#f8fafc",
    boxShadow:"inset 0 0 0 1px #e5e7eb"
   }}
  >

   <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Box>
     <Typography fontWeight={700}>{s.name}</Typography>
     <Typography fontSize={12} color="#64748b">
      {s.tasks?.length||0} tasks
     </Typography>
    </Box>

    <ArrowForwardIcon sx={{color:"#6366f1"}}/>
   </Stack>

  </Card>
 ))}
 </Stack>

 {user && (
  <Button size="small" sx={{mt:2}}
   onClick={()=>{setSelected(p.id);setSprintOpen(true)}}>
   + Add Sprint
  </Button>
 )}

</Card>

  );
 })}

 </Box>

 {/* CREATE PROJECT */}
 <Dialog open={open} onClose={()=>setOpen(false)}>
  <Box sx={{p:4,minWidth:320}}>
   <Typography fontWeight={800} mb={2}>Create Project</Typography>
   <TextField fullWidth label="Project Name"
    value={name} onChange={e=>setName(e.target.value)}/>
   <Button fullWidth sx={{mt:3}} variant="contained"
    onClick={async()=>{
     await api.post("projects/",{name});
     setName("");
     setOpen(false);
     const r=await api.get("projects/");
     setProjects(r.data||[]);
    }}>
    Create
   </Button>
  </Box>
 </Dialog>

 {/* ADD SPRINT */}
 <Dialog open={sprintOpen} onClose={()=>setSprintOpen(false)}>
  <Box sx={{p:4,minWidth:320}}>
   <Typography fontWeight={800} mb={2}>New Sprint</Typography>
   <TextField fullWidth label="Sprint Name"
    value={sprintName} onChange={e=>setSprintName(e.target.value)}/>
   <Button fullWidth sx={{mt:3}} variant="contained"
    onClick={async()=>{
     await api.post("sprints/",{name:sprintName,project:selected});
     setSprintOpen(false);
     setSprintName("");
     const r=await api.get("sprints/");
     setSprints(r.data||[]);
    }}>
    Add Sprint
   </Button>
  </Box>
 </Dialog>

 {/* GUEST */}
 <Dialog open={guestOpen} onClose={()=>setGuestOpen(false)}>
  <Box sx={{p:5,textAlign:"center",maxWidth:360}}>
   <LockIcon sx={{fontSize:50,color:"#6366f1"}}/>
   <Typography variant="h6" fontWeight={800} mt={2}>
    Login Required
   </Typography>

   <Typography fontSize={14} mt={1}>
    Unlock projects, sprints, boards & pipelines.
   </Typography>

   <Button fullWidth sx={{mt:3}} variant="contained"
    onClick={()=>nav("/login")}>
    Login / Register
   </Button>

   <Button fullWidth sx={{mt:1}} onClick={()=>setGuestOpen(false)}>
    Continue Demo
   </Button>
  </Box>
 </Dialog>

 </Layout>
 );
}
