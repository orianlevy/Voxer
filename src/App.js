import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

//Components
import Head from './Head';
import Body from './Body';

//Json Data
import mainDataFromJSON from './data.json'


class App extends Component {
 constructor(props) {
    super(props);

    this.state = {    
      //Configureable State for JSON
      locationOfIndexInObj: 0,
      stringOfIndex: 'index',
      arrayOfItemsName: 'items',

      //Array of keys      
      titles: Object.keys(mainDataFromJSON.items[0]),

      //Data for RESET
      originalData: mainDataFromJSON,

      //Data with CRUD Changes
      originalDataWithCrud: mainDataFromJSON,

      //Data to be render by App
      dataToRender: mainDataFromJSON,

      //Other States
      sortedData: undefined, 
      tmpSorted: undefined,
      colValState: undefined,
      isAscState: undefined,
      shouldSort: undefined,
      dataToFetch: undefined,

      //Filter
      filterData: () => {
        var input, filter, key;
        var results = {[this.state.arrayOfItemsName]: []};
        input = document.getElementById("tableFilter");
        filter = input.value.toString().toLowerCase();             

        for(var i=0; i<this.state.originalDataWithCrud[this.state.arrayOfItemsName].length; i++) {
          for(key in this.state.originalDataWithCrud[this.state.arrayOfItemsName][i]) {
            if(this.state.originalDataWithCrud[this.state.arrayOfItemsName][i][key].toString().toLowerCase().indexOf(filter) !== -1) {
              results[this.state.arrayOfItemsName].push(this.state.originalDataWithCrud[this.state.arrayOfItemsName][i]);
              break;
            }            
          }
        }

        this.setState((state) => {
          if(filter==='') return { dataToRender: state.originalDataWithCrud};
          else return { dataToRender: results}
        });        

      },

      //Edit
      editRow: (index, key, newVal) => {
        var deep = _.cloneDeep(this.state.originalDataWithCrud);

         for (var i in deep[this.state.arrayOfItemsName]) {
           if (deep[this.state.arrayOfItemsName][i][this.state.stringOfIndex] === index) {
              deep[this.state.arrayOfItemsName][i][key] = newVal;
              break; 
           }
         }

        this.setState((state) => {
          return { originalDataWithCrud: deep}
        });    
        this.setState((state) => {
          return { dataToRender: state.originalDataWithCrud}
        });          

      },

      //Remove
      removeRow: (index) => {
        var deep = _.cloneDeep(this.state.originalDataWithCrud);

        deep[this.state.arrayOfItemsName] = deep[this.state.arrayOfItemsName].filter(function( obj ) {
            return obj[this.state.stringOfIndex] !== index;
        }.bind(this));

        this.setState((state) => {
          return { originalDataWithCrud: deep}
        });    
        this.setState((state) => {
          return { dataToRender: state.originalDataWithCrud}
        });  

      },

      //Insert
      insertRow: (row) => {
        var deep = _.cloneDeep(this.state.originalDataWithCrud);
        deep[this.state.arrayOfItemsName].push(row)
        this.setState((state) => {
          return { originalDataWithCrud: deep}
        });    
        this.setState((state) => {
          return { dataToRender: state.originalDataWithCrud}
        });                                 
      },

      //Sort
      sortCol: (colVal, isAsc) => {        
        this.setState((state) => {
          return { shouldSort: true, tmpSorted: this.state.dataToRender, colValState: colVal, isAscState: isAsc }
        });          
      },

      //Fetch
      fetchData: () => {    
        this.setState((state) => {
          return { originalDataWithCrud: state.dataToFetch}
        }); 

        this.setState((state) => {
          return { dataToRender: state.dataToFetch}
        });                    
      },

      //Reset
      resetData: () => {
        document.getElementById("tableFilter").value = '';
        
        this.setState((state) => {
          return { dataToFetch: state.dataToRender}
        });     

        this.setState((state) => {
          return { originalDataWithCrud: state.originalData}
        });   

        this.setState((state) => {
          return { dataToRender: state.originalData}
        });         
      }      
    }
 }  


  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.shouldSort) {
              this.setState((state) => {
             return { shouldSort: false}
        });    
    }

    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.shouldSort) {
  
     var deep = _.cloneDeep(nextState.tmpSorted);
     var columnToSort = nextState.colValState.title.toString();


     //Ascending sort
     if (nextState.isAscState) {
        //Check if data is Int or String
        if (deep[this.state.arrayOfItemsName][0][columnToSort]=== parseInt(deep[this.state.arrayOfItemsName][0][columnToSort], 10)) {
          deep[this.state.arrayOfItemsName].sort(function(a, b){
            return a[columnToSort]-b[columnToSort]
          });
        }
        else {
          deep[this.state.arrayOfItemsName].sort(function (a, b) {
              return a[columnToSort].localeCompare(b[columnToSort]);
          });          
        }              
      }
      
      //Decending sort
      else {
        //Check if data is Int or String
        if (deep[this.state.arrayOfItemsName][0][columnToSort]=== parseInt(deep[this.state.arrayOfItemsName][0][columnToSort], 10)) {
          deep[this.state.arrayOfItemsName].sort(function(a, b){
            return b[columnToSort]-a[columnToSort]
          });
        }
        else {
          deep[this.state.arrayOfItemsName].sort(function (a, b) {
              return b[columnToSort].localeCompare(a[columnToSort]);
          });          
        } 
      } 

      this.setState((state) => {
        return { sortedData: deep}
      });   

      this.setState((state) => {
        return { dataToRender: state.sortedData}
      });        

     }
  }

  render() {
    return (
      <div className="App">
        <Head search={this.state.filterData} fetch={this.state.fetchData} 
        reset={this.state.resetData} insert={this.state.insertRow} titles={this.state.titles}/>

        <Body data={this.state.dataToRender} sort={this.state.sortCol} 
        titles={this.state.titles} remove={this.state.removeRow} 
        locationIndex={this.state.locationOfIndexInObj} 
        stringIndex={this.state.stringOfIndex} edit={this.state.editRow} arrayOfItemsName={this.state.arrayOfItemsName}/>
      </div>
    );
  }
}

export default App;
