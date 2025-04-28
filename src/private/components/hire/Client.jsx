import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Grid,
    Typography,
    Snackbar,
    Alert,
    Box,
    Skeleton,
    Button,
    Stack,
    Container,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { config } from "../../helper/config";
import { RequestCard } from "./RequestCard";
import ClientModal from "./ClientModal";

const filterOptions = [
    { label: "Accepted", value: "accepted" },
    { label: "Completed", value: "completed" },
    { label: "Reviewed", value: "reviewed" },
];

const AcceptedHires = () => {
    const { authConfig } = useAuth();
    const [hires, setHires] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [filter, setFilter] = useState("accepted");
    const [selectedReq, setSelectedReq] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const fetchHires = async () => {
        setLoading(true);
        try {
            const res = await axios.get(config.hire_accepted_list, authConfig);
            setHires(res.data.data || res.data);
        } catch (err) {
            setErrorMsg(err.message || "Failed to load hires.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let interval;

        fetchHires(); // First fetch immediately

        interval = setInterval(fetchHires, 10000); // Fetch every 10 seconds

        return () => clearInterval(interval); // Clear interval when component unmounts
    }, [authConfig]);


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
            handleClose();
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    const handleReview = async () => {
        try {
            await axios.post(config.review_hire(selectedReq.id), { rating, comment }, authConfig);
            fetchHires();
            handleClose();
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    const filteredHires = hires.filter((req) => {
        if (filter === "accepted") return req.status === "accepted";
        if (filter === "completed") return req.status === "completed" && !req.review;
        return Boolean(req.review);
    });

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Top: Filter Buttons */}
            <Stack direction="row" spacing={2} justifyContent="" mb={5} flexWrap="wrap">
                {filterOptions.map((option) => (
                    <Button
                        key={option.value}
                        variant={filter === option.value ? "contained" : "outlined"}
                        size="small"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            fontSize: 14,
                        }}
                        onClick={() => setFilter(option.value)}
                    >
                        {option.label}
                    </Button>
                ))}
            </Stack>

            {/* Error Snackbar */}
            <Snackbar
                open={Boolean(errorMsg)}
                autoHideDuration={5000}
                onClose={() => setErrorMsg("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setErrorMsg("")} severity="error" variant="filled">
                    {errorMsg}
                </Alert>
            </Snackbar>

            {/* Content */}
            {loading ? (
                <Grid container spacing={3}>
                    {[...Array(6)].map((_, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Skeleton variant="rectangular" height={230} sx={{ borderRadius: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container spacing={3}>
                    {filteredHires.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography textAlign="center" color="text.secondary" mt={5}>
                                No hires found in this category.
                            </Typography>
                        </Grid>
                    ) : (
                        filteredHires.map((req) => {
                            const p = req.worker_profile;
                            const isRevealed = p.contact_email || p.contact_number || p.location;
                            return (
                                <Grid item xs={12} sm={6} md={5} key={req.id}>
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
            )}

            {/* Modal */}
            <ClientModal
                selectedReq={selectedReq}
                handleClose={handleClose}
                handleComplete={handleComplete}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                handleReview={handleReview}
            />
        </Container>
    );
};

export default AcceptedHires;
