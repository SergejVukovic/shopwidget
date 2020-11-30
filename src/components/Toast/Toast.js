import "./Toast.style.css";

const Toast = ({message, variant}) => {
    return (
        <div className={`Toast ${variant}-toast`}>
            {message}
        </div>
    )
}

export default Toast;
