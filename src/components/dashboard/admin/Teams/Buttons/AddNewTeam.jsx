import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddNewTeamButton({ onClick }) {
    return (
        <div className="flex space-x-4">
            <Button onClick={() => onClick(true)} variant="contained" className='bg-blue-400 mx-2' color="primary"><AddIcon /></Button>
        </div>
    )
}