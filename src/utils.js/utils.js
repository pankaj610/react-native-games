
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN } from '../constants';
export const actionCreator = (type, payload, ...rest) => {
    return ({
        type,
        payload,
        ...rest
    });
}

export const Storage = {
    save : async (key, data)=> {
        let json = JSON.stringify(data);
        await AsyncStorage.setItem(key, json);
    },
    get: async (key)=> {
        let json = await AsyncStorage.getItem(key);
        return JSON.parse(json);
    }
}

export const getToken = async ()=> {
    let token = await Storage.get(TOKEN);
    return token;
}