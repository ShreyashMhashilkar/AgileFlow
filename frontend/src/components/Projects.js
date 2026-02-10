import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects/").then((r) => setProjects(r.data)).catch(() => {});
  }, []);

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6">Projects</Typography>

      {!user && <small>Login to manage projects</small>}

      {projects.map((p) => (
        <Typography key={p.id} sx={{ mt: 1 }}>
          • {p.name}
        </Typography>
      ))}
    </Card>
  );
}
