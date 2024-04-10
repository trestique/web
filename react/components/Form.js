import React from 'react';


const InputBox = ({ handleChange, label, classes, info, ...otherPorps }) => {
  return (
    <div className="form-group">
      {label ? (<label >{label}</label>) : null}

      <input onChange={e => handleChange(e)} className={classes ? (
        `form-control ${classes}`
      ) : `form-control`}
        {...otherPorps} />
      {info ? (<small className="form-text text-muted">{info}</small>) : null}
    </div>
  )
};

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      value: this.props.value
    }
  }
  componentWillReceiveProps(new_props) { //update state input value with new value
    this.setState({ value: new_props.value });
  }

  setQtyState = qty => { //common function to change QTY state

    this.setState({ value: qty }, () => {
      let callback = this.props.callbackFun;
      if (callback) {
        // if (callback && qty){
          callback(qty);
        // }
      }
    })
  }

  handleChange = (e) => { //Input change
    const qty = e.target.value;
    if(qty > 1){
      this.setState({ value: qty });
    }
  }
  handleBlur = () => { // on change event like jquery
    this.setQtyState(this.state.value);
  }
  //spinner change
  plus = () => {
    const qty = this.state.value;
    this.setQtyState(qty + 1);
  }
  minus = () => {
    const qty = this.state.value;
    this.myRef.current.value = qty;
    if (qty && qty > 1) {
      this.setQtyState(qty - 1);
    }
  }
  render() {
    let { callbackFun, id, label, classes, minValue, value, ...otherPorps } = this.props;
    return (
        <div className="spinner">
          <div className="min op-btn" onClick={(e) => this.minus(e)}>
            -
          </div>
          <input
            type="number"
            id={`updates_${id}`}
            className={classes ? (
              `form-control ${classes}`
            ) : null}
            value={this.state.value}
            min={minValue ? (minValue) : (0)}
            onChange={(e) => this.handleChange(e)}
            {...otherPorps}
            ref={this.myRef}
            onKeyDown={this.onKeyDown}
            onBlur={this.handleBlur}
          />
          <div className="plus op-btn" onClick={(e) => this.plus(e)}>
            +
          </div>
        </div>
    )
  }
}

export {
  InputBox,
  Spinner
};