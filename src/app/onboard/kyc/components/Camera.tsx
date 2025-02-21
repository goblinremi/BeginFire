import Webcam from "react-webcam";

const Camera = () => {
    const videoConstraints = {
        facingMode: { exact: "environment" },
    };

    return (
        <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
        />
    );
};

export default Camera;
