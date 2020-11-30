import "./Paper.style.css";

const Paper = ({children, className, ...props}) => {
    return <div className={`Paper ${className}`} {...props}>{children}</div>
}
export default Paper;
