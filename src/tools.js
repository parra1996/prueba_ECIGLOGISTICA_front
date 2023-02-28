export const checkError = (type, value) => {


    switch (type) {

        case 'email':

            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {

                return "Introduce a valid email";
            } else {
                return "ok";
            };

        
        default:
            return "ok";
    }
};