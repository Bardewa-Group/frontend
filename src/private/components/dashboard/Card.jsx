import React, { useState } from "react";
import {
    Card,
    CardActionArea,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    Box,
    Button,
    Chip,
    useTheme,
    useMediaQuery,
    Grid,
} from "@mui/material";
import TokenSharpIcon from "@mui/icons-material/TokenSharp";
import WorkerReviewModal from "./WorkerReviewModal ";

export const WorkerCard = ({ worker, status, handleRequest }) => {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    const [openModel, setOpenModel] = useState(false);

    const handleClose = () => {
        setOpenModel(false)
    }


    return (
        <>
            {openModel && (
                <WorkerReviewModal
                    open={openModel}
                    onClose={handleClose}
                    worker={worker}
                />
            )}
            <Card
                sx={{
                    width: "100%",
                    borderRadius: 2,
                }}
                onClick={() => setOpenModel(true)}
            >



                <>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                {worker.username[0].toUpperCase()}
                            </Avatar>
                        }
                        title={
                            <Typography noWrap variant={isSmUp ? "h6" : "subtitle1"}>
                                {worker.username}
                            </Typography>
                        }
                        subheader={
                            <Typography noWrap color="textSecondary" variant="body2">
                                {worker.profession}
                            </Typography>
                        }
                    />

                    <CardContent>
                        <Box
                            display="flex"
                            flexDirection={isSmUp ? "row" : "column"}
                            justifyContent="space-between"
                            alignItems={isSmUp ? "center" : "flex-start"}
                            gap={2}
                        >
                            {/* left: rate & experience */}
                            <Box>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Rate:</strong> {worker.hourly_rate} <Typography component="span" variant="caption">NPR/hr</Typography>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Experience:</strong> {worker.experience_years} year{worker.experience_years > 1 ? "s" : ""}
                                </Typography>
                            </Box>



                            {/* right: status chip or request button */}
                            <Box>
                                {status === "accepted" ? (
                                    <Chip
                                        icon={<TokenSharpIcon />}
                                        label="Hired"
                                        color="success"
                                        variant="outlined"
                                    />
                                ) : status === "pending" ? (
                                    <Chip label="Requested" variant="outlined" />
                                ) : (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRequest(worker.id);
                                        }}
                                    >
                                        Request Hire
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </CardContent>
                </>
            </Card>
        </>
    );
};
