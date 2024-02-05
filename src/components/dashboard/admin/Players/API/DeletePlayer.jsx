import axios from 'axios';

const API = 'http://localhost:8080/api'

export default function DeletePlayer(teamId) {
    const token = localStorage.getItem("token");
    axios.delete(API + "/admin/players/" + teamId, { headers: { Authorization: token } }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    })
}