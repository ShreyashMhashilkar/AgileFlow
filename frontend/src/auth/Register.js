import Layout from "../components/Layout";
import {
 Card,
 TextField,
 Button,
 Typography,
 Fade,
 Box,
 Alert,
 useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { api } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
 const [username, setU] = useState("");
 const [password, setP] = useState("");
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);

 const nav = useNavigate();
 const mobile = useMediaQuery("(max-width:600px)");

 const register = async () => {
  // FRONTEND VALIDATION
  if (!username.trim() || !password.trim()) {
   setError("Please enter username and password");
   return;
  }

  setLoading(true);
  setError("");

  try {
   await api.post("register/", { username, password });
   nav("/login");
  } catch (e) {
   setError("Username already exists or invalid input");
  } finally {
   setLoading(false);
  }
 };

 return (
  <Layout>
   <Fade in>
    <Box
     sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      px: 2,
     }}
    >
     <Card
      sx={{
       width: "100%",
       maxWidth: 420,
       p: mobile ? 3 : 4,
       borderRadius: 5,
       background:
        "linear-gradient(180deg,rgba(255,255,255,.97),rgba(240,249,255,.9))",
       boxShadow: "0 30px 60px rgba(37,99,235,.25)",
      }}
     >
      <Typography variant="h5" fontWeight={700} textAlign="center">
       Create Account 🚀
      </Typography>

      <Typography textAlign="center" sx={{ color: "#64748b", mb: 3 }}>
       Start managing projects instantly
      </Typography>

      {error && (
       <Alert severity="error" sx={{ mb: 2 }}>
        {error}
       </Alert>
      )}

      <TextField
       fullWidth
       label="Username"
       value={username}
       onChange={e => setU(e.target.value)}
      />

      <TextField
       fullWidth
       type="password"
       label="Password"
       sx={{ mt: 2 }}
       value={password}
       onChange={e => setP(e.target.value)}
      />

      <Button
       fullWidth
       size="large"
       variant="contained"
       disabled={loading}
       sx={{
        mt: 3,
        py: 1.4,
        borderRadius: 3,
        fontWeight: 700,
        background: "linear-gradient(90deg,#6366f1,#22d3ee)",
       }}
       onClick={register}
      >
       {loading ? "Creating account..." : "Register"}
      </Button>

      <Typography sx={{ mt: 2, textAlign: "center", fontSize: 13 }}>
       Already registered? <Link to="/login">Login</Link>
      </Typography>
     </Card>
    </Box>
   </Fade>
  </Layout>
 );
}
