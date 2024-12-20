import {instance} from "../api/api.instance.js"
export const fileToServer= (file , setLoading , setState) =>{
    const formData = new FormData();
    formData.append('file', file);
    setLoading('uploading');
    instance
        .post('/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
            setState(res.data);
        })
        .catch(() => {
            setLoading('error');
        })
        .finally(() => {
            setLoading('noaction');
        });
}