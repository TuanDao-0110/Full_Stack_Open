const Notification = ({ message }) => {
    const { content, type } = message;
    return type === null ? '' : <div className={`${type}`}>{content}</div>;
};

export default Notification;
