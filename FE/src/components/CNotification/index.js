import { notification } from 'antd';
import i18next from 'i18next';

const openNotification = (type, message, description, statusError = 0)  => {
    let newMessage = message;
    switch(statusError){
    case 403:
        newMessage = i18next.t("ERROR_MESSAGE.403");
        break;
    case 502:
        newMessage = i18next.t("ERROR_MESSAGE.502");
        break;
    default: newMessage = message;
    }
    notification[type]({
        message: `${newMessage}`,
        description: `${description}`,
        style : { borderRadius : 6, top : "10vh", width: 400}
    });
};

export default openNotification;