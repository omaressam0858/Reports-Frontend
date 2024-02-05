import axios from 'axios';

const API = 'https://eagles-57a4.onrender.com/api'

export default function DeleteTeam(teamId) {
    const token = localStorage.getItem("token");
    axios.delete(API + "/admin/teams/" + teamId, { headers: { Authorization: token } }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    })
}