import {
  AppBar,
  Checkbox,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Brightness2, WbSunny } from "@material-ui/icons";
import Search from "../search/Search";

//STYLES
const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}));

//COMPONENT
function Header(props) {
  //HOOKS
  const classes = useStyles();
  const theme = useTheme();

  //OUTPUT
  return (
    <AppBar
      position="static"
      inputprops={{ "aria-label": "search" }}
      color="secondary"
    >
      <Toolbar>
        <Typography variant="h6" className={classes.typographyStyles}>
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            Mini
            <span
              style={{
                color: theme.palette.primary.main,
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              {props.checked ? "Crowdcube" : "Seedrs"}
            </span>
          </a>
        </Typography>
        <Search />

        <Checkbox
          checked={props.checked}
          onChange={props.onChange}
          icon={<WbSunny style={{ fill: theme.palette.primary.main }} />}
          checkedIcon={
            <Brightness2 style={{ fill: theme.palette.primary.main }} />
          }
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
