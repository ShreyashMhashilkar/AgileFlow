import { Card, Typography } from "@mui/material";
import { demoActivity } from "../demoActivity";

export default function Activity() {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6">Activity</Typography>

      {demoActivity.map((a, i) => (
        <Typography key={i} sx={{ mt: 1 }}>
          • {a}
        </Typography>
      ))}
    </Card>
  );
}
