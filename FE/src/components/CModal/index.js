import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {useState} from "react";
import "./style.scss";


const CModal = ({
    title,
    visible,
    setVisible,
    content,
    onClick,
    isShowFooter = true,
    disableBtn = false,
    textOk = "Ok",
    showOk = true,
    style
}) => {
    
    const [modelOpen, setModalOpen] = useState(false);
    
    
    const handleClose = () => {
        setVisible(false);
    };

    return (

        <Dialog open={visible} onClose={handleClose} fullWidth sx={{...style,
                // '.MuiPaper-root': {
                // padding: 2,
                // },
            }}>
            <DialogTitle>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="title_modal">{title}</div>
                </div>
                <Divider sx={{ marginTop: "0.5rem", height: '0px !important' }} />
            </DialogTitle>
            <DialogContent style={{padding: '0 20px'}}>{content}</DialogContent> 
        </Dialog>
    )
}

export default CModal
