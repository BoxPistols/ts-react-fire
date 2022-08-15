import FormControl from '@material-ui/core/FormControl'
import InputBase from '@material-ui/core/InputBase'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { ChangeEventHandler } from 'react'
// import TextField from "@material-ui/core/TextField";

const BootstrapInput = withStyles((theme) => ({
  root: {
    label: {
      fontSize: 16,
    },
    'label + &': {
      marginTop: theme.spacing(2.5),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

type Props = Partial<{
  id: string
  label: string
  defaultValue: string
  variant: string
  value: string
  onChange:
    | ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined
}>

export const CustomizedInputs = ({
  id,
  defaultValue,
  label,
  onChange,
  value,
}: Props) => {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate>
      <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="bootstrap-input">
          {label}
        </InputLabel>
        <BootstrapInput
          defaultValue={defaultValue}
          value={value}
          id={id}
          onChange={onChange}
        />
      </FormControl>
    </form>
  )
}
