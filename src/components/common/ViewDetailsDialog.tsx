import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";

export interface IViewDetailsMetaData {
  title: string;
  metaData: Record<string, string>;
}

interface IViewDetailsDialog {
  data: IViewDetailsMetaData | null;
  open: boolean;
  closeCallBack: () => void;
}

const ViewDetailsDialog = ({
  data,
  open,
  closeCallBack,
}: IViewDetailsDialog) => {
  const handleClose = () => {
    closeCallBack();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm" // Set the maximum width of the dialog
      fullWidth // Make the dialog take up the full width (up to maxWidth)
    >
      <DialogTitle>{data?.title} Details</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 2,
            alignItems: "center",
          }}
        >
          {data?.metaData &&
            Object.entries(data.metaData).map(([key, value]) => {
              if (["id", "_id"].includes(key)) return null;

              return (
                <Box key={key}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      color: "text.primary",
                    }}
                  >
                    {key}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDetailsDialog;
