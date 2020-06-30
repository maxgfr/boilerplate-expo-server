const BASE_URL="http://localhost:3000/";

export default class AdyenConnector {

    static myInstance = null;

    /**
    * @returns {AdyenConnector}
    */
    static getInstance() {
        if (AdyenConnector.myInstance == null) {
            AdyenConnector.myInstance = new AdyenConnector();
        }
        return this.myInstance;
    }

    sendToServer(type, data) {
      return new Promise((resolve, reject) => {
        fetch(BASE_URL+type, {
          body: JSON.stringify(data),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }
}
