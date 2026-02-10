import Layout from "./Layout";
import {
 Box,
 Card,
 Typography,
 Button,
 Chip,
 LinearProgress,
 TextField,
 Snackbar,
 Alert,
 useMediaQuery
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../auth/AuthContext";
import { useNavigate,useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { api } from "../api";

const cols=["todo","progress","done"];

const colColors={
 todo:"#fb923c",
 progress:"#6366f1",
 done:"#22c55e"
};

const colBg={
 todo:"rgba(251,146,60,.08)",
 progress:"rgba(99,102,241,.08)",
 done:"rgba(34,197,94,.08)"
};

export default function Kanban(){

 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("md"));

 const {user}=useAuth();
 const nav=useNavigate();
 const {id}=useParams();

 const [sprint,setSprint]=useState(null);
 const [tasks,setTasks]=useState([]);
 const [title,setTitle]=useState("");
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState(false);

 useEffect(()=>{
  if(!user) return;

  if(id){
   api.get(`sprints/${id}/`).then(res=>{
    setSprint(res.data);
    setTasks(res.data.tasks||[]);
    setLoading(false);
   });
  }else{
   api.get("sprints/").then(r=>{
    if(r.data.length){
     const latest = r.data[r.data.length-1];
     api.get(`sprints/${latest.id}/`).then(res=>{
      setSprint(res.data);
      setTasks(res.data.tasks||[]);
      setLoading(false);
     });
    }else setLoading(false);
   });
  }

 },[user,id]);

 /* ================= LOGIN REQUIRED ================= */

 if(!user){
  return(
   <Layout>
    <Box
     sx={{
      minHeight:"80vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
     }}
    >
     <Card sx={{
      p:5,
      borderRadius:6,
      textAlign:"center",
      maxWidth:380,
      width:"100%",
      boxShadow:"0 20px 40px rgba(0,0,0,.15)"
     }}>

      <LockIcon sx={{fontSize:60,color:"#6366f1"}}/>

      <Typography variant="h5" fontWeight={800} mt={2}>
       Login Required
      </Typography>

      <Typography sx={{opacity:.7,mt:1}}>
       Kanban boards unlock after login.
      </Typography>

      <Button
       fullWidth
       sx={{
        mt:4,
        py:1.2,
        background:"linear-gradient(135deg,#6366f1,#22d3ee)"
       }}
       variant="contained"
       onClick={()=>nav("/login")}
      >
       LOGIN
      </Button>

     </Card>
    </Box>
   </Layout>
  );
 }

 if(loading){
  return(
   <Layout>
    <Box textAlign="center" mt={10}>Loading sprint...</Box>
   </Layout>
  );
 }

 if(!sprint){
  return(
   <Layout>
    <Box textAlign="center" mt={10}>
     <Typography>No sprint created yet</Typography>
    </Box>
   </Layout>
  );
 }

 const moveTask = async (tid,status)=>{
  setTasks(t=>t.map(x=>x.id===tid?{...x,status}:x));
  await api.patch(`tasks/${tid}/`,{status});
 };

 return(
 <Layout>

 <Card sx={{
  p:3,
  mb:4,
  borderRadius:6,
  background:"linear-gradient(135deg,#6366f1,#22d3ee)",
  color:"white",
  boxShadow:"0 20px 40px rgba(0,0,0,.15)"
 }}>
  <Typography variant={isMobile?"h5":"h4"} fontWeight={800}>
   🚀 Active Sprint
  </Typography>
  <Typography>{sprint.name}</Typography>
 </Card>

 <Box
  sx={{
   display:"grid",
   gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",
   gap:3
  }}
 >

 {cols.map(c=>{
  const col=tasks.filter(t=>t.status===c);

  return(
  <Box key={c} sx={{background:colBg[c],borderRadius:5,p:2}}>

   <Box display="flex" justifyContent="space-between">
    <Typography fontWeight={800}>
     {c==="todo"?"📝 TODO":c==="progress"?"⚡ IN PROGRESS":"✅ DONE"}
    </Typography>
    <Chip label={col.length} sx={{background:colColors[c],color:"white"}}/>
   </Box>

   <LinearProgress
    variant="determinate"
    value={Math.min(col.length*25,100)}
    sx={{height:6,my:2,"& .MuiLinearProgress-bar":{background:colColors[c]}}}
   />

   {col.map(t=>(
    <Card key={t.id} sx={{
     p:2,mb:2,
     borderLeft:`6px solid ${colColors[c]}`,
     boxShadow:"0 10px 20px rgba(0,0,0,.12)"
    }}>

     <Typography fontWeight={700}>{t.title}</Typography>

     <Box
      sx={{
       display:"flex",
       flexDirection:isMobile?"column":"row",
       gap:1,
       mt:2
      }}
     >
      {cols.map(x=>(
 <Button
  key={x}
  size="small"
  fullWidth={isMobile}
  variant={x===c ? "contained" : "outlined"}
  sx={{
   flex:1,
   background: x===c ? colColors[x] : "transparent",
   borderColor: colColors[x],
   color: x===c ? "white" : colColors[x],
   "&:hover":{
    background: colColors[x],
    color:"white"
   }
  }}
  onClick={()=>moveTask(t.id,x)}
 >
  {x}
 </Button>
))}
     </Box>

    </Card>
   ))}

  </Box>
  );
 })}

 </Box>

 <Card sx={{
  mt:5,
  p:3,
  width:"100%",
  maxWidth:isMobile?"100%":450,
  borderRadius:5,
  boxShadow:"0 15px 30px rgba(0,0,0,.12)"
 }}>

 <Typography fontWeight={800} mb={2}>➕ Add New Task</Typography>

 <TextField
  fullWidth
  value={title}
  placeholder="What needs to be done?"
  onChange={e=>setTitle(e.target.value)}
 />

 <Button
  fullWidth
  sx={{mt:2}}
  variant="contained"
  onClick={async()=>{
   if(!title.trim()){
    setError(true);
    return;
   }

   const r=await api.post("tasks/",{
    title,
    sprint:sprint.id,
    status:"todo"
   });

   setTasks(t=>[...t,r.data]);
   setTitle("");
  }}
 >
  CREATE TASK
 </Button>

 </Card>

 <Snackbar
  open={error}
  autoHideDuration={3000}
  onClose={()=>setError(false)}
  anchorOrigin={{vertical:"bottom",horizontal:"center"}}
 >
  <Alert severity="warning">Please enter task title</Alert>
 </Snackbar>

 </Layout>
 );
}
