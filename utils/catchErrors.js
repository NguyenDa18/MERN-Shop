const catchErrors = (err, displayError) => {
  let errorMsg;
  if (err.response) {
    // request was made and server responded with non-2XX status code
    errorMsg = err.response.data;

    // Related to Cloudinary img uploads
    if (err.response.data.error) {
      errorMsg = err.response.data.error.message;
    }
  } else if (err.request) {
    // request made but no response received
    errorMsg = err.request;
    console.error(`Error request: ${errorMsg}`);
  } else {
    // Somthing else that triggered an error
    errorMsg = err.message;
    console.error(`Error request: ${errorMsg}`);
  }
  displayError(errorMsg);
};

export default catchErrors;
