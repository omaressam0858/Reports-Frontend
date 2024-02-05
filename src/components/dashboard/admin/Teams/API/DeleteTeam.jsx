import axios from 'axios';

const API = 'http://localhost:8080/api'

export default function DeleteTeam(teamId) {
    const token = localStorage.getItem("token");
    axios.delete(API + "/admin/teams/" + teamId, { headers: { Authorization: token } }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    })
}