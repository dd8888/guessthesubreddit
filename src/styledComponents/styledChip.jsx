import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

export const StyledChip = withStyles({
  root: {
    width: 200,
    borderRadius: 3,
    border: 0,
    backgroundColor: "#F54503",
    color: "white",
    height: 40,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: 0,
    position: "fixed",
    top: 20,
    right: 20,
  },
})(Chip);
