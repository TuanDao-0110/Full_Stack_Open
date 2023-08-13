import { useSelector } from "react-redux";

const Notification = () => {
    const { type, content } = useSelector(state => state.notificateReducer)
    return type === null ? '' : <div className={`${type}`}>{content}</div>;
};

export default Notification;
