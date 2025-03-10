import * as SecureStore from 'expo-secure-store';
import { LocalStoreKeys } from '@local-store/local-store-keys';
import { LocalStoreError, LocalStoreResponse } from '@blue-prints/local-store/local-store-types';

export const setValue = async (key: LocalStoreKeys, value: string): Promise<LocalStoreError | null> => {
    try {
        await SecureStore.setItemAsync(key, value);
        return null;
    } catch (error) {
        return {
            message: 'Failed to save data',
            key,
            error
        };
    }
};

export const getValue = async (key: LocalStoreKeys): Promise<LocalStoreResponse<string>> => {
    try {
        const value = await SecureStore.getItemAsync(key);
        return { data: value, error: null };
    } catch (error) {
        return {
            data: null,
            error: {
                message: 'Failed to get data',
                key,
                error
            }
        };
    }
};

export const setObject = async <T>(key: LocalStoreKeys, value: T): Promise<LocalStoreError | null> => {
    try {
        const jsonValue = JSON.stringify(value);
        await SecureStore.setItemAsync(key, jsonValue);
        return null;
    } catch (error) {
        return {
            message: 'Failed to save object',
            key,
            error
        };
    }
};

export const getObject = async <T>(key: LocalStoreKeys): Promise<LocalStoreResponse<T>> => {
    try {
        const jsonValue = await SecureStore.getItemAsync(key);
        return {
            data: jsonValue ? JSON.parse(jsonValue) : null,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: {
                message: 'Failed to get object',
                key,
                error
            }
        };
    }
};

export const deleteValue = async (key: LocalStoreKeys): Promise<LocalStoreError | null> => {
    try {
        await SecureStore.deleteItemAsync(key);
        return null;
    } catch (error) {
        return {
            message: 'Failed to delete data',
            key,
            error
        };
    }
};

export const clearAll = async (keys: LocalStoreKeys[]): Promise<LocalStoreError | null> => {
    try {
        await Promise.all(keys.map(key => SecureStore.deleteItemAsync(key)));
        return null;
    } catch (error) {
        return {
            message: 'Failed to clear data',
            error
        };
    }
}; 