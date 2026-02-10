import { TextField, Card, Typography } from "@mui/material";

export default function GitEditor(){
 return(
 <Card sx={{p:3,mt:3,borderRadius:3,boxShadow:"0 10px 30px rgba(0,0,0,.15)"}}>
  <Typography fontWeight={700} mb={1}>
   Pipeline Config
  </Typography>

  <TextField
   fullWidth
   multiline
   rows={8}
   defaultValue={`name: CI
steps:
 - npm install
 - npm run build
 - npm test
 - docker build .
 - deploy`}
   sx={{
    "& textarea":{
     fontFamily:"monospace",
     fontSize:13
    }
   }}
  />
 </Card>
 );
}
