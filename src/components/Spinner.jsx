import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Animations() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Box sx={{ width: "600px", textAlign: "center" }} className="max-md:w-full max-md:px-10">
        <Skeleton width="100%" height={70} />
        <Skeleton width="100%" height={70} animation="wave" />
        <Skeleton width="100%" height={70} animation={false} />
      </Box>
    </div>
  );
}
