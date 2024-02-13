import { Button, Grid } from "@mui/material";
import { UploadOutlined } from "@mui/icons-material";
import { useRef } from "react";

export const UploadButton = ({ onFileInputChange, isSaving }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Grid item>
      <input
        type="file"
        multiple
        onChange={onFileInputChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button
        disabled={isSaving}
        color="primary"
        sx={{ fontSize: 20, mr: 1 }}
        onClick={handleButtonClick}
      >
        <UploadOutlined sx={{ fontSize: 30, mr: 1 }} />
        Subir imagen
      </Button>
    </Grid>
  );
};
