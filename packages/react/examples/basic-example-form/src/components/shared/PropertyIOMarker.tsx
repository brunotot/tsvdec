import { Box, Tooltip } from "@mui/material";
import { ReactNode } from "react";

export type PropertyIOMarker = {
  title: string;
  icon: ReactNode;
  name: string;
};

export function PropertyIOMarker({ title, icon, name }: PropertyIOMarker) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Tooltip title={title}>{icon as any}</Tooltip>
      <code className="code">{name}</code>
    </Box>
  );
}
