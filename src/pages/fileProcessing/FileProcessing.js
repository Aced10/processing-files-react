import { useState } from "react";
import Textarea from "@mui/joy/Textarea";
import { Box, Button, Grid, Typography } from "@mui/material";
import NavBar from "components/NavBar";

// Services
import { processingFiles } from "services/FilesServices";

const FileProcessingPage = () => {
  const [fileList, setFileList] = useState([]);
  const [processingData, setProcessingData] = useState([]);

  const handleFileChange = (e) => {
    setFileList([...fileList, e.target.files[0]]);
  };

  const handleUploadClick = async () => {
    if (!fileList.length === 0) {
      return;
    }
    const dataForm = new FormData();
    fileList.forEach((file, i) => {
      dataForm.append(`file-${i}`, file, file.name);
    });
    try {
      const { data } = await processingFiles(dataForm);
      console.log(data);
      setProcessingData(data);
    } catch (e) {
      const { message } = e.response;
      console.log(message);
    }
  };

  return (
    <div>
      <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={4} md={3}>
          <div>
            <Button variant="contained" component="label">
              Seleccionar Archivo
              <input type="file" hidden onChange={handleFileChange} multiple />
            </Button>
            <ul>
              {fileList.map((file, i) => (
                <li key={i}>
                  {file.name} - {file.type}
                </li>
              ))}
            </ul>
            <Button
              variant="contained"
              component="label"
              onClick={handleUploadClick}
            >
              Procesar Archivo
            </Button>
          </div>
        </Grid>
        <Grid item xs={8} md={9}>
          {processingData.map((file, index) => {
            return (
              <Box id={index} sx={{ p: 2, border: "1px dashed grey" }}>
                <Typography color="primary" variant="h4">
                  Titulo: {file.tittle}
                </Typography>
                <Textarea
                  color="primary"
                  py={4}
                  m={12}
                  minRows={2}
                  value={file.content}
                />
                <Grid container spacing={1}>
                  <Grid item xs={4} sm={6} md={6}>
                    <Typography variant="body2">
                      Total Caracteres: {file.numberOfCaracters}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Typography variant="body2">
                      Total Consonantes: {file.consonantNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Typography variant="body2">
                      Total Vocales: {file.vocalsNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Typography variant="body2">
                      Espacios: {file.numberOfSpaces}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Typography variant="body2">
                      Palabra más Repetida: "{file.mostRepeatedWord.word}" ={" "}
                      {file.mostRepeatedWord.repeated} veces.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default FileProcessingPage;
