import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MdCancel as DeleteIcon } from 'react-icons/md'
import styles from './LineItem.module.scss'


class LineItem extends Component {

  render = () => {

    const { index, mainService, nameAr, quantity, price } = this.props
 
    return (
      <div className={styles.lineItem}>

        <div style={{width:"100px"}} className={styles.currency} >{this.props.currencyFormatter( quantity * price )}</div>
        <div style={{width:"100px"}} className={styles.currency}><input name="price" type="number" step="0.01" min="0.00" max="9999999.99" value={price}  onFocus={this.props.focusHandler} readOnly /></div>
        <div style={{width:"100px"}}><input name="quantity" type="number" step="1" value={quantity} min="1" onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /></div>
        <div style={{width:"200px"}}><input name="المنتج"  type="text" value={nameAr}  readOnly /></div>
        
        <div>
          <button type="button"
            className={styles.deleteItem}
            onClick={this.props.deleteHandler(index)}
          ><DeleteIcon size="1.25em" /></button>
        </div>
        <div style={{width:"30px"}}>{index + 1}</div>
      </div>
    )
  }
}

export default LineItem

LineItem.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nameAr: PropTypes.string,
  mainService: PropTypes.string,
  index: PropTypes.number.isRequired,
}


