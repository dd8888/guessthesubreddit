import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

export const StyledButton = withStyles({
    root: {
      backgroundColor: '#F54503',
      width: 300,
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      '&:hover': {
        background: "#8a2500",
      }
    },
  })(Button);