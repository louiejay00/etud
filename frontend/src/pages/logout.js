import { IconButton, Typography } from "@material-ui/core";
import { useContext } from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from "../context/AuthProvider";

export default function LogoutPage() {
  const { Logout } = useContext(AuthContext);

  return (
    <div>
      <Typography>
        <IconButton>
          <ExitToAppIcon  onClick={Logout}/>
        </IconButton>
        </Typography>
    </div>
  );
}
