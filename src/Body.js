import React, { Component } from 'react';
import './Body.css';
import Row from './Row';

class Body extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    	 orderByAsc: true,
    	 handleSort:  function(value) {    	 	
    	 	if (this.state.orderByAsc) {
     		  (this.props.sort(value, true))
		        this.setState((state) => {
		          return { orderByAsc: false}
		        });     		  
    	 	}
     		else {
     		  (this.props.sort(value, false))
		        this.setState((state) => {
		          return { orderByAsc: true}
		        });       		  
     		}
    	}.bind(this)
   	 }
	}

  render() {
    return (
      <div className="body">
        <div className="dataTable">
			<table id="dataTable">
				 <thead>
					<tr key={Math.random()} className="tableHead">
			          {
			          	this.props.titles.map(title => {
			             return (<th key={Math.random()} onClick={() => this.state.handleSort({title})}>{title}</th>)
			          	})
			          }
			          <th key={Math.random()} >Remove</th>
					</tr>
				  </thead>
				  <tbody>
		            {
		                this.props.data[this.props.arrayOfItemsName].map(item => {
		                    return (<Row key={Math.random()} keyChild={item[this.props.stringIndex]} item={item} 
		                    	titles={this.props.titles} remove={this.props.remove} 
		                    	locationIndex={this.props.locationIndex} stringIndex={this.props.stringIndex} edit={this.props.edit}/>)
		                })
		            }	
		         </tbody>		  
			</table>        
        </div>
      </div>
    );
  }
}

export default Body;
