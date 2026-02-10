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
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useDemo } from "../demoStore";
import { useState,useEffect } from "react";
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

export default function SprintBoard(){

 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("md"));

 const {id}=useParams();
 const {demoSprints}=useDemo();

 const [sprint,setSprint]=useState(null);
 const [tasks,setTasks]=useState([]);
 const [title,setTitle]=useState("");
 const [isDemo,setIsDemo]=useState(false);
 const [error,setError]=useState(false);

 useEffect(()=>{

  const demo = demoSprints.find(x=>String(x.id)===id);

  if(demo){
   setSprint(demo);
   setTasks(demo.tasks);
   setIsDemo(true);
   return;
  }

  setIsDemo(false);

  api.get(`sprints/${id}/`)
   .then(r=>{
    setSprint(r.data);
    setTasks(r.data.tasks||[]);
   });

 },[id,demoSprints]);

 if(!sprint) return null;

 const moveTask = async (taskId,status)=>{
  setTasks(t=>t.map(x=>x.id===taskId?{...x,status}:x));
  if(isDemo) return;
  await api.patch(`tasks/${taskId}/`,{status});
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
   🚀 {sprint.name}
  </Typography>

  {isDemo && (
   <Chip label="DEMO MODE" sx={{mt:2,background:"#fde047",fontWeight:700}}/>
  )}
 </Card>

 <Box
  sx={{
   display:"grid",
   gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",
   gap:3
  }}
 >

 {cols.map(c=>{
  const col=tasks.filter(t=>(t.status||"todo")===c);

  return(
  <Box key={c} sx={{background:colBg[c],borderRadius:5,p:2}}>

   <Box sx={{display:"flex",justifyContent:"space-between",mb:1}}>
    <Typography fontWeight={800}>
     {c==="todo"?"📝 TODO":c==="progress"?"⚡ IN PROGRESS":"✅ DONE"}
    </Typography>

    <Chip label={col.length} sx={{background:colColors[c],color:"white"}}/>
   </Box>

   <LinearProgress
    variant="determinate"
    value={Math.min(col.length*25,100)}
    sx={{
     height:6,
     borderRadius:5,
     mb:2,
     "& .MuiLinearProgress-bar":{background:colColors[c]}
    }}
   />

   {col.map(t=>(
    <Card key={t.id} sx={{
     p:2,
     mb:2,
     borderRadius:4,
     borderLeft:`6px solid ${colColors[c]}`,
     boxShadow:"0 10px 20px rgba(0,0,0,.1)",
     transition:".25s"
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
        variant={x===c?"contained":"outlined"}
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

 {!isDemo && (
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
  sx={{mt:2,py:1.3}}
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

   setTasks(t=>[...t,{...r.data,status:"todo"}]);
   setTitle("");
  }}
 >
  CREATE TASK
 </Button>

 </Card>
 )}

 <Snackbar
  open={error}
  autoHideDuration={3000}
  onClose={()=>setError(false)}
  anchorOrigin={{vertical:"bottom",horizontal:"center"}}
 >
  <Alert severity="warning" onClose={()=>setError(false)}>
   Please enter task title
  </Alert>
 </Snackbar>

 </Layout>
 );
}
