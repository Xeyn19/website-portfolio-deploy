import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import useSiteTheme from "../hooks/useSiteTheme";

export default function Animations() {
  const { isDark } = useSiteTheme();

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Box
        sx={{
          width: "600px",
          textAlign: "center",
          "& .MuiSkeleton-root": {
            bgcolor: isDark ? "rgba(71, 85, 105, 0.45)" : "rgba(203, 213, 225, 0.8)",
          },
        }}
        className="max-md:w-full max-md:px-10"
      >
        <Skeleton width="100%" height={70} />
        <Skeleton width="100%" height={70} animation="wave" />
        <Skeleton width="100%" height={70} animation={false} />
      </Box>
    </div>
  );
}
