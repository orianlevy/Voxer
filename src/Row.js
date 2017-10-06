import React, { Component } from 'react';


class Row extends Component {
  constructor(props) {
    super(props);
				
    this.state = {    	
      newValAfterEdit: 'text',
    	handleRemove:  function(index) {    	 	    	 	
    	 	this.props.remove(index)
    	}.bind(this), 

    	handleEdit:  function(index, key) { 	 	    	 	
    	 	this.props.edit(index, key, this.state.newValAfterEdit)
    	}.bind(this)    

   	 }
	}

  render() {
    return (
		<tr key={Math.random()}>
	      {
	      	this.props.titles.map(title => {
	         return (<td ref={function(e){if(e != null) e.contentEditable=true;}} key={Math.random()} 
            onMouseUp={() => this.state.handleEdit(this.props.item[this.props.stringIndex], title)}>{this.props.item[title]}</td>)
	      	})
	      }
	      <td className="remove" key={Math.random()} onClick={() => this.state.handleRemove(this.props.item[this.props.titles[this.props.locationIndex]])}>X</td>
		</tr>      	
    );
  }
}

export default Row;



