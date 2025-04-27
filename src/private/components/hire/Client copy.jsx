import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Rating,
    Tabs,
    Tab,
    Box,
    Snackbar,
    Alert,
    Skeleton,
    Avatar,
    Chip,
    Stack,
    Divider,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { config } from "../../helper/config";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { RequestCard } from "./RequestCard";

// Accessibility props for Tabs
const a11yProps = (index) => ({
    id: `status-tab-${index}`,
    'aria-controls': `status-tabpanel-${index}`,
});

// TabPanel component
const TabPanel = ({ children, value, index }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`status-tabpanel-${index}`}
        aria-labelledby={`status-tab-${index}`}
    >
        {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
);

const AcceptedHires = () => {
    const { authConfig } = useAuth();
    const [hires, setHires] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedReq, setSelectedReq] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const fetchHires = async () => {
        setLoading(true);
        try {
            const res = await axios.get(config.hire_accepted_list, authConfig);
            setHires(res.data.data || res.data);
        } catch (err) {
            setErrorMsg(err.message || "Failed to load hires");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHires();
    }, [authConfig]);

    const handleTabChange = (e, newIndex) => {
        setTabIndex(newIndex);
    };

    const handlePay = async (requestId) => {
        try {
            await axios.post(config.hire_request_pay(requestId), {}, authConfig);
            fetchHires();
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    const handleCardClick = (req) => {
        setSelectedReq(req);
        setRating(5);
        setComment("");
    };

    const handleClose = () => setSelectedReq(null);

    const handleComplete = async () => {
        try {
            await axios.post(config.complete_hire(selectedReq.id), {}, authConfig);
            fetchHires();
            handleClose()
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    const handleReview = async () => {
        try {
            await axios.post(
                config.review_hire(selectedReq.id),
                { rating, comment },
                authConfig
            );
            setSelectedReq(null)
            fetchHires();
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    const filterByTab = (req) => {
        if (tabIndex === 0) return req.status === "accepted";
        if (tabIndex === 1) return req.status === "completed" && !req.review;
        return Boolean(req.review);
    };

    return (
        <Box>
            <Box
                sx={{
                    mb: 3,
                    borderBottom: 1,
                    borderColor: 'divider',
                    // ensure the Tabs container is flexible
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    aria-label="Hire status tabs"
                    variant="fullWidth"            // stretch tabs evenly
                    indicatorColor="primary"
                    textColor="primary"
                    sx={{
                        '& .MuiTabs-indicator': {
                            height: 4,
                            borderRadius: 2,
                        },
                    }}
                >
                    <Tab
                        icon={<CheckCircleOutlineIcon />}
                        iconPosition="start"
                        label="Accepted"
                        {...a11yProps(0)}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            minWidth: { xs: 80, sm: 100, md: 120 },
                        }}
                    />
                    <Tab
                        icon={<ListAltIcon />}
                        iconPosition="start"
                        label="Completed"
                        {...a11yProps(1)}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            minWidth: { xs: 80, sm: 100, md: 120 },
                        }}
                    />
                    <Tab
                        icon={<RateReviewIcon />}
                        iconPosition="start"
                        label="Reviewed"
                        {...a11yProps(2)}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            minWidth: { xs: 80, sm: 100, md: 120 },
                        }}
                    />
                </Tabs>
            </Box>

            {/* Error Snackbar */}
            <Snackbar
                open={Boolean(errorMsg)}
                autoHideDuration={6000}
                onClose={() => setErrorMsg("")}
            >
                <Alert onClose={() => setErrorMsg("")} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>

            {loading ? (
                <Grid container spacing={2}>
                    {[...Array(6)].map((_, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Skeleton variant="rectangular" height={180} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                [0, 1, 2].map((idx) => (
                    <TabPanel key={idx} value={tabIndex} index={idx}>
                        <Grid container spacing={2}>
                            {hires.filter(filterByTab).length === 0 ? (
                                <Typography>No hires in this category.</Typography>
                            ) : (
                                hires.filter(filterByTab).map((req) => {
                                    const p = req.worker_profile;
                                    const isRevealed = p.contact_email || p.contact_number || p.location;
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={req.id}>
                                            <RequestCard
                                                req={req}
                                                p={p}
                                                isRevealed={isRevealed}
                                                handlePay={handlePay}
                                                handleCardClick={handleCardClick}
                                            />
                                        </Grid>
                                    );
                                })
                            )}
                        </Grid>
                    </TabPanel>
                ))
            )}



            <Dialog open={Boolean(selectedReq)} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography variant="h6" fontWeight={600}>
                        Worker: {selectedReq?.worker_profile?.username || "N/A"}
                    </Typography>
                </DialogTitle>

                <DialogContent dividers sx={{ p: 3 }}>
                    <Stack spacing={2}>

                        {/* Worker Details */}
                        <Stack spacing={0.5}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Profession:</strong> {selectedReq?.worker_profile?.profession || "N/A"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Rate:</strong> ${selectedReq?.worker_profile?.hourly_rate || "0.00"}/hr
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Experience:</strong> {selectedReq?.worker_profile?.experience_years || "0"} yrs
                            </Typography>
                        </Stack>

                        <Divider />

                        {/* Mark as Completed */}
                        {selectedReq?.status === "accepted" && (
                            <Stack spacing={1}>
                                <Typography variant="body2" color="text.secondary">
                                    Is the work completed?
                                </Typography>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="medium"
                                    onClick={handleComplete}
                                >
                                    Mark as Completed
                                </Button>
                            </Stack>
                        )}

                        {/* Leave a Review */}
                        {selectedReq?.status === "completed" && !selectedReq?.review && (
                            <Stack spacing={2}>
                                <Typography variant="body2" fontWeight={600}>
                                    Leave a Review
                                </Typography>

                                <Rating
                                    value={rating}
                                    onChange={(_, value) => setRating(value)}
                                    size="medium"
                                />

                                <TextField
                                    label="Comment"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="medium"
                                    onClick={handleReview}
                                >
                                    Submit Review
                                </Button>
                            </Stack>
                        )}

                        {/* View Submitted Review */}
                        {selectedReq?.review && (
                            <Stack spacing={1.5}>
                                <Typography variant="body2" fontWeight={600}>
                                    Your Review
                                </Typography>

                                <Rating
                                    value={selectedReq?.review?.rating || 0}
                                    readOnly
                                    size="medium"
                                />

                                <Typography variant="body2" color="text.secondary">
                                    "{selectedReq?.review?.comment || 'No comment'}"
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose} size="medium">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};

export default AcceptedHires;
