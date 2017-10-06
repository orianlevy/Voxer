import React, { Component } from 'react';
import './Head.css';

class Head extends Component {
 constructor(props) {
    super(props);

    this.state = {
    	newRowData: {},
    	buttonClicked: false,
    	shouldInsert: false,
    	insertNewRow:  function() {
	        this.setState((state) => {
	          return { buttonClicked: true}
	        });     		   	 		
    	}.bind(this)
   	 }
	}

	shouldComponentUpdate(nextProps, nextState) {
	    if (nextState.buttonClicked) {
	              this.setState((state) => {
	             return { buttonClicked: false}
	        });    
	    }

	    return true;
	  }

   componentWillUpdate(nextProps, nextState) { 
   	if (nextState.shouldInsert) {
   		this.props.insert(nextState.newRowData)
        this.setState((state) => {
          return { shouldInsert: false}
        });    		
   	 }

   	else if (nextState.buttonClicked) {

   		var newRow = {};
		this.props.titles.map(title => {
			return newRow[title] = document.getElementById(title).value;
		})

        this.setState((state) => {
          return { newRowData: newRow}
        });  	

        this.setState((state) => {
          return { shouldInsert: true}
        });
        
      }    
   }

  componentDidMount(){

	document.getElementById("insertUserForm").addEventListener("click", function(event){
	    event.preventDefault()   	    
	}); 
  }

  render() {
    return (
      <div className="head">
		<div className="dropdown">
		    <button className="btn btn-primary dropdown-toggle" id="menu1" type="button" data-toggle="dropdown">Settings<span className="caret"></span></button>
		    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
		      <li role="presentation"><a role="menuitem" tabIndex="-1" >Filter</a></li>
		      <li role="presentation"><a role="menuitem" tabIndex="-1" >Order</a></li>
		      <li role="presentation" className="divider"></li>
		      <li role="presentation"><a role="menuitem" tabIndex="-1" onClick={this.props.fetch} >Fetch</a></li>   
		      <li role="presentation"><a role="menuitem" tabIndex="-1" onClick={this.props.reset}>Reset</a></li>  
		    </ul>
		  </div>     
		  <div className="filter">
			<input type="text" id="tableFilter" onKeyUp={this.props.search} placeholder="Search for string in table.."/>
		  </div>   
		  <div className="insert">
			<button type="button" className="btn btn-primary btn-lg"  data-toggle="modal" data-target="#myModalNorm" >Insert new user</button>
		  </div>  

		{/* Modal*/}
		<div className="modal fade" id="myModalNorm" tabIndex="-1" role="dialog" 
		     aria-labelledby="myModalLabel" aria-hidden="true">
		    <div className="modal-dialog">
		        <div className="modal-content">
		         
		            <div className="modal-header">
		                <button type="button" className="close" 
		                   data-dismiss="modal">
		                       <span aria-hidden="true">&times;</span>
		                       <span className="sr-only">Close</span>
		                </button>
		                <h4 className="modal-title" id="myModalLabel">
		                    User details
		                </h4>
		            </div>
		            
		         
		            <div className="modal-body">
		                
		                <form id="insertUserForm" >
				          {
				          	this.props.titles.map(title => {
				             return (
				                  <div key={Math.random()} className="form-group">
				                    <label htmlFor={title}>{title}</label>
				                      <input type="text" className="form-control"
				                      id={title} placeholder={title}/>
				                  </div>				             	
				             	)
				          	})
				          }	                                   		                  		                  		                  
		                  <button type="submit" className="btn btn-default" onClick={() => this.state.insertNewRow()} data-dismiss="modal">Add</button>
		                </form>		                		                
		            </div>		           		       
		        </div>
		    </div>
		</div>		   		  
      </div>
    );
  }
}

export default Head;
