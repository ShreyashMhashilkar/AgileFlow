import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function Sprints() {
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    api.get("sprints/").then((r) => setSprints(r.data)).catch(() => {});
  }, []);

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6">Sprints</Typography>

      {sprints.map((s) => (
        <Typography key={s.id} sx={{ mt: 1 }}>
          • {s.name}
        </Typography>
      ))}
    </Card>
  );
}
