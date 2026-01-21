class CommontObject {
    successNotification = 'section[aria-label*="Notifications"]';

    getSuccessNotification() {
        return this.successNotification;
    }
}

export default new CommontObject();