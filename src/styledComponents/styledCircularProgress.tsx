import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

export const StyledCircularProgress = withStyles({
    root: {
      color: '#F54503', 
    },
  })(CircularProgress)