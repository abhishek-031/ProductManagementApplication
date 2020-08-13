import React, { useState } from 'react';

const state = {
  available:false,
  unavailable:false,
  Transport:false,
  Electronics:false,
  Furniture:false,
  Entertainment:false,
  Fitness:false,
  Sports:false,
}

class CheckBoxes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      available:false,
      unavailable:false,
      Transport:false,
      Electronics:false,
      Furniture:false,
      Entertainment:false,
      Fitness:false,
      Sports:false,
    }
  }

  onCheckboxChange(e){
    const option = e.target.name;
    this.setState({
      [option]:!this.state[option]
    })
  }

  resetState(){
    this.setState({
      ...state
    });
    this.props.toggleShowing();
    this.props.applyFilters(state);
  }

  render(){ 
    return (
      <div>
        { Object.keys(this.state).map(option=>(
          <label key={option}><input type='checkbox' name={option} checked={this.state[option]} onChange={e=>this.onCheckboxChange(e)} />{option}</label> 
        ))}
        <button onClick={()=>this.resetState()} >Reset</button>
        <button onClick={()=>this.props.applyFilters(this.state)} >Apply Filters</button>
      </div>
    )
  }
}

const Filter = ({applyFilters}) => {
  const [isShowing,setShowing] = useState(false);
  return (
    <>
      <button onClick={()=>{ setShowing(!isShowing); applyFilters(state)}}>Filter</button>
      {
        isShowing ? <CheckBoxes applyFilters={applyFilters} toggleShowing = {()=>setShowing(!isShowing)} /> : ""
      }
    </>
  )
}

export default Filter;