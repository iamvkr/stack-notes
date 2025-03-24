/** https://localforage.github.io/localForage/ */
import localforage from 'localforage'
import { CourseDataInterface, FilesDataInterface } from "../context/FilesContext";

export const myFilesDb = localforage.createInstance({
    name: "myFilesDb"
});

myFilesDb.config({
    name: 'MyFiles-App',
    driver: localforage.INDEXEDDB,
    storeName: "myFilesDb"
});

/** ======== filesystem ============== */
export const getDataFromFS = async (): Promise<FilesDataInterface[] | []> => {
    let data = await myFilesDb.getItem<FilesDataInterface[]>("fileSystem");
    if (data === null) {
        // db has no keys, create a new key:
        data = await myFilesDb.setItem("fileSystem", []);
    }
    return data
}
export const saveToDbFS = async (data: FilesDataInterface[]): Promise<FilesDataInterface[] | []> => {
    const newData = await myFilesDb.setItem("fileSystem", data);
    return newData;
}

/** ======== file oBJ ============== */
type fo = {
    [key: string]: File | unknown
}
export const getDataFromFO = async (): Promise<fo> => {
    let data = await myFilesDb.getItem<fo | {}>("filesObj");
    if (data === null) {
        // db has no keys, create a new key:
        data = await myFilesDb.setItem("filesObj", {});
    }
    return data;
}
export const saveToDbFO = async (data: fo): Promise<fo> => {
    const newData = await myFilesDb.setItem("filesObj", data);
    return newData;
}

/** ======== courses ============== */
export const getDataFromCourses = async (): Promise<CourseDataInterface[] | []> => {
    let data = await myFilesDb.getItem<CourseDataInterface[]>("courses");
    if (data === null) {
        // db has no keys, create a new key:
        data = await myFilesDb.setItem("courses", []);
    }
    return data
}
export const saveToDbCourses = async (data: CourseDataInterface[]): Promise<CourseDataInterface[]> => {
    const newData = await myFilesDb.setItem("courses", data);
    return newData;
}

/** ======== clear data ========== */
export const clearData = async (): Promise<boolean> => {
    await myFilesDb.clear();
    return true;
}