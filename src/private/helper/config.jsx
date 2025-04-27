import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


// const baseURL = "http://localhost:8000";
const baseURL = "https://dfasdfds.pythonanywhere.com/";



export const config = {
  backend_base_url: "http://127.0.0.1:8000",
  // auth related
  get_token: `${baseURL}/token/`,
  get_refresh: `${baseURL}/token/refresh/`,

  // user related
  create_user: `${baseURL}/users/create_user/`,
  get_user_detils: `${baseURL}/users/user_details/`,



  get_qualifications: `${baseURL}/api/worker/profile/`,
  get_reviews: `${baseURL}/api/worker/reviews/`,
  
  // hire urls
  view_workers: `${baseURL}/api/hire/workers/`,
  request_workers: `${baseURL}/api/hire/requests/`,
  hire_accepted_list: `${baseURL}/api/hire/requests/accepted/`,
  hire_requested_list: `${baseURL}/api/hire/requests/pending/`,
  
  request_to_me: `${baseURL}/api/worker/requests/`,
  hire_request_pay: (id) => `${baseURL}/api/hire/requests/${id}/pay/`,
  complete_hire: (id) => `${baseURL}/api/hire/requests/${id}/complete/`,
  review_hire:    (id) => `${baseURL}/api/hire/requests/${id}/review/`,
  get_worker_review: `${baseURL}/api/worker/reviews/by-id/`,


};



let lastToastId = null;
let lastToastTimestamp = 0;


const generateToastId = () => {
  const now = Date.now();


  if (lastToastId && now - lastToastTimestamp < 2000) {
    return lastToastId;
  }


  lastToastId = `toast_${now}_${Math.floor(Math.random() * 10000)}`;
  lastToastTimestamp = now;

  return lastToastId;
};



export const displaySuccess = (
  message = "",
  position = "bottom-right",
  autoClose = 2000
) => {
  const toastId = generateToastId();
  toast.success(message, {
    position: position,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    toastId: toastId,
  });
};

export const displayError = (
  message = "",
  position = "bottom-right",
  autoClose = 2000
) => {
  const toastId = generateToastId();
  toast.error(message, {
    position: position,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    toastId: toastId,
  });
};





export const InitialLoader = ({ initialLoader, duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(initialLoader);

  useEffect(() => {
    if (!initialLoader) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Set `isVisible` to false after `duration`
      }, duration);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [initialLoader, duration]);



  // Styles for the loader container
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    zIndex: 9999,
    opacity: isVisible ? 1 : 0, // Transition opacity
    visibility: isVisible ? "visible" : "hidden", // Hide after fade-out
    transition: "opacity 0.5s ease-out, visibility 0.5s ease-out", // Smooth exit
  };

  const ringContainerStyle = {
    position: "relative",
    width: "120px",
    height: "120px",
  };

  const ringStyle = (color, delay) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    border: "5px solid transparent",
    borderTopColor: color,
    borderRadius: "50%",
    animation: `spin 1.5s ease-in-out infinite`,
    animationDelay: delay,
  });

  // Adding keyframes directly into the component
  const keyframes = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes fadeText {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{keyframes}</style> {/* Adding animations */}
      <div style={ringContainerStyle}>
        {/* Multiple rings with staggered animations */}
        <div style={ringStyle("#ff0080", "0s")}></div>
        <div style={ringStyle("#00ffea", "0.4s")}></div>
        <div style={ringStyle("#80ff00", "0.8s")}></div>
      </div>
    </div>
  );
};



