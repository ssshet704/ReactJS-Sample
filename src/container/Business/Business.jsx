import React, {Component} from 'react';

import Location from '../../components/Locations/Location'
import { getBusinessData} from '../../services/network';

import './Business.scss'
class Business extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:{}
        };
      }

    componentDidMount = ()=>{
        getBusinessData()
        .then((result)=>{;
            this.setState({
                data: result.data
              });
        });
    }
    
    render(){
        const {name,contacts,locations,staffs,services} = this.state.data;
        return(
            <div className="business-container">
                {name &&
                <div>
                    <div className="title-bar">
                    <h3>{name}</h3>
                    {contacts.map(item=>{
                        return <div>{item.value}</div>
                    })}
                    </div>
                    <Location locations={locations} staffs={staffs} services={services}/>
                    
                </div>
                }
            </div>
        ) 
    }
}

export default Business;