import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import NavBar from './NavBar'
class MorgageComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loanAmount: '',
      rate: '',
      year: '',
    }
  }

  caculate = (e) => {
    e.preventDefault()
    console.log(this.state.loanAmount, this.state.rate, this.state.year)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const {value, setValue} = this.props

    return (
      <div>
        <NavBar value={value} setValue={setValue}/>
 
        <Typography variant="h4" style={style}>
          Your morgage
        </Typography>
        <form style={formContainer}>
          <TextField type="text" placeholder="Loan Amount" fullWidth
            margin="normal" name="loanAmount" value={this.state.loanAmount}
            onChange={this.onChange}/>
          <TextField type="text" placeholder="Rate" fullWidth
            margin="normal" name="rate" value={this.state.rate}
            onChange={this.onChange}/>
          <TextField type="text" placeholder="Year" fullWidth
            margin="normal" name="year" value={this.state.year}
            onChange={this.onChange}/>
          <Button variant="contained" color="primary" 
            onClick={this.caculate}>Submit</Button>
        </form>
      </div>
    )
  }
}

const formContainer = {
  display: 'flex',
  flexFlow: 'row wrap'
}

const style ={
  display: 'flex',
  justifyContent: 'center'
}

export default MorgageComponent