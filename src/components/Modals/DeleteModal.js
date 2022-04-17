import React, { useState } from "react";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import { modalStyles } from "../../styles/styles";
import Loader from "../Loaders/Loader";

const DeleteModal = props => {
  const {
    showModal,
    handleCloseModal,
    handleDelete,
    modalTitle,
    modalQuestion,
  } = props;

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePost = () => {
    setIsLoading(true);
    handleDelete();
    setIsLoading(false);
  };

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <Box sx={modalStyles}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h6" component="h2">
              {modalTitle}
            </Typography>
          </Grid>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Grid item>
                <Typography>{modalQuestion}</Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={5}
              >
                <Grid item>
                  <Button
                    onClick={handleDeletePost}
                    variant="outlined"
                    size="small"
                    color="secondary"
                  >
                    Yes, I'm sure.
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCloseModal}
                    variant="outlined"
                    size="small"
                    color="secondary"
                  >
                    No, go back.
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
